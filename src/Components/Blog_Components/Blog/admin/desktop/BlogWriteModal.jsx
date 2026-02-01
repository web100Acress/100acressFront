import React, { useEffect, useMemo, useRef, useState } from 'react';
import Quill from 'quill';
import api from '../../../../../config/apiClient';
  import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
 import ReactCrop from 'react-image-crop';
 import 'react-image-crop/dist/ReactCrop.css';
 import 'quill-emoji/dist/quill-emoji.css';
 import 'quill-emoji';
 import { useParams, useNavigate } from 'react-router-dom';
 import showToast from "../../../../../Utils/toastUtils";
 
 import {
   FileText,
   Image as ImageIcon,
   Edit3,
  Save,
  Upload,
  UploadCloud,
  X,
  Plus,
  Tag,
  Link as LinkIcon,
  Copy,
  Check,
  Monitor,
  Smartphone,
  MessageSquare,
  History,
  Maximize2,
  Minimize2
 } from 'lucide-react';

 const initialCategories = [
  'Commercial Property',
  'Residential Flats',
  'SCO Plots',
  'Deen Dayal Plots',
  'Residential Plots',
  'Independent Floors',
  'Builder Floors',
  'Affordable Homes',
 ];

 /** slugify helper */
 const slugify = (text = '') =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);

 const BlogWriteModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Auth is handled by the shared axios client interceptor
  // Configure global message behavior: auto-dismiss and limit stacking
  useEffect(() => {
    // Intentionally left blank (migrated away from antd message)
  }, []);

  // Core fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); // HTML from Quill
  const [frontImage, setFrontImage] = useState(null); // File or URL string
  const [frontImagePreview, setFrontImagePreview] = useState('');
  const [categories, setCategories] = useState('');
  const [categoryList, setCategoryList] = useState(initialCategories);
  const [addedCategory, setAddedCategory] = useState('');

  // SEO
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false); // if user edits slug manually
  const [slugChecking, setSlugChecking] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState(null); // null=unknown, true=ok, false=taken
  const [slugCheckMsg, setSlugCheckMsg] = useState('');

  // Other state
  const [author, setAuthor] = useState('');
  const [blogId, setBlogId] = useState('');
  const [blogToEdit, setBlogToEdit] = useState(false);
  const [newBlog, setNewBlog] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [views, setViews] = useState(0);

  // Related projects state
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  // Project search state
  const [projectSearchTerm, setProjectSearchTerm] = useState('');
  const [projectSearchResults, setProjectSearchResults] = useState([]);
  // Auto-suggest state
  const [autoSuggestEnabled, setAutoSuggestEnabled] = useState(true);
  const [suggestedProjects, setSuggestedProjects] = useState([]);
  const [contentKeywords, setContentKeywords] = useState([]);
  
  // FAQ state (no UI changes)
  const [enableFAQ, setEnableFAQ] = useState(false);
  const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);

  // Cropper state for inline content images
  const [showCropper, setShowCropper] = useState(false);
  const [rawImageUrl, setRawImageUrl] = useState('');
  const [rawImageFile, setRawImageFile] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 80, aspect: 4 / 3 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const cropImgRef = useRef(null);

  const quillRef = useRef(null);
  const quillInstance = useRef(null);
  // Throttle repeated featured-image load errors
  const lastImageErrorRef = useRef({ url: null, ts: 0 });
  const [frontImageError, setFrontImageError] = useState(false);
  const [frontTriedProxy, setFrontTriedProxy] = useState(false);
  const originalFrontUrlRef = useRef('');

  // Helper to normalize image URLs from API (handle relative paths)
  const normalizeImageUrl = (u) => {
    if (!u) return '';
    try {
      // If already absolute (http/https/data), leave as is
      if (/^(https?:)?\/\//i.test(u) || /^data:/i.test(u)) return u;
      // If starts with '/', prefix current origin
      if (u.startsWith('/')) return `${window.location.origin}${u}`;
      // Otherwise return as is
      return u;
    } catch { return u; }
  };

  // Extract a usable image URL from various blog_Image shapes
  const extractBlogImageUrl = (img) => {
    try {
      const toHttps = (val) => {
        if (!val) return '';
        if (/^\/\//.test(val)) return 'https:' + val;
        if (/^http:\/\//i.test(val)) return val.replace(/^http:\/\//i, 'https://');
        return val;
      };
      if (!img) return '';
      if (typeof img === 'string') return normalizeImageUrl(toHttps(img));
      if (typeof img === 'object') {
        const candidate = img.display || img.cdn_url || img.url || img.Location || '';
        return normalizeImageUrl(toHttps(candidate));
      }
      return '';
    } catch { return ''; }
  };
  
  // Initialize Quill instance
  const handleQuillChange = (content/*, delta, source, editor */) => {
    setDescription(content);
    // Always cache the real Quill instance from the ref (editor param is UnprivilegedEditor)
    try {
      if (quillRef.current && typeof quillRef.current.getEditor === 'function') {
        quillInstance.current = quillRef.current.getEditor();
      }
    } catch {}
  };

  // Drag & Drop Featured Image
  const onFeaturedDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      // STRICT: Check if dropped file is WebP
      if (file.type !== 'image/webp') {
        showToast.error('Jab bola hai WebP me karne ko to karona aalsii WebP me karke wapis dalo.');
        return;
      }
      handleFileChange({ target: { files: [file] } });
    }
  };
  const onFeaturedDragOver = (e) => { e.preventDefault(); };
  
  // Safe accessor for Quill instance
  const safeGetQuill = () => {
    try {
      if (quillRef.current && typeof quillRef.current.getEditor === 'function') {
        return quillRef.current.getEditor();
      }
    } catch {}
    return quillInstance.current || null;
  };
  
  // Lightbox & preview helpers
  const [lightboxUrl, setLightboxUrl] = useState('');
  const [frontPreviewObjUrl, setFrontPreviewObjUrl] = useState('');
  // Grid and theme controls
  const [gridImgSize, setGridImgSize] = useState('medium'); // small|medium|large
  const gridSizeToPx = { small: 120, medium: 160, large: 220 };
  const [bwMode, setBwMode] = useState(false);
  const [fontQuery, setFontQuery] = useState('');
  const [gridLayout, setGridLayout] = useState('equal'); // equal | lastLarge
  const [gridWithTitles, setGridWithTitles] = useState(true);
  const [gridUseFrameTitle, setGridUseFrameTitle] = useState(true);

  // Preview & SEO states
  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [seoScore, setSeoScore] = useState({ score: 0, label: 'Low', color: '#ef4444', details: {} });
  const [seoInsights, setSeoInsights] = useState([]); // {severity:'good'|'warn'|'error', text:string, section?:string}
  const [showSeoDetails, setShowSeoDetails] = useState(true);

  // Plagiarism/Similarity states
  const [plagScore, setPlagScore] = useState(0); // 0-100 highest similarity vs corpus
  const [plagMatches, setPlagMatches] = useState([]); // [{title, slug, score}]
  const [plagLoading, setPlagLoading] = useState(false);
  const [plagError, setPlagError] = useState('');
  const [plagCorpus, setPlagCorpus] = useState([]); // cached blog corpus

  // AI-likeness states
  const [aiScore, setAiScore] = useState(0); // 0-100 higher means more likely AI-style
  const [aiSignals, setAiSignals] = useState([]); // list of text signals

  // Editor fullscreen state
  const [editorFullscreen, setEditorFullscreen] = useState(false);

  // Load plagiarism corpus once on mount
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await api.get(`/blog/admin/view?limit=1000`);
        const list = Array.isArray(res?.data?.data) ? res.data.data : [];
        const corpus = list.map(b => ({
          id: b._id,
          title: b.blog_Title || b.title || '',
          slug: b.slug || '',
          html: b.blog_Description || b.description || ''
        })).filter(x => x.id && x.html);
        if (alive) setPlagCorpus(corpus);
      } catch (err) {
        if (alive) setPlagError('Could not load blog corpus for similarity check');
      }
    })();
    return () => { alive = false; };
  }, []);

  // Slug copy feedback
  const [slugCopied, setSlugCopied] = useState(false);

  // Meta helper
  const titleKeywords = useMemo(() => {
    const words = (title || '').toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length >= 4);
    const uniq = Array.from(new Set(words));
    return uniq.slice(0, 6);
  }, [title]);

  // FAQ UI helpers
  const [collapsedFaqs, setCollapsedFaqs] = useState([false]);
  const dragIndexRef = useRef(null);

  // Autosave & version history
  const draftKey = useMemo(() => `blogDraft:${id || 'new'}`, [id]);
  const historyKey = useMemo(() => `blogDraftHistory:${id || 'new'}`, [id]);
  const [hasRestorable, setHasRestorable] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  // Register extra fonts in Quill
  const fontWhitelist = [
    'inter','roboto','poppins','montserrat','lato','open-sans','raleway','nunito','merriweather','playfair','source-sans','ubuntu','work-sans','rubik','mulish','josefin','quicksand','dm-sans','pt-serif','arimo'
  ];
  const Font = Quill.import('formats/font');
  Font.whitelist = fontWhitelist;
  Quill.register(Font, true);

  // Auto-slug when title changes (unless user already touched slug)
  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched]);

  // Compute SEO score and detailed insights when inputs change
  useEffect(() => {
    const computeSeo = () => {
      const html = description || '';
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const plainText = temp.textContent || temp.innerText || '';
      const textNorm = plainText.replace(/\s+/g, ' ').trim();
      const wordCount = textNorm ? textNorm.split(/\s+/).length : 0;
      const h1s = Array.from(temp.querySelectorAll('h1'));
      const h2s = Array.from(temp.querySelectorAll('h2'));
      const imgs = Array.from(temp.querySelectorAll('img'));
      const links = Array.from(temp.querySelectorAll('a'));

      const insights = [];
      let score = 0;
      const details = {};

      // Title length
      if (title.length >= 30 && title.length <= 65) { score += 10; details.title = 'Good'; insights.push({severity:'good', text:`Title length is optimal (${title.length} chars)`, section:'Title'}); }
      else if (title.length > 0) { score += 6; details.title = 'Ok'; insights.push({severity:'warn', text:`Title length ${title.length}. Aim for 30–65 chars.`, section:'Title'}); }
      else { insights.push({severity:'error', text:'Title is missing', section:'Title'}); }

      // Meta Title presence (using same metaTitle as title if needed)
      if (metaTitle && metaTitle.length) { score += 4; insights.push({severity:'good', text:'Meta title present', section:'Meta'}); }
      else insights.push({severity:'warn', text:'Meta title missing (recommended)', section:'Meta'});

      // Meta Description length
      if (metaDescription.length >= 120 && metaDescription.length <= 165) { score += 14; details.meta = 'Optimal'; insights.push({severity:'good', text:`Meta description optimal (${metaDescription.length}/160)`, section:'Meta'}); }
      else if (metaDescription.length >= 80) { score += 9; details.meta = 'Ok'; insights.push({severity:'warn', text:`Meta description ${metaDescription.length}. Aim for 120–165 chars.`, section:'Meta'}); }
      else { insights.push({severity:'error', text:'Meta description too short or missing', section:'Meta'}); }

      // Slug
      if (slug && slugAvailable !== false) { score += 6; details.slug = 'Ok'; }
      else insights.push({severity:'error', text:'Slug is invalid or taken', section:'Slug'});

      // Headings
      if (h1s.length === 1) { score += 8; details.h1 = '1 H1'; insights.push({severity:'good', text:'Exactly one H1 found', section:'Headings'}); }
      else if (h1s.length > 1) { score += 3; insights.push({severity:'warn', text:`${h1s.length} H1s found. Use only one.`, section:'Headings'}); }
      else { insights.push({severity:'warn', text:'No H1 found. Add a primary heading.', section:'Headings'}); }
      if (h2s.length >= 2) { score += 6; details.h2 = 'Has H2s'; insights.push({severity:'good', text:`${h2s.length} H2s found`, section:'Headings'}); }
      else { insights.push({severity:'warn', text:'Add at least two H2 subheadings', section:'Headings'}); }

      // Content length
      if (wordCount >= 1000) { score += 14; details.length = '1000+'; insights.push({severity:'good', text:`Strong content length (${wordCount} words)`, section:'Content'}); }
      else if (wordCount >= 600) { score += 10; details.length = '600+'; insights.push({severity:'good', text:`Good content length (${wordCount} words)`, section:'Content'}); }
      else if (wordCount >= 300) { score += 6; details.length = '300+'; insights.push({severity:'warn', text:`Consider writing more content (currently ${wordCount} words)`, section:'Content'}); }
      else { insights.push({severity:'error', text:'Very low content length (<300 words)', section:'Content'}); }

      // Readability (avg sentence length)
      const sentences = textNorm.split(/[.!?]+\s/).filter(Boolean);
      const avgWords = sentences.length ? Math.round(wordCount / sentences.length) : 0;
      if (avgWords >= 10 && avgWords <= 24) { score += 10; details.readability = 'Good'; insights.push({severity:'good', text:`Readable sentence length (avg ${avgWords} words)`, section:'Readability'}); }
      else if (avgWords > 0) { score += 5; details.readability = 'Ok'; insights.push({severity:'warn', text:`Average sentence length ${avgWords}. Aim for 10–24.`, section:'Readability'}); }

      // Images: count + alt attributes (content images)
      if (imgs.length > 0) { score += 4; insights.push({severity:'good', text:`${imgs.length} images in content`, section:'Images'}); }
      const missingAlt = imgs.filter(im => !(im.getAttribute('alt') || '').trim()).length;
      if (missingAlt > 0) insights.push({severity:'warn', text:`${missingAlt}/${imgs.length} images missing alt text`, section:'Images'});
      // Width/height attributes hint
      const missingDims = imgs.filter(im => !im.getAttribute('width') || !im.getAttribute('height')).length;
      if (missingDims > 0) insights.push({severity:'warn', text:`${missingDims}/${imgs.length} images missing width/height attributes (CLS hint)`, section:'Images'});
      // Featured image presence
      if (frontImagePreview) { score += 4; insights.push({severity:'good', text:'Featured image set', section:'Images'}); }

      // Links: internal/external
      const linkCount = links.length;
      if (linkCount === 0) insights.push({severity:'warn', text:'No links in content. Add internal/external references.', section:'Links'});
      else if (linkCount < 3) insights.push({severity:'warn', text:`Only ${linkCount} link(s) found. Consider adding more.`, section:'Links'});
      else { score += 4; insights.push({severity:'good', text:`Good linking (${linkCount} links)`, section:'Links'}); }

      // FAQs quality
      if (enableFAQ) {
        const validFaqs = (faqs || []).filter(f => (f.question||'').trim() && (f.answer||'').trim());
        if (validFaqs.length >= 2) { score += 6; insights.push({severity:'good', text:`${validFaqs.length} valid FAQs`, section:'FAQ'}); }
        else insights.push({severity:'warn', text:'Add at least 2 well-formed FAQs (Q & A)', section:'FAQ'});
      }

      // Keyword presence in H1/H2/intro/alt
      const kMain = titleKeywords[0];
      if (kMain) {
        const intro = textNorm.slice(0, 150).toLowerCase();
        const hasKInH1 = h1s.some(h => (h.textContent||'').toLowerCase().includes(kMain));
        const hasKInH2 = h2s.some(h => (h.textContent||'').toLowerCase().includes(kMain));
        const hasKInIntro = intro.includes(kMain);
        const hasKInAlts = imgs.some(im => (im.getAttribute('alt')||'').toLowerCase().includes(kMain));
        let kwScore = 0;
        if (hasKInH1) kwScore += 3;
        if (hasKInH2) kwScore += 2;
        if (hasKInIntro) kwScore += 3;
        if (hasKInAlts) kwScore += 2;
        score += kwScore;
        if (kwScore >= 6) insights.push({severity:'good', text:`Primary keyword appears in key places (H1/H2/intro/images)`, section:'Keywords'});
        else insights.push({severity:'warn', text:`Use primary keyword in H1/H2/intro/image alts for better relevance`, section:'Keywords'});
      }

      // Cap to 100 and set color/label
      score = Math.min(100, Math.round(score));
      const color = score >= 85 ? '#16a34a' : score >= 65 ? '#f59e0b' : '#ef4444';
      const label = score >= 85 ? 'Great' : score >= 65 ? 'Okay' : 'Low';
      setSeoScore({ score, color, label, details });
      setSeoInsights(insights);
    };
    computeSeo();
  }, [title, metaTitle, metaDescription, slug, slugAvailable, description, titleKeywords, frontImagePreview, enableFAQ, faqs]);

  // AI-likeness heuristic (offline approximation)
  useEffect(() => {
    const html = description || '';
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const plain = `${title ? title + '. ' : ''}${temp.textContent || temp.innerText || ''}`.toLowerCase().replace(/\s+/g, ' ').trim();
    if (!plain || plain.split(' ').length < 50) {
      setAiScore(0);
      setAiSignals([]);
      return;
    }
    const tokens = plain.split(/[^a-z0-9']+/).filter(Boolean);
    const tokenCount = tokens.length;
    const unique = new Set(tokens);
    const diversity = unique.size / tokenCount; // lower -> more AI-like
    const sentences = plain.split(/[.!?]+\s/).filter(Boolean);
    const lens = sentences.map(s => s.split(/\s+/).filter(Boolean).length);
    const avg = lens.reduce((a,b)=>a+b,0) / (lens.length || 1);
    const variance = lens.reduce((a,b)=>a + Math.pow(b-avg,2), 0) / (lens.length || 1);
    const burstiness = Math.sqrt(variance); // lower -> more uniform -> AI-like
    // Function words ratio
    const functionWords = new Set(['the','is','are','was','were','of','and','to','in','for','with','on','that','this','as','by','at','from','it','an','a','or','be','can','will','has','have']);
    const funcCount = tokens.filter(t => functionWords.has(t)).length;
    const funcRatio = funcCount / (tokenCount || 1);
    // Repetition via bigram frequency
    const bigrams = [];
    for (let i=0;i<tokens.length-1;i++) bigrams.push(tokens[i] + ' ' + tokens[i+1]);
    const bgFreq = new Map();
    for (const bg of bigrams) bgFreq.set(bg, (bgFreq.get(bg)||0)+1);
    const maxBg = Math.max(0, ...Array.from(bgFreq.values()));
    // Punctuation variety (more variety tends to human)
    const puncts = (description.match(/[,:;()\-—]/g) || []).length;
    const punctRatio = puncts / (tokenCount || 1);

    // Scoring: 0..100 higher = more AI-like
    let score = 0;
    // Diversity: <=0.35 very AI-like; >=0.6 human-like
    if (diversity <= 0.35) score += 30; else if (diversity <= 0.45) score += 18; else if (diversity <= 0.55) score += 10; else score += 2;
    // Burstiness: <=4 very uniform; >=10 varied
    if (burstiness <= 4) score += 25; else if (burstiness <= 7) score += 14; else if (burstiness <= 10) score += 6; else score += 1;
    // Bigram repetition: high repetition -> AI-like
    if (maxBg >= 6) score += 16; else if (maxBg >= 4) score += 10; else if (maxBg >= 3) score += 6;
    // Function words high ratio -> generic AI-ish style
    if (funcRatio >= 0.35) score += 12; else if (funcRatio >= 0.28) score += 8; else if (funcRatio >= 0.22) score += 4;
    // Low punctuation variety -> AI-like
    if (punctRatio <= 0.01) score += 6; else if (punctRatio <= 0.02) score += 3;

    score = Math.max(0, Math.min(100, Math.round(score)));
    setAiScore(score);
    const signals = [];
    signals.push({ label: 'Lexical diversity', value: diversity.toFixed(2), hint: diversity <= 0.45 ? 'Low diversity (AI-like)' : 'Diversity OK' });
    signals.push({ label: 'Avg sentence length', value: Math.round(avg), hint: avg >= 14 ? 'Longer sentences' : 'Short sentences' });
    signals.push({ label: 'Sentence burstiness', value: burstiness.toFixed(1), hint: burstiness <= 6 ? 'Uniform (AI-like)' : 'Varied (human-like)' });
    signals.push({ label: 'Max bigram freq', value: maxBg, hint: maxBg >= 4 ? 'Repetitive phrases' : 'OK' });
    signals.push({ label: 'Function word ratio', value: (funcRatio*100).toFixed(1)+'%', hint: funcRatio >= 0.28 ? 'High (generic style)' : 'OK' });
    setAiSignals(signals);
  }, [title, description]);

  // Plagiarism checker (local similarity via 3-gram Jaccard against existing blogs)
  useEffect(() => {
    let cancel = false;
    const run = async () => {
      const html = description || '';
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      const text = `${title || ''} ${tmp.textContent || tmp.innerText || ''}`.toLowerCase().replace(/\s+/g, ' ').trim();
      if (!text || text.split(' ').length < 30) {
        setPlagScore(0);
        setPlagMatches([]);
        setPlagLoading(false);
        return;
      }
      if (!plagCorpus || plagCorpus.length === 0) {
        setPlagLoading(false);
        return;
      }
      try {
        setPlagLoading(true);
        setPlagError('');
        // build shingles for current text
        const toShingles = (t, n=3) => {
          const tokens = t.split(/[^a-z0-9]+/).filter(Boolean).slice(0, 1200);
          const out = new Set();
          for (let i=0;i<=tokens.length-n;i++) out.add(tokens.slice(i,i+n).join(' '));
          return out;
        };
        const curSet = toShingles(text, 3);
        const jaccard = (a, b) => {
          let inter = 0;
          for (const v of a) { if (b.has(v)) inter++; }
          const union = a.size + b.size - inter;
          return union > 0 ? inter / union : 0;
        };
        // Limit corpus and shallow prefilter by simple keyword presence to reduce cost
        const candidates = plagCorpus.slice(0, 250);
        const topTokens = Array.from(curSet).slice(0, 50); // sample shingles
        const quickHas = (s) => {
          let c = 0;
          for (let i=0;i<topTokens.length;i+=5) { // stride to reduce ops
            if (s.includes(topTokens[i])) c++;
            if (c >= 2) return true;
          }
          return false;
        };

        const matches = [];
        for (const b of candidates) {
          if (blogId && b.id === blogId) continue; // skip self when editing
          const d = document.createElement('div');
          d.innerHTML = b.html || '';
          const other = `${b.title || ''} ${d.textContent || d.innerText || ''}`.toLowerCase().replace(/\s+/g, ' ').trim();
          if (!other) continue;
          // heuristic: cap tokens to 4000 characters to speed up
          const otherTrim = other.slice(0, 12000);
          if (!quickHas(otherTrim)) continue;
          const setB = toShingles(otherTrim, 3);
          const sim = jaccard(curSet, setB);
          if (sim > 0) {
            matches.push({ id: b.id, title: b.title, slug: b.slug, score: sim });
          }
        }
        matches.sort((a,b)=>b.score-a.score);
        const top = matches.slice(0, 5);
        const best = top[0]?.score || 0;
        if (!cancel) {
          setPlagMatches(top.map(x => ({...x, percent: Math.round(x.score*100)})));
          setPlagScore(Math.round(best*100));
        }
      } catch (err) {
        if (!cancel) {
          setPlagScore(0);
          setPlagMatches([]);
          setPlagError('Similarity analysis failed');
        }
      } finally {
        if (!cancel) setPlagLoading(false);
      }
    };
    // Add a timeout guard to avoid indefinite checking UI
    const timer = setTimeout(() => {
      if (!cancel) run();
    }, 900);
    return () => { cancel = true; clearTimeout(timer); };
  }, [title, description, blogId, plagCorpus.length]);

  // Debounced slug uniqueness check (fetch admin list and check client-side)
  useEffect(() => {
    if (!slug || !slug.trim()) {
      setSlugAvailable(null);
      setSlugCheckMsg('');
      return;
    }
    let timer = setTimeout(async () => {
      try {
        setSlugChecking(true);
        setSlugCheckMsg('Checking slug...');
        const res = await api.get(`/blog/admin/view?limit=1000`);
        const list = Array.isArray(res?.data?.data) ? res.data.data : [];
        const target = slugify(slug);
        const found = list.find((b) => {
          const s = (b?.slug || slugify(b?.blog_Title || '')).toString();
          return s === target;
        });
        if (found) {
          if (blogToEdit && found._id === blogId) {
            setSlugAvailable(true);
            setSlugCheckMsg('This slug belongs to this post.');
          } else {
            setSlugAvailable(false);
            setSlugCheckMsg('Slug is already taken.');
          }
        } else {
          setSlugAvailable(true);
          setSlugCheckMsg('Slug is available.');
        }
      } catch (err) {
        setSlugAvailable(null);
        setSlugCheckMsg('Could not verify slug.');
      } finally {
        setSlugChecking(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [slug, blogToEdit, blogId]);

  // Load blog for edit / set default author for create
  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const res = await api.get(`/blog/view/${id}`);
          const b = res?.data?.data;
          if (b) {
            setTitle(b.blog_Title || '');
            setDescription(b.blog_Description || '');
            setFrontImage(null);
            const extracted = extractBlogImageUrl(b.blog_Image);
            originalFrontUrlRef.current = extracted;
            setFrontImagePreview(extracted);
            setFrontImageError(false);
            setFrontTriedProxy(false);
            setCategories(b.blog_Category || '');
            setAuthor(b.author || 'Admin');
            setViews(typeof b.views === 'number' ? b.views : 0);
            setBlogId(b._id || '');
            setBlogToEdit(true);
            setNewBlog(false);

            // map SEO fields if your backend returns them with these keys
            setMetaTitle(b.metaTitle || '');
            setMetaDescription(b.metaDescription || '');
            setSlug(b.slug || slugify(b.blog_Title || ''));
            
            // Load related projects if they exist
            setRelatedProjects(Array.isArray(b.relatedProjects) ? b.relatedProjects : []);
            
            // Load FAQs
            setEnableFAQ(!!b.enableFAQ);
            setFaqs(Array.isArray(b.faqs) && b.faqs.length
              ? b.faqs.map(x => ({ question: x.question || '', answer: x.answer || '' }))
              : [{ question: '', answer: '' }]
            );
          } else {
            console.log('Blog not found');
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const agentData = localStorage.getItem('agentData');
          if (agentData) {
            const parsedData = JSON.parse(agentData);
            setAuthor(parsedData?.name || 'Admin');
          } else {
            setAuthor('Admin');
          }
        } catch (error) {
          console.error('Error parsing agentData:', error);
          setAuthor('Admin');
        }
        setBlogToEdit(false);
        setNewBlog(true);
        resetForm();
      }
    };

  
    fetchBlog();
  }, [id]);

  // Autosave & history load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      setHasRestorable(!!raw);
      const histRaw = localStorage.getItem(historyKey);
      if (histRaw) setHistoryList(JSON.parse(histRaw));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced autosave on key fields
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const snapshot = {
          ts: Date.now(),
          title, description, frontImagePreview, categories,
          metaTitle, metaDescription, slug, relatedProjects, enableFAQ, faqs,
          author
        };
        localStorage.setItem(draftKey, JSON.stringify(snapshot));
        // Append to history (max 10)
        const hist = JSON.parse(localStorage.getItem(historyKey) || '[]');
        hist.push({ ts: snapshot.ts, title: snapshot.title, metaTitle: snapshot.metaTitle });
        while (hist.length > 10) hist.shift();
        localStorage.setItem(historyKey, JSON.stringify(hist));
        setHistoryList(hist);
        setHasRestorable(true);
      } catch {}
    }, 1200);
    return () => clearTimeout(t);
  }, [draftKey, historyKey, title, description, frontImagePreview, categories, metaTitle, metaDescription, slug, relatedProjects, enableFAQ, faqs, author]);

  // Convert the next 4 standalone images (from cursor) into a grid with inline styles
  const convertNextImagesToGrid = () => {
    const quill = safeGetQuill();
    if (!quill) return;
    const root = quill.root;
    const sel = quill.getSelection(true) || { index: 0 };
    const leaf = quill.getLeaf(sel.index)?.[0];
    const fromNode = leaf?.domNode || root.firstChild;

    // Gather next 4 images not already inside a grid
    const allImgs = Array.from(root.querySelectorAll('img'));
    const startIdx = allImgs.findIndex((n) => n === fromNode || n.compareDocumentPosition(fromNode) & Node.DOCUMENT_POSITION_FOLLOWING || fromNode.contains?.(n));
    const imgs = [];
    for (let i = Math.max(0, startIdx); i < allImgs.length; i++) {
      const img = allImgs[i];
      if (img.closest('.img-grid-4')) continue;
      imgs.push(img);
      if (imgs.length === 4) break;
    }
    if (imgs.length < 2) {
      showToast.info('Need at least 2 images after the cursor to convert to a grid');
      return;
    }

    const urls = imgs.map((img) => img.getAttribute('src')).filter(Boolean);
    const cardStyle = 'background:#fff;border:2px solid #222;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;';
    const imgStyle = `width:100%;height:${gridSizeToPx[gridImgSize]}px;object-fit:cover;display:block;`;
    const capStyle = 'padding:8px 10px;font-size:14px;color:#111;text-align:center;';
    const cards = urls.map((u, idx) => gridWithTitles
      ? `<figure class=\"grid-card\" style=\"${cardStyle}\"><img style=\"${imgStyle}\" src=\"${u}\" alt=\"\" /><figcaption style=\"${capStyle}\" contenteditable=\"true\">Title ${idx+1}</figcaption></figure>`
      : `<figure class=\"grid-card\" style=\"${cardStyle}\"><img style=\"${imgStyle}\" src=\"${u}\" alt=\"\" /></figure>`
    ).join('');
    const gridCols = gridLayout === 'lastLarge' ? '1fr 1fr 1fr 1.6fr' : 'repeat(4, 1fr)';
    const inner = `<div class=\"img-grid-4 layout-${gridLayout}\" style=\"display:flex;flex-wrap:nowrap;align-items:stretch;gap:12px;display:grid;grid-template-columns:${gridCols};--grid-img-height:${gridSizeToPx[gridImgSize]}px;\">${cards}</div>`;
    const frameStyle = 'border:3px solid #111;border-radius:18px;padding:14px;background:#fff;';
    const titleStyle = 'text-align:center;font-weight:700;margin:4px 0 12px;font-size:16px;';
    const html = gridUseFrameTitle
      ? `<section class=\"img-grid-4-frame\" style=\"${frameStyle}\"><div class=\"grid-title\" style=\"${titleStyle}\" contenteditable=\"true\">Grid Title</div>${inner}</section>`
      : inner;

    // Insert before the first image block
    const firstImg = imgs[0];
    const container = document.createElement('div');
    container.innerHTML = html;
    const nodeToInsert = container.firstChild;
    const insertBefore = firstImg.closest('p') || firstImg;
    insertBefore.parentNode.insertBefore(nodeToInsert, insertBefore);

    // Remove the original images and empty paragraphs
    imgs.forEach((img) => {
      const p = img.closest('p');
      img.remove();
      if (p && !p.textContent.trim() && p.querySelectorAll('img').length === 0) {
        p.remove();
      }
    });

    showToast.success('Converted 4 images into a grid');
  };

  // Helper: insert image URL into Quill with trailing newline
  const insertImageIntoQuill = (imageUrl) => {
    const quill = safeGetQuill();
    if (!quill) return;
    const sel = quill.getSelection(true) || { index: quill.getLength(), length: 0 };
    const insertAt = sel.index;
    quill.insertEmbed(insertAt, 'image', imageUrl, 'user');
    // add extra blank line so user can type easily after image
    quill.insertText(insertAt + 1, '\n\n', 'user');
    quill.setSelection(insertAt + 3, 0);
  };

  // Build cropped blob from image + completedCrop
  const getCroppedBlob = async () => {
    return new Promise((resolve, reject) => {
      const image = cropImgRef.current;
      if (!image || !completedCrop?.width || !completedCrop?.height) {
        return reject(new Error('Invalid crop'));
      }
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = Math.round(completedCrop.width * scaleX);
      canvas.height = Math.round(completedCrop.height * scaleY);
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas not supported'));
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(
        image,
        Math.round(completedCrop.x * scaleX),
        Math.round(completedCrop.y * scaleY),
        Math.round(completedCrop.width * scaleX),
        Math.round(completedCrop.height * scaleY),
        0,
        0,
        Math.round(completedCrop.width * scaleX),
        Math.round(completedCrop.height * scaleY)
      );
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Failed to create blob'));
        resolve(blob);
      }, 'image/png', 1);
    });
  };

  const closeCropper = () => {
    setShowCropper(false);
    if (rawImageUrl) URL.revokeObjectURL(rawImageUrl);
    setRawImageUrl('');
    setRawImageFile(null);
    setCompletedCrop(null);
  };

  // Confirm crop: upload cropped image then insert into Quill
  const confirmCropAndInsert = async () => {
    try {
      if (!completedCrop?.width || !completedCrop?.height) {
        return showToast.warning('Please select a crop area');
      }
      showToast.loading('Uploading cropped image...', { id: 'cropUpload' });
      
      // Get the cropped blob
      const blob = await getCroppedBlob();
      const filename = (rawImageFile?.name || 'image.png').replace(/\.[^.]*$/, '') + '-cropped.png';
      const file = new File([blob], filename, { type: 'image/png' });

      // Create FormData and append the file
      const fd = new FormData();
      fd.append('image', file);

      // Add Content-Type header manually for FormData
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        withCredentials: true
      };

      try {
        const res = await api.post(`/blog/upload-image`, fd, config);
        
        // Handle different response formats
        const imageUrl = res?.data?.url || 
                        res?.data?.data?.url || 
                        (typeof res?.data === 'string' ? res.data : '') || 
                        '';
                        
        if (!imageUrl) {
          console.error('Unexpected response format:', res?.data);
          throw new Error('Upload succeeded but no URL was returned in the response');
        }

        insertImageIntoQuill(imageUrl);
        showToast.dismiss('cropUpload');
        showToast.success('Image uploaded and inserted');
        closeCropper();
      } catch (uploadError) {
        console.error('Upload error:', uploadError);
        if (uploadError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response data:', uploadError.response.data);
          console.error('Response status:', uploadError.response.status);
          console.error('Response headers:', uploadError.response.headers);
          throw new Error(uploadError.response.data?.message || 'Server error during upload');
        } else if (uploadError.request) {
          // The request was made but no response was received
          console.error('No response from server:', uploadError.request);
          throw new Error('No response from server. Please check your connection.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Request setup error:', uploadError.message);
          throw uploadError;
        }
      }
    } catch (err) {
      console.error('Crop upload failed:', err);
      showToast.dismiss('cropUpload');
      showToast.error(err.message || 'Failed to upload cropped image');
    }
  };

  // Load categories from backend (merge with initial list, unique)
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get(`/blog/categories`);
        const apiCats = (res?.data?.data || []).map((c) => c.name).filter(Boolean);
        // merge with initial and unique (case-sensitive keep first)
        const merged = [...initialCategories];
        for (const name of apiCats) {
          if (!merged.includes(name)) merged.push(name);
        }
        setCategoryList(merged);
        // ensure current selected category is preserved if present
        if (categories && !merged.includes(categories)) {
          setCategoryList((prev) => [...prev, categories]);
        }
      } catch (e) {
        // silent fail, keep initial list
        // console.warn('Failed to load categories', e);
      }
    };
    loadCategories();
  }, []);

  // Load all projects for dropdown (paginate in batches of 100)
  useEffect(() => {
    const loadAllProjects = async () => {
      try {
        setIsLoadingProjects(true);
        const limit = 100;
        const strategies = [
          // page based
          (state) => `/blog/search-projects?limit=${limit}&page=${state.page}`,
          // skip based
          (state) => `/blog/search-projects?limit=${limit}&skip=${state.skip}`,
          // offset based
          (state) => `/blog/search-projects?limit=${limit}&offset=${state.skip}`,
        ];
        let all = [];
        let success = false;
        for (let s = 0; s < strategies.length && !success; s++) {
          let page = 1;
          let skip = 0;
          let lastFirstId = null;
          all = [];
          for (let attempts = 0; attempts < 60; attempts++) {
            const url = strategies[s]({ page, skip });
            const res = await api.get(url);
            const list = Array.isArray(res?.data?.data) ? res.data.data : [];
            if (!list.length) break;
            const firstId = list[0]?._id || list[0]?.id || JSON.stringify(list[0]);
            if ((page > 1 || skip > 0) && firstId && firstId === lastFirstId) {
              break; // repeating batch
            }
            lastFirstId = firstId;
            all = all.concat(list);
            if (list.length < limit) break; // last page
            page += 1;
            skip += limit;
          }
          // If we got more than one page, consider success
          if (all.length > limit) success = true;
        }
        console.log('[BlogWriteModal] Projects loaded (total):', all.length);
        setAllProjects(all);
      } catch (error) {
        console.error('Error fetching projects:', error);
        showToast.error('Failed to load projects');
      } finally {
        setIsLoadingProjects(false);
      }
    };
    loadAllProjects();
  }, []);

  // Debounced server-side search across all pages (when user types 2+ chars)
  useEffect(() => {
    const t = setTimeout(async () => {
      try {
        const q = (projectSearchTerm || '').trim();
        if (q.length < 2) {
          setProjectSearchResults([]);
          return;
        }
        setIsLoadingProjects(true);
        const limit = 100;
        const strategies = [
          (state) => `/blog/search-projects?limit=${limit}&q=${encodeURIComponent(q)}&page=${state.page}`,
          (state) => `/blog/search-projects?limit=${limit}&q=${encodeURIComponent(q)}&skip=${state.skip}`,
          (state) => `/blog/search-projects?limit=${limit}&q=${encodeURIComponent(q)}&offset=${state.skip}`,
        ];
        let results = [];
        for (let s = 0; s < strategies.length; s++) {
          let page = 1;
          let skip = 0;
          let lastFirstId = null;
          results = [];
          for (let attempts = 0; attempts < 60; attempts++) {
            const url = strategies[s]({ page, skip });
            const res = await api.get(url);
            const list = Array.isArray(res?.data?.data) ? res.data.data : [];
            if (!list.length) break;
            const firstId = list[0]?._id || list[0]?.id || JSON.stringify(list[0]);
            if ((page > 1 || skip > 0) && firstId && firstId === lastFirstId) break;
            lastFirstId = firstId;
            results = results.concat(list);
            if (list.length < limit) break;
            page += 1;
            skip += limit;
          }
          if (results.length) break; // stop on first strategy that works
        }
        setProjectSearchResults(results);
      } catch (err) {
        console.error('Project search failed', err);
      } finally {
        setIsLoadingProjects(false);
      }
    }, 350);
    return () => clearTimeout(t);
  }, [projectSearchTerm]);

  // Extract keywords from title + description + category
  useEffect(() => {
    const plain = (description || '').replace(/<[^>]+>/g, ' ').toLowerCase();
    const text = `${title || ''} ${categories || ''} ${plain}`.toLowerCase();
    const tokens = text.split(/[^a-z0-9]+/).filter(Boolean);
    const stop = new Set(['the','and','for','with','from','that','this','your','you','are','our','was','were','have','has','had','in','on','of','to','a','an','by','is','it','as','or','at','be','can','will','we','us','they','their','them']);
    const freq = new Map();
    for (const t of tokens) {
      if (t.length < 3) continue;
      if (stop.has(t)) continue;
      freq.set(t, (freq.get(t) || 0) + 1);
    }
    // Sort by frequency and keep top 15
    const top = Array.from(freq.entries()).sort((a,b) => b[1]-a[1]).slice(0, 15).map(([w]) => w);
    setContentKeywords(top);
  }, [title, description, categories]);

  // Rank all projects by TF-IDF with field weighting and compute suggestions
  useEffect(() => {
    if (!autoSuggestEnabled) { setSuggestedProjects([]); return; }
    if (!allProjects?.length) { setSuggestedProjects([]); return; }
    const selectedSet = new Set(relatedProjects.map(p => p.project_url));
    const terms = Array.from(new Set(contentKeywords));
    if (terms.length === 0) { setSuggestedProjects([]); return; }

    const N = allProjects.length;
    // Document frequency per term across combined fields
    const df = new Map();
    for (const t of terms) df.set(t, 0);
    for (const proj of allProjects) {
      const fields = [proj.projectName, proj.builderName, proj.location, proj.city].map(x => (x || '').toLowerCase());
      const joined = fields.join(' ');
      for (const t of terms) {
        if (joined.includes(t)) {
          df.set(t, (df.get(t) || 0) + 1);
        }
      }
    }
    const idf = new Map();
    for (const t of terms) {
      const dft = df.get(t) || 0;
      // Smoothing: log( (N + 1) / (df + 1) ) + 1
      idf.set(t, Math.log((N + 1) / (dft + 1)) + 1);
    }

    // Field weights
    const W_NAME = 3.0;      // projectName
    const W_BUILDER = 2.0;   // builderName
    const W_LOCATION = 1.6;  // location
    const W_CITY = 1.3;      // city
    const CAT_BOOST = 1.15;  // small multiplicative boost if category name appears

    const safeIncludesCount = (haystack, needle) => {
      if (!needle || !haystack) return 0;
      let i = 0, c = 0;
      while (true) {
        const idx = haystack.indexOf(needle, i);
        if (idx === -1) break;
        c += 1;
        i = idx + needle.length;
      }
      return c;
    };

    const scoreProject = (p) => {
      const name = (p.projectName || '').toLowerCase();
      const builder = (p.builderName || '').toLowerCase();
      const loc = (p.location || '').toLowerCase();
      const city = (p.city || '').toLowerCase();
      let score = 0;
      for (const t of terms) {
        const tf_name = safeIncludesCount(name, t);
        const tf_builder = safeIncludesCount(builder, t);
        const tf_loc = safeIncludesCount(loc, t);
        const tf_city = safeIncludesCount(city, t);
        const idf_t = idf.get(t) || 1;
        score += (tf_name * W_NAME + tf_builder * W_BUILDER + tf_loc * W_LOCATION + tf_city * W_CITY) * idf_t;
      }
      // Category boost (light): if exact category token appears anywhere in fields
      const cat = (categories || '').toLowerCase();
      if (cat) {
        const hay = `${name} ${builder} ${loc} ${city}`;
        if (hay.includes(cat)) score *= CAT_BOOST;
      }
      return score;
    };

    const ranked = allProjects
      .filter(p => !selectedSet.has(p.project_url))
      .map(p => ({ p, s: scoreProject(p) }))
      .filter(x => x.s > 0)
      .sort((a,b) => b.s - a.s)
      .slice(0, 10)
      .map(x => x.p);
    setSuggestedProjects(ranked);
  }, [autoSuggestEnabled, allProjects, contentKeywords, relatedProjects, categories]);

  // Related projects management functions
  const addRelatedProject = (project) => {
    const exists = relatedProjects.find(p => p.project_url === project.project_url);
    if (!exists && relatedProjects.length < 5) {
      setRelatedProjects(prev => [...prev, {
        project_url: project.project_url,
        projectName: project.projectName,
        thumbnail: project.thumbnail
      }]);
      showToast.success(`Added "${project.projectName}" to related projects`);
    } else if (exists) {
      showToast.warning('Project already added');
    } else {
      showToast.warning('Maximum 5 related projects allowed');
    }
  };

  const removeRelatedProject = (projectUrl) => {
    setRelatedProjects(prev => prev.filter(p => p.project_url !== projectUrl));
    showToast.success('Project removed from related projects');
  };

  /** Handle image URL input */
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFrontImage(url);
    
    // Basic URL validation
    if (url && url.trim() !== '') {
      try {
        new URL(url); // Will throw if invalid URL
        // STRICT: Check if URL ends with .webp
        if (!url.toLowerCase().endsWith('.webp')) {
          showToast.error('Only WebP images are allowed. Please use a .webp image URL.');
          return;
        }
        setFrontImagePreview(url);
      } catch (err) {
        // Don't show error while typing, only when submitting
        setFrontImagePreview('');
      }
    } else {
      setFrontImagePreview('');
    }
  };

  /** Featured image change - handles both file upload and URL */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFrontImage(null);
      setFrontImagePreview('');
      if (frontPreviewObjUrl) {
        URL.revokeObjectURL(frontPreviewObjUrl);
        setFrontPreviewObjUrl('');
      }
      return;
    }

    // Check file type - STRICT: Only WebP images allowed
    if (file.type !== 'image/webp') {
      showToast.error('Only WebP images are allowed. Please upload a .webp file.');
      e.target.value = '';
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      showToast.error('Image size should be less than 5MB');
      e.target.value = '';
      return;
    }

    // Check image dimensions and aspect ratio (1200x628 = 300:157)
    const img = new Image();
    img.onload = function() {
      const expectedWidth = 1200;
      const expectedHeight = 628;
      const tolerance = 5; // Allow 5px tolerance
      
      if (Math.abs(this.width - expectedWidth) > tolerance || Math.abs(this.height - expectedHeight) > tolerance) {
        showToast.error(`Image must be exactly ${expectedWidth} × ${expectedHeight} pixels (Current: ${this.width} × ${this.height})`);
        e.target.value = '';
        return;
      }
      
      // Calculate aspect ratio
      const expectedRatio = expectedWidth / expectedHeight;
      const actualRatio = this.width / this.height;
      const ratioTolerance = 0.01; // 1% tolerance
      
      if (Math.abs(actualRatio - expectedRatio) > ratioTolerance) {
        showToast.error(`Image aspect ratio must be ${expectedWidth}:${expectedHeight} (300:157). Current ratio is ${this.width}:${this.height}`);
        e.target.value = '';
        return;
      }
      
      // If all validations pass, proceed with file processing
      processValidFile(file);
    };
    
    img.onerror = function() {
      showToast.error('Failed to load image. Please try a different file.');
      e.target.value = '';
    };
    
    // Create object URL for validation
    const objUrl = URL.createObjectURL(file);
    img.src = objUrl;
  };

  const processValidFile = (file) => {
    // Revoke previous object URL if exists
    if (frontPreviewObjUrl) {
      URL.revokeObjectURL(frontPreviewObjUrl);
    }

    // Create object URL for preview
    const objUrl = URL.createObjectURL(file);
    
    // Set states
    setFrontImage(file);
    setFrontPreviewObjUrl(objUrl);
    setFrontImagePreview(objUrl);
    
    // Auto-set meta title from filename if empty
    if (!metaTitle) {
      const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
      const formattedName = fileName
        .replace(/[-_]/g, ' ') // Replace underscores and dashes with spaces
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();
      setMetaTitle(formattedName);
    }
  };

  /** Insert image into Quill at cursor by URL */
  const insertImageByUrl = () => {
    const url = window.prompt('Paste image URL');
    if (!url) return;
    const quill = safeGetQuill();
    if (quill) {
      const sel = quill.getSelection(true) || { index: quill.getLength(), length: 0 };
      const insertAt = sel.index;
      // insert image and a trailing newline so user can type below
      quill.insertEmbed(insertAt, 'image', url, 'user');
      quill.insertText(insertAt + 1, '\n', 'user');
      quill.setSelection(insertAt + 2, 0);
    }
  };

  /** Upload an image and insert into Quill at cursor */
  const uploadInlineImage = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/webp');
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      
      // STRICT: Only WebP images allowed
      if (file.type !== 'image/webp') {
        showToast.error('Jab bola hai WebP me karne ko to karona aalsii WebP me karke wapis dalo.');
        return;
      }
      
      // If SVG, bypass cropper to preserve vector quality
      if (file.type === 'image/svg+xml') {
        try {
          showToast.loading('Uploading SVG...', { id: 'svgUpload' });
          const fd = new FormData();
          fd.append('image', file);
          const res = await api.post(`/blog/upload-image`, fd);
          const imageUrl = res?.data?.url || res?.data?.data?.url || res?.data?.imageUrl || '';
          if (!imageUrl) throw new Error('Upload succeeded but no URL returned');
          insertImageIntoQuill(imageUrl);
          showToast.dismiss('svgUpload');
          showToast.success('SVG inserted');
          return;
        } catch (err) {
          console.error('SVG upload failed', err);
          showToast.dismiss('svgUpload');
          showToast.error('SVG upload failed');
          return;
        }
      }
      // Otherwise open cropper modal with selected file
      try {
        setCompletedCrop(null);
        setRawImageFile(file);
        const objUrl = URL.createObjectURL(file);
        setRawImageUrl(objUrl);
        setShowCropper(true);
      } catch (err) {
        console.error('Failed to open cropper', err);
        showToast.error('Failed to open image cropper');
      }
    };
    input.click();
  };

  /** Category select handler incl. "Other" */
  const handleEditCategory = (e) => {
    const v = e.target.value;
    if (v === '__other__') {
      // reveal input
      setCategories(v);
    } else {
      setCategories(v);
    }
  };

  /** Add new category and select it */
  const addNewCategory = async () => {
    const name = (addedCategory || '').trim();
    if (!name) return;
    try {
      const res = await api.post(
        `/blog/categories`,
        { name }
      );
      const createdName = res?.data?.data?.name || name;
      if (!categoryList.includes(createdName)) {
        setCategoryList((prev) => [...prev, createdName]);
      }
      setCategories(createdName);
      setAddedCategory('');
      showToast.success('Category added');
    } catch (e) {
      // If already exists, still select it
      if (!categoryList.includes(name)) {
        setCategoryList((prev) => [...prev, name]);
      }
      setCategories(name);
      setAddedCategory('');
      showToast.info('Category already exists or saved');
    }
  };

  /** Submit (draft/publish) */
  const handleSubmit = async (e, publishStatus) => {
    const willPublish = publishStatus === true;
    setIsPublished(willPublish);
    e.preventDefault();
    if (isSubmitting) return;

    // Validation
    if (!title.trim()) {
      return showToast.error('Please enter a blog title');
    }
    if (!description || !description.trim()) {
      return showToast.error('Please enter blog content');
    }
    if (!categories || categories === '__other__') {
      return showToast.error('Please select or create a category');
    }
    if (!slug || !slug.trim()) {
      return showToast.error('Please enter a slug');
    }
    if (slugChecking) {
      return showToast.warning('Please wait, checking slug...');
    }
    if (slugAvailable === false) {
      return showToast.error('Slug is already taken. Choose another.');
    }
    if (!frontImage && !frontImagePreview && !blogToEdit) {
      return showToast.error('Please select a featured image');
    }

    // File size validation (10MB limit)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (frontImage && frontImage.size > MAX_FILE_SIZE) {
      return showToast.error('Featured image exceeds maximum size of 10MB');
    }

    // Authorization is handled by the axios interceptor and enforced by the backend.

    setIsSubmitting(true);

    try {
      const formDataAPI = new FormData();
      
      // Basic blog data
      formDataAPI.append('blog_Title', title.trim());
      formDataAPI.append('blog_Description', description);
      formDataAPI.append('blog_Category', categories);
      formDataAPI.append('author', author || 'Admin');
      formDataAPI.append('isPublished', willPublish);

      // SEO payload
      if (metaTitle) formDataAPI.append('metaTitle', metaTitle.trim());
      if (metaDescription) formDataAPI.append('metaDescription', metaDescription.trim());
      if (slug) formDataAPI.append('slug', slug.trim());

      // Related projects
      if (relatedProjects.length > 0) {
        formDataAPI.append('relatedProjects', JSON.stringify(relatedProjects));
      }
      
      // FAQs
      formDataAPI.append('enableFAQ', enableFAQ);
      if (faqs && faqs.some(f => (f.question || '').trim() && (f.answer || '').trim())) {
        const cleaned = faqs
          .map(f => ({ question: (f.question || '').trim(), answer: (f.answer || '').trim() }))
          .filter(f => f.question && f.answer);
        if (cleaned.length) formDataAPI.append('faqs', JSON.stringify(cleaned));
      }

      // Handle file upload with better error handling
      if (frontImage) {
        try {
          // Validate file type - STRICT: Only WebP images allowed
          if (frontImage.type !== 'image/webp') {
            throw new Error('Jab bola hai WebP me karne ko to karona aalsii WebP me karke wapis dalo.');
          }
          
          // Validate file size (10MB limit)
          const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
          if (frontImage.size > MAX_FILE_SIZE) {
            throw new Error('File size exceeds 10MB limit. Please choose a smaller image.');
          }
          
          // Process image if needed (compression/resizing)
          let processedFile;
          try {
            processedFile = await processImageFile(frontImage);
          } catch (processError) {
            console.warn('Image processing failed, using original file:', processError);
            // Fallback to original file if processing fails
            processedFile = frontImage;
          }
          
          formDataAPI.append('blog_Image', processedFile);
        } catch (fileError) {
          console.error('File processing error:', fileError);
          return showToast.error(fileError.message || 'Error processing image');
        }
      }

      if (blogToEdit) {
        showToast.loading('Updating the blog...', { id: 'updateloading' });

        const res = await api.put(`/blog/update/${blogId}`, formDataAPI);

        showToast.dismiss('updateloading');
        if (res.status === 200) {
          showToast.success('Blog updated successfully');
          resetForm();
          navigate('/seo/blogs');
        } else {
          showToast.error('Error updating blog');
        }
      } else {
        showToast.loading('Adding New Blog...', { id: 'loadingNewBlog' });

        const res = await api.post(`/blog/insert`, formDataAPI);

        showToast.dismiss('loadingNewBlog');
        if (res.status === 200) {
          showToast.success('Blog added successfully');
          resetForm();
          navigate('/seo/blogs');
        } else {
          showToast.error('Error adding blog');
        }
      }
    } catch (error) {
      console.error('Blog submit error:', error);
      showToast.dismiss('updateloading');
      showToast.dismiss('loadingNewBlog');

      let errorMessage = 'Error saving blog';
      
      // More detailed error handling
      if (error.response) {
        // Server responded with error status code
        const { status, data } = error.response;
        console.error('Server error response:', { status, data });
        
        if (status === 413) {
          errorMessage = 'File too large. Please upload an image smaller than 10MB.';
        } else if (status === 415) {
          errorMessage = 'Unsupported file type. Please upload a JPG, PNG, or WebP image.';
        } else if (data && data.message) {
          errorMessage = data.message;
        } else {
          errorMessage = `Server error: ${status}`;
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response from server:', error.request);
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message) {
        // Other errors
        errorMessage = error.message;
      }
      
      showToast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // (moved projectSearchTerm and projectSearchResults declarations above)

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setFrontImage(null);
    setFrontImagePreview('');
    setCategories('');
    setBlogId('');
    setMetaTitle('');
    setMetaDescription('');
    setSlug('');
    setSlugTouched(false);
    setRelatedProjects([]);
    setProjectSearchTerm('');
    setProjectSearchResults([]);
    setEnableFAQ(false);
    setFaqs([{ question: '', answer: '' }]);
    setCollapsedFaqs([false]);
  };

  // Quill toolbar config (no default image button; we add our own handlers)
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, false] }],
        // [{ font: fontWhitelist }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'emoji'],
        [{ align: [] }],
        ['clean'],
      ],
    },
    clipboard: { matchVisual: false },
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
  };

  // Explicit formats so custom fonts and toolbar options are honored
  const quillFormats = [
    'header',
    'font',
    'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link',
    'align',
    'clean',
    'image',
  ];

  // Handle paste images (e.g., screenshots) -> open cropper
  useEffect(() => {
    const quill = safeGetQuill();
    if (!quill) return;
    const root = quill.root;
    const onPaste = (e) => {
      if (!e?.clipboardData) return;
      const items = Array.from(e.clipboardData.items || []);
      const fileItem = items.find((it) => it.kind === 'file' && it.type.startsWith('image/'));
      if (fileItem) {
        const file = fileItem.getAsFile();
        if (file) {
          e.preventDefault();
          try {
            setCompletedCrop(null);
            setRawImageFile(file);
            const objUrl = URL.createObjectURL(file);
            setRawImageUrl(objUrl);
            setShowCropper(true);
          } catch (err) {
            console.error('Failed to open cropper from paste', err);
            showToast.error('Failed to open image cropper');
          }
        }
      }
    };
    root.addEventListener('paste', onPaste);
    // Image click -> open lightbox
    const onClick = (e) => {
      const t = e.target;
      if (t && t.tagName === 'IMG') {
        const src = t.getAttribute('src');
        if (src) setLightboxUrl(src);
      }
    };
    root.addEventListener('click', onClick);
    return () => {
      root.removeEventListener('paste', onPaste);
      root.removeEventListener('click', onClick);
    };
  }, []);

  /**
   * Process and compress image file before upload
   * @param {File} file - The image file to process
   * @returns {Promise<File>} - Processed file with reduced size
   */
  const processImageFile = (file) => {
    return new Promise((resolve, reject) => {
      try {
        // Skip processing for small files (<1MB) or non-image files
        if (file.size < 1024 * 1024 || !file.type.startsWith('image/')) {
          return resolve(file);
        }

        // Skip processing for SVG files
        if (file.type === 'image/svg+xml') {
          return resolve(file);
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const img = new Image();
            img.onload = () => {
              try {
                // Calculate new dimensions (max 2000px on the longest side)
                const MAX_DIMENSION = 2000;
                let width = img.width;
                let height = img.height;
                
                if (width > height && width > MAX_DIMENSION) {
                  height = Math.round((height * MAX_DIMENSION) / width);
                  width = MAX_DIMENSION;
                } else if (height > MAX_DIMENSION) {
                  width = Math.round((width * MAX_DIMENSION) / height);
                  height = MAX_DIMENSION;
                }

                // Create canvas for resizing
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                
                if (!ctx) {
                  return reject(new Error('Canvas context not available'));
                }
                
                // Set canvas properties for better quality
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                
                // Draw image with new dimensions
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convert to blob with quality based on file type
                let quality = 0.8; // Default quality
                let outputType = file.type;
                
                // Adjust quality and type based on file type
                if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                  quality = 0.85;
                  outputType = 'image/jpeg';
                } else if (file.type === 'image/png') {
                  quality = 0.9;
                  outputType = 'image/png';
                } else if (file.type === 'image/webp') {
                  quality = 0.8;
                  outputType = 'image/webp';
                } else {
                  // Convert unknown formats to JPEG
                  quality = 0.85;
                  outputType = 'image/jpeg';
                }
                
                // Convert to blob
                canvas.toBlob(
                  (blob) => {
                    try {
                      if (!blob) {
                        return reject(new Error('Canvas to blob conversion failed'));
                      }
                      
                      // Create new file with original name but new content
                      const fileExtension = outputType === 'image/png' ? '.png' : 
                                          outputType === 'image/webp' ? '.webp' : '.jpg';
                      const baseName = file.name.replace(/\.[^.]+$/, '');
                      const processedFile = new File(
                        [blob],
                        baseName + fileExtension,
                        { type: outputType }
                      );
                      
                      console.log(`Image compressed from ${(file.size / 1024 / 1024).toFixed(2)}MB to ${(blob.size / 1024 / 1024).toFixed(2)}MB`);
                      resolve(processedFile);
                    } catch (blobError) {
                      console.error('Error creating processed file:', blobError);
                      reject(new Error('Failed to create processed file'));
                    }
                  },
                  outputType,
                  quality
                );
              } catch (canvasError) {
                console.error('Error processing image with canvas:', canvasError);
                reject(new Error('Failed to process image'));
              }
            };
            img.onerror = (imgError) => {
              console.error('Error loading image:', imgError);
              reject(new Error('Failed to load image for processing'));
            };
            img.src = e.target.result;
          } catch (imgError) {
            console.error('Error setting up image processing:', imgError);
            reject(new Error('Failed to set up image processing'));
          }
        };
        reader.onerror = (readerError) => {
          console.error('Error reading file:', readerError);
          reject(new Error('Failed to read file'));
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error in processImageFile:', error);
        // Fallback: return original file if processing fails
        resolve(file);
      }
    });
  };

  // Cleanup featured preview object URL
  useEffect(() => {
    return () => {
      if (frontPreviewObjUrl) URL.revokeObjectURL(frontPreviewObjUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply B/W mode to editor root
  useEffect(() => {
    const quill = safeGetQuill();
    if (!quill) return;
    const root = quill.root;
    if (bwMode) root.classList.add('bw-mode');
    else root.classList.remove('bw-mode');
  }, [bwMode]);

  // Helper to apply selected font to current selection
  const applyFontToSelection = (fontName) => {
    const quill = safeGetQuill();
    if (!quill) return;
    quill.format('font', fontName);
  };

  // Apply current grid controls to the grid at the cursor (also set inline styles + flex fallback for publish)
  const applyGridSettingsToSelection = () => {
    const quill = safeGetQuill();
    if (!quill) return;
    const sel = quill.getSelection(true);
    if (!sel) return;
    const leaf = quill.getLeaf(sel.index)?.[0];
    if (!leaf || !leaf.domNode) return;
    let node = leaf.domNode;
    // If cursor is inside frame, step into inner grid
    let frameNode = null;
    while (node && node !== quill.root && !(node.classList && (node.classList.contains('img-grid-4') || node.classList.contains('img-grid-4-frame')))) {
      node = node.parentNode;
    }
    if (node && node.classList.contains('img-grid-4-frame')) {
      frameNode = node;
      node = node.querySelector('.img-grid-4') || node;
    }
    if (!node || node === quill.root || !node.classList.contains('img-grid-4')) {
      showToast.info('Place the cursor inside a 4-image grid to apply settings');
      return;
    }
    // Update height and layout
    node.style.setProperty('--grid-img-height', `${gridSizeToPx[gridImgSize]}px`);
    node.classList.remove('layout-equal', 'layout-lastLarge');
    node.classList.add(`layout-${gridLayout}`);
    // Inline styles for publish rendering (flex fallback + grid)
    node.style.display = 'flex';
    node.style.flexWrap = 'nowrap';
    node.style.alignItems = 'stretch';
    node.style.gap = '12px';
    // Grid (if supported / not stripped)
    node.style.display = 'grid';
    node.style.gridTemplateColumns = gridLayout === 'lastLarge' ? '1fr 1fr 1fr 1.6fr' : 'repeat(4, 1fr)';
    if (frameNode) {
      frameNode.style.border = '3px solid #111';
      frameNode.style.borderRadius = '18px';
      frameNode.style.padding = '14px';
      frameNode.style.background = '#fff';
    }
    // Ensure each child is a figure.grid-card
    const ensureFigure = (child) => {
      if (child.tagName === 'FIGURE' && child.classList.contains('grid-card')) return child;
      if (child.tagName === 'IMG') {
        const fig = document.createElement('figure');
        fig.className = 'grid-card';
        child.replaceWith(fig);
        fig.appendChild(child);
        return fig;
      }
      return child;
    };
    const kids = Array.from(node.children);
    kids.forEach((k, idx) => {
      const fig = ensureFigure(k);
      const img = fig.querySelector('img');
      if (!img) return;
      // Inline styles for card and image
      fig.style.background = '#fff';
      fig.style.border = '2px solid #222';
      fig.style.borderRadius = '16px';
      fig.style.overflow = 'hidden';
      fig.style.display = 'flex';
      fig.style.flexDirection = 'column';
      // Flex fallback widths
      if (gridLayout === 'lastLarge') {
        fig.style.flex = idx === kids.length - 1 ? '0 0 40%' : '0 0 calc((60% - 36px)/3)';
        fig.style.width = idx === kids.length - 1 ? '40%' : 'calc((60% - 36px)/3)';
      } else {
        fig.style.flex = '0 0 calc((100% - 36px)/4)';
        fig.style.width = 'calc((100% - 36px)/4)';
      }
      img.style.width = '100%';
      img.style.height = `${gridSizeToPx[gridImgSize]}px`;
      img.style.objectFit = 'cover';
      img.style.display = 'block';
      const cap = fig.querySelector('figcaption');
      if (gridWithTitles) {
        if (!cap) {
          const c = document.createElement('figcaption');
          c.setAttribute('contenteditable', 'true');
          c.textContent = 'Title';
          c.style.padding = '8px 10px';
          c.style.fontSize = '14px';
          c.style.color = '#111';
          c.style.textAlign = 'center';
          fig.appendChild(c);
        }
      } else if (cap) {
        cap.remove();
      }
    });
    showToast.success('Applied grid settings');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4 lg:p-6">
      <div className="w-full">
        {/* Inline styles to improve image UX */}
        <style>{`
          /* Featured preview should never render black due to cover; use contain */
          .featured-preview { background:#f8fafc; object-fit: contain; }
          /* Quill content images small by default, click to zoom */
          .ql-editor img { max-width: 100%; height: auto; max-height: 260px; display: block; margin: 8px auto; cursor: zoom-in; border-radius: 8px; }
          /* Grid frame with title (outer border like your mockup) */
          .img-grid-4-frame{ border:3px solid #111; border-radius:18px; padding:14px; background:#fff; }
          .img-grid-4-frame > .grid-title{ text-align:center; font-weight:700; margin:4px 0 12px; font-size:16px; outline:none; }
          /* Four image grid block */
          .img-grid-4 { display:grid; gap:12px; }
          .img-grid-4.layout-equal{ grid-template-columns: repeat(4, 1fr); }
          .img-grid-4.layout-lastLarge{ grid-template-columns: 1fr 1fr 1fr 1.6fr; }
          .img-grid-4 .grid-card{ background:#fff; border:2px solid #222; border-radius:16px; overflow:hidden; display:flex; flex-direction:column; }
          .img-grid-4 .grid-card img { width:100%; height: var(--grid-img-height, 160px); object-fit: cover; cursor: zoom-in; display:block; }
          .img-grid-4 .grid-card figcaption{ padding:8px 10px; font-size:14px; color:#111; text-align:center; outline:none; }
          @media (max-width: 768px){ .img-grid-4{ grid-template-columns: repeat(2, 1fr);} }
          /* Black & White toggle */
          .ql-editor.bw-mode img { filter: grayscale(1); }
          /* Font mappings for editor */
          .ql-font-inter{font-family:'Inter',sans-serif}
          .ql-font-roboto{font-family:'Roboto',sans-serif}
          .ql-font-poppins{font-family:'Poppins',sans-serif}
          .ql-font-montserrat{font-family:'Montserrat',sans-serif}
          .ql-font-lato{font-family:'Lato',sans-serif}
          .ql-font-open-sans{font-family:'Open Sans',sans-serif}
          .ql-font-raleway{font-family:'Raleway',sans-serif}
          .ql-font-nunito{font-family:'Nunito',sans-serif}
          .ql-font-merriweather{font-family:'Merriweather',serif}
          .ql-font-playfair{font-family:'Playfair Display',serif}
          .ql-font-source-sans{font-family:'Source Sans 3',sans-serif}
          .ql-font-ubuntu{font-family:'Ubuntu',sans-serif}
          .ql-font-work-sans{font-family:'Work Sans',sans-serif}
          .ql-font-rubik{font-family:'Rubik',sans-serif}
          .ql-font-mulich, .ql-font-mulish{font-family:'Mulish',sans-serif}
          .ql-font-josefin{font-family:'Josefin Sans',sans-serif}
          .ql-font-quicksand{font-family:'Quicksand',sans-serif}
          .ql-font-dm-sans{font-family:'DM Sans',sans-serif}
          .ql-font-pt-serif{font-family:'PT Serif',serif}
          .ql-font-arimo{font-family:'Arimo',sans-serif}

          /* Show font names in the toolbar dropdown */
          .ql-snow .ql-picker.ql-font .ql-picker-label::before { content: 'Sans Serif'; }
          .ql-snow .ql-picker.ql-font .ql-picker-item::before { content: attr(data-label); }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="inter"]::before { content: 'Inter'; font-family:'Inter',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="inter"]{ font-family:'Inter',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="roboto"]::before { content: 'Roboto'; font-family:'Roboto',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="roboto"]{ font-family:'Roboto',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="poppins"]::before { content: 'Poppins'; font-family:'Poppins',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="poppins"]{ font-family:'Poppins',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="montserrat"]::before { content: 'Montserrat'; font-family:'Montserrat',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="montserrat"]{ font-family:'Montserrat',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="lato"]::before { content: 'Lato'; font-family:'Lato',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="lato"]{ font-family:'Lato',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="open-sans"]::before { content: 'Open Sans'; font-family:'Open Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="open-sans"]{ font-family:'Open Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="raleway"]::before { content: 'Raleway'; font-family:'Raleway',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="raleway"]{ font-family:'Raleway',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="nunito"]::before { content: 'Nunito'; font-family:'Nunito',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="nunito"]{ font-family:'Nunito',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="merriweather"]::before { content: 'Merriweather'; font-family:'Merriweather',serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="merriweather"]{ font-family:'Merriweather',serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="playfair"]::before { content: 'Playfair'; font-family:'Playfair Display',serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="playfair"]{ font-family:'Playfair Display',serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="source-sans"]::before { content: 'Source Sans'; font-family:'Source Sans 3',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="source-sans"]{ font-family:'Source Sans 3',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="ubuntu"]::before { content: 'Ubuntu'; font-family:'Ubuntu',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="ubuntu"]{ font-family:'Ubuntu',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="work-sans"]::before { content: 'Work Sans'; font-family:'Work Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="work-sans"]{ font-family:'Work Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="rubik"]::before { content: 'Rubik'; font-family:'Rubik',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="rubik"]{ font-family:'Rubik',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="mulish"]::before { content: 'Mulish'; font-family:'Mulish',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="mulish"]{ font-family:'Mulish',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="josefin"]::before { content: 'Josefin Sans'; font-family:'Josefin Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="josefin"]{ font-family:'Josefin Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="quicksand"]::before { content: 'Quicksand'; font-family:'Quicksand',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="quicksand"]{ font-family:'Quicksand',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="dm-sans"]::before { content: 'DM Sans'; font-family:'DM Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="dm-sans"]{ font-family:'DM Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="pt-serif"]::before { content: 'PT Serif'; font-family:'PT Serif',serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="pt-serif"]{ font-family:'PT Serif',serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="arimo"]::before { content: 'Arimo'; font-family:'Arimo',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="arimo"]{ font-family:'Arimo',sans-serif }
          /* Distinct item labels for Header picker */
          .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="false"]::before { content: 'Normal'; }
          .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before { content: 'H1'; }
          .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before { content: 'H2'; }
          .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before { content: 'H3'; }
          .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before { content: 'H4'; }
          .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="false"]::before { content: 'Normal'; }
          .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before { content: 'H1'; }
          .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before { content: 'H2'; }
          .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before { content: 'H3'; }
          .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before { content: 'H4'; }

          /* Distinct item labels for Size picker */
          .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before { content: 'Small'; }
          .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="false"]::before { content: 'Normal'; }
          .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before { content: 'Large'; }
          .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before { content: 'Huge'; }
          .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before { content: 'Small'; }
          .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="false"]::before { content: 'Normal'; }
          .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before { content: 'Large'; }
          .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before { content: 'Huge'; }
          /* Let labels reflect the currently selected value (default Quill behavior) */
          /* Fullscreen editor layout: wrapper takes full viewport, editor flexes */
          .editor-fs-wrap{ height:100dvh; display:flex; flex-direction:column; }
          .editor-fs{ flex:1 1 auto; display:flex; flex-direction:column; min-height:0; overflow:auto; }
          .editor-fs .ql-toolbar{ flex:0 0 auto; position: sticky; top: 0; z-index: 10; background:#fff; box-shadow: 0 1px 0 0 rgba(0,0,0,0.06); }
          .editor-fs .ql-container{ flex:1 1 auto; height:auto; min-height:0; }
          .editor-fs .ql-editor{ min-height:100%; padding-bottom:24px; }

          /* Normal editor box polish: let outer box own the border & radius */
          .quill-box{ overflow:visible; }
          .quill-box .ql-toolbar.ql-snow{ border:none; border-bottom:1px solid #e5e7eb; border-radius:0; position: sticky; top: 0; z-index: 5; background:#fff; }
          /* Auto height; allow outer resizable wrapper to control scroll */
          .quill-box .ql-container.ql-snow{ border:none; height:auto; max-height:none; overflow:visible; }
          .quill-box .ql-editor{ min-height:16rem; padding-bottom:48px; }

          /* User-resizable area for the normal editor */
          .editor-resize{ resize: vertical; overflow:auto; min-height:16rem; max-height:75vh; }
        `}</style>
        {/* Top bar: SEO score, preview toggle, restore */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">SEO Score:</span>
            <span className="px-2.5 py-1 rounded-full text-white text-sm" style={{ backgroundColor: seoScore.color }}>
              {seoScore.score} · {seoScore.label}
            </span>
          </div>
        {/* Two-column section: left = SEO Insights, right = actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            {seoInsights?.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow p-4 h-full">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-gray-900">SEO Insights</div>
                  <button type="button" className="text-sm text-gray-600 hover:text-gray-800" onClick={()=>setShowSeoDetails(v=>!v)}>
                    {showSeoDetails ? 'Hide' : 'Show'} details
                  </button>
                </div>
                {showSeoDetails && (
                  <ul className="space-y-1 max-h-56 overflow-auto pr-1">
                    {seoInsights.map((it, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className={`mt-1 inline-block w-2 h-2 rounded-full ${it.severity==='good'?'bg-emerald-500':it.severity==='warn'?'bg-yellow-500':'bg-red-500'}`}></span>
                        <span className="text-gray-800">
                          {it.text}
                          {it.section && <span className="ml-2 text-xs text-gray-500">[{it.section}]</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow p-4 flex flex-wrap items-center gap-2 justify-end lg:justify-start">
            <button type="button" onClick={() => setShowPreview(v=>!v)} className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            {hasRestorable && (
              <button type="button" onClick={() => {
                try {
                  const raw = localStorage.getItem(draftKey);
                  if (!raw) return;
                  const s = JSON.parse(raw);
                  setTitle(s.title || '');
                  setDescription(s.description || '');
                  setFrontImagePreview(s.frontImagePreview || '');
                  setCategories(s.categories || '');
                  setMetaTitle(s.metaTitle || '');
                  setMetaDescription(s.metaDescription || '');
                  setSlug(s.slug || '');
                  setRelatedProjects(Array.isArray(s.relatedProjects) ? s.relatedProjects : []);
                  setEnableFAQ(!!s.enableFAQ);
                  setFaqs(Array.isArray(s.faqs) && s.faqs.length ? s.faqs : [{question:'',answer:''}]);
                  setAuthor(s.author || author);
                  showToast.success('Draft restored');
                } catch {}
              }} className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <History className="w-4 h-4" /> Restore Draft
              </button>
            )}
            {historyList?.length > 0 && (
              <button type="button" onClick={() => setShowHistory(true)} className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <History className="w-4 h-4" /> History
              </button>
            )}
          </div>
        </div>
        </div>
        {/* Load fonts */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Roboto:wght@300;400;700&family=Poppins:wght@300;400;600;700&family=Montserrat:wght@300;400;600;700&family=Lato:wght@300;400;700&family=Open+Sans:wght@300;400;700&family=Raleway:wght@300;400;700&family=Nunito:wght@300;400;700&family=Merriweather:wght@300;400;700&family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;700&family=Ubuntu:wght@300;400;700&family=Work+Sans:wght@300;400;700&family=Rubik:wght@300;400;700&family=Mulish:wght@300;400;700&family=Josefin+Sans:wght@300;400;700&family=Quicksand:wght@300;400;700&family=DM+Sans:wght@300;400;700&family=PT+Serif:wght@400;700&family=Arimo:wght@400;700&display=swap" />
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                {blogToEdit ? (
                  <Edit3 className="w-6 h-6 text-white" />
                ) : (
                  <Plus className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {blogToEdit ? 'Edit Blog Post ' : 'Create New Blog'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {blogToEdit
                    ? 'Update your blog content, SEO and settings'
                    : 'Write and publish your next blog post'}
                </p>
              </div>
            </div>
            {blogToEdit && (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200" title="Total views (all time)">Views: {views}</span>
              </div>
            )}
            <button
              onClick={() => navigate('/seo/blogs')}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Cropper Modal */}
        {showCropper && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
            }}
          >
            <div style={{ background: '#fff', padding: 16, borderRadius: 8, width: 'min(95vw, 900px)' }}>
              <h3 style={{ margin: '0 0 8px' }}>Crop Image</h3>
              <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
                {rawImageUrl && (
                  <ReactCrop crop={crop} onChange={(c) => setCrop(c)} onComplete={(c) => setCompletedCrop(c)} aspect={crop.aspect}>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img
                      ref={cropImgRef}
                      src={rawImageUrl}
                      onLoad={() => {
                        if (!completedCrop) {
                          setCrop((prev) => ({ ...prev }));
                        }
                      }}
                      style={{ maxWidth: '100%' }}
                    />
                  </ReactCrop>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
                <button type="button" onClick={closeCropper} style={{ padding: '6px 12px' }}>
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmCropAndInsert}
                  style={{ padding: '6px 12px', background: '#1677ff', color: '#fff', border: 'none', borderRadius: 4 }}
                >
                  Crop & Insert
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <form className="p-6 space-y-8">
            {/* Title */}
           <div className="space-y-2">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <FileText className="w-4 h-4 text-blue-600" />
      <label htmlFor="title" className="text-sm font-medium text-gray-900">
        Blog Title
      </label>
    </div>
    {title && (
      <div className="text-xs text-gray-500">
        {title.length}/100
      </div>
    )}
  </div>
  <input
    type="text"
    id="title"
    value={title}
    onChange={(e) => setTitle(e.target.value.slice(0, 100))}
    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
    placeholder="Enter your blog title..."
    required
  />
  {titleKeywords.length > 0 && (
    <div className="flex flex-wrap gap-1.5 mt-1">
      <span className="text-[10px] text-gray-500 self-center">Keywords:</span>
      {titleKeywords.slice(0, 4).map((k, i) => (
        <span
          key={k + i}
          className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] border border-blue-100"
        >
          {k}
        </span>
      ))}
      {titleKeywords.length > 4 && (
        <span className="text-[10px] text-gray-400 self-center">
          +{titleKeywords.length - 4} more
        </span>
      )}
    </div>
  )}
</div>

            {/* Slug + Meta */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Slug URL */}
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-gray-700">Slug URL</label>
    <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm">
      <span className="px-2 py-2 flex items-center text-gray-500 bg-gray-50 border-r border-gray-200 text-xs">
        <LinkIcon className="w-3.5 h-3.5 mr-1.5" />
        /blog/
      </span>
      <input
        type="text"
        value={slug}
        onChange={(e) => {
          setSlugTouched(true);
          setSlug(slugify(e.target.value));
        }}
        className="flex-1 px-2 py-2 min-w-0 text-sm focus:outline-none"
        placeholder="my-custom-slug"
      />
      <div className="flex">
        <button
          type="button"
          onClick={() => {
            setSlugTouched(false);
            setSlug(slugify(title));
          }}
          className="px-2 text-xs bg-gray-50 hover:bg-gray-100 border-l border-gray-200 h-full"
          title="Reset slug to match title"
        >
          ⟲
        </button>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(`/blog/${slug}`);
              setSlugCopied(true);
              setTimeout(() => setSlugCopied(false), 1200);
            } catch {}
          }}
          className="px-2 text-xs bg-gray-50 hover:bg-gray-100 border-l border-gray-200 h-full flex items-center"
          title="Copy full slug URL"
        >
          {slugCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
    <p className="text-[11px] text-gray-500">
      Auto-generates from title
    </p>
    {slug && (
      <div className="text-[11px] mt-0.5">
        {slugChecking ? (
          <span className="text-gray-500">{slugCheckMsg}</span>
        ) : (
          <span className={slugAvailable ? 'text-green-600' : 'text-red-600'}>
            {slugCheckMsg || (slugAvailable ? 'Slug available' : 'Slug taken')}
          </span>
        )}
      </div>
    )}
  </div>

  {/* Meta Title */}
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-gray-700">Meta Title</label>
    <div className="relative">
      <input
        type="text"
        value={metaTitle}
        onChange={(e) => setMetaTitle(e.target.value.slice(0, 60))}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        placeholder="Up to 60 characters"
      />
      <div className="absolute right-2 bottom-1.5 text-[11px] text-gray-500">
        {metaTitle.length}/60
      </div>
    </div>
  </div>

  {/* Meta Description */}
  <div className="space-y-1.5">
  <div className="flex items-center justify-between">
    <label className="text-xs font-medium text-gray-700">Meta Description</label>
    <div className={`text-[10px] font-medium ${
      metaDescription.length >= 120 && metaDescription.length <= 160
        ? 'text-green-600'
        : metaDescription.length >= 80
        ? 'text-yellow-600'
        : 'text-red-600'
    }`}>
      {metaDescription.length}/160
    </div>
  </div>
  <div className="relative">
    <textarea
      value={metaDescription}
      onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))}
      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
      placeholder="Up to 160 characters"
      rows={2}
    />
    {titleKeywords.length > 0 && (
      <div className="mt-1 flex flex-wrap gap-1.5">
        <span className="text-[10px] text-gray-500 self-center">Keywords:</span>
        {titleKeywords.slice(0, 3).map((k, i) => (
          <button
            key={k + i}
            type="button"
            className="px-1.5 py-0.5 rounded bg-gray-50 hover:bg-gray-100 text-[10px] border border-gray-200 text-gray-700"
            onClick={() => setMetaDescription((v) => (v ? `${v} ${k}` : k).slice(0, 160))}
          >
            {k}
          </button>
        ))}
        {titleKeywords.length > 3 && (
          <span 
            className="text-[10px] text-gray-400 self-center"
            title={titleKeywords.slice(3).join(', ')}
          >
            +{titleKeywords.length - 3} more
          </span>
        )}
      </div>
    )}
  </div>
</div>
</div>

            {/* Featured Image */}
          <div className="space-y-4">
  {/* Featured Image Section */}
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <ImageIcon className="w-4 h-4 text-green-600" />
      <label className="text-sm font-medium text-gray-900">Featured Image </label>
    </div>

    {/* Two-column layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {/* Image Preview */}
      <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-white">
        {frontImagePreview ? (
          <div className="relative">
            <img
              src={frontImagePreview}
              alt="Featured preview"
              className="w-full h-48 object-cover"
              onError={(e) => {
                if (!frontTriedProxy) {
                  const src = originalFrontUrlRef.current || frontImagePreview;
                  const stripProto = (u) => (u || '').replace(/^https?:\/\//i, '');
                  const proxied = `https://images.weserv.nl/?url=${encodeURIComponent(stripProto(src))}`;
                  setFrontImagePreview(proxied);
                  setFrontTriedProxy(true);
                } else {
                  setFrontImageError(true);
                }
              }}
            />
            {frontImageError && (
              <div className="absolute bottom-1 left-1 right-1 bg-white/90 backdrop-blur rounded p-1 border border-amber-200 text-xs flex flex-wrap gap-1">
                <span className="text-amber-800 text-[10px]">Image failed to load</span>
                <button 
                  type="button" 
                  className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 hover:bg-amber-200 text-[10px]"
                  onClick={() => {
                    setFrontImageError(false);
                    setFrontImagePreview(originalFrontUrlRef.current || frontImagePreview);
                  }}
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="h-32 flex items-center justify-center text-gray-400 text-sm">
            No image selected
          </div>
        )}
      </div>

      {/* Upload Controls */}
      <div className="space-y-2">
        <div 
          className="relative border-2 border-dashed border-gray-200 rounded-lg p-3 text-center hover:border-blue-300 transition-colors"
          onDragOver={onFeaturedDragOver}
          onDrop={onFeaturedDrop}
        >
          <input
            type="file"
            id="featured-image-upload"
            accept="image/webp"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="space-y-1">
            <UploadCloud className="w-6 h-6 mx-auto text-gray-400" />
            <p className="text-xs font-medium text-gray-700">
              {frontImagePreview ? 'Click to change' : 'Upload WebP image'}
            </p>
            <p className="text-[10px] text-gray-500">
              {frontImagePreview ? 'or drag & drop' : 'or paste URL below'}
            </p>
          </div>
        </div>

        <input
          type="text"
          className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
          placeholder="Paste WebP URL"
          onPaste={async (e) => {
            try {
              const pastedText = e.clipboardData.getData('text/plain');
              if (pastedText) {
                e.preventDefault();
                handleImageUrlChange({ target: { value: pastedText } });
              }
            } catch (err) {
              console.error('Error handling paste:', err);
            }
          }}
          onChange={handleImageUrlChange}
          value={frontImage || ''}
        />
      </div>
    </div>
  </div>

  {/* Blog Category Section */}
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Tag className="w-4 h-4 text-purple-600" />
      <label className="text-sm font-medium text-gray-900">Category</label>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <select
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-500"
        value={categories}
        onChange={handleEditCategory}
      >
        <option value="">Select category</option>
        {categoryList.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
        <option value="__other__">+ Add new</option>
      </select>

      {categories === '__other__' && (
        <>
          <input
            type="text"
            value={addedCategory}
            onChange={(e) => setAddedCategory(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-500"
            placeholder="New category name"
          />
          <button
            type="button"
            onClick={addNewCategory}
            className="px-3 py-2 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700"
            disabled={!addedCategory.trim()}
          >
            Add
          </button>
        </>
      )}
    </div>
  </div>
</div>

            {/* Related Projects Section */}
            <div className="space-y-3">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <LinkIcon className="w-4 h-4 text-indigo-600" />
      <span className="text-sm font-medium text-gray-900">Related Projects</span>
      <span className="text-xs text-gray-500">({relatedProjects.length}/5)</span>
    </div>
    {autoSuggestEnabled && suggestedProjects.length > 0 && (
      <button
        type="button"
        className="px-2 py-1 text-xs rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
        onClick={() => {
          const toAdd = suggestedProjects.slice(0, Math.max(0, 5 - relatedProjects.length));
          toAdd.forEach(addRelatedProject);
        }}
        disabled={relatedProjects.length >= 5}
      >
        Add Top {Math.min(3, suggestedProjects.length)} Suggested
      </button>
    )}
  </div>

  {/* Suggestions grid */}
  {autoSuggestEnabled && suggestedProjects.length > 0 && (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {suggestedProjects.slice(0, 4).map((p, idx) => (
        <div key={`${p.project_url}-${idx}`} className="flex items-center justify-between p-2 bg-white border border-gray-100 rounded-lg">
          <div className="flex items-center gap-2 min-w-0">
            {p.thumbnail && (
              <img 
                src={p.thumbnail} 
                alt="" 
                className="w-8 h-8 rounded object-cover" 
                onError={(e) => e.target.style.display='none'} 
              />
            )}
            <div className="min-w-0">
              <div className="text-xs font-medium text-gray-900 truncate">{p.projectName || 'Project'}</div>
              <div className="text-[10px] text-gray-500 truncate">{p.builderName || p.city || ''}</div>
            </div>
          </div>
          <button 
            type="button" 
            className="px-2 py-0.5 text-xs rounded bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => addRelatedProject(p)} 
            disabled={relatedProjects.length >= 5}
          >
            Add
          </button>
        </div>
      ))}
    </div>
  )}

  {/* Project search */}
  <div className="relative">
    <input
      type="text"
      value={projectSearchTerm}
      onChange={(e) => setProjectSearchTerm(e.target.value)}
      placeholder="Search projects..."
      className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500"
    />
    {projectSearchTerm && (
      <button
        type="button"
        onClick={() => setProjectSearchTerm('')}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        title="Clear"
      >
        ×
      </button>
    )}
  </div>

  {/* Project dropdown */}
  <div className="relative">
    <select
      className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500"
      onChange={(e) => {
        const idx = Number(e.target.value);
        const source = projectSearchTerm.trim().length >= 2 ? projectSearchResults : allProjects;
        const list = source
          .filter(project => !relatedProjects.find(rp => rp.project_url === project.project_url))
          .filter(p => {
            const q = (projectSearchTerm || '').trim().toLowerCase();
            if (!q) return true;
            const hay = `${p.projectName || ''} ${p.builderName || ''} ${p.location || ''} ${p.city || ''}`.toLowerCase();
            return hay.includes(q);
          });
        if (!Number.isNaN(idx) && list[idx]) addRelatedProject(list[idx]);
        e.target.value = '';
      }}
      defaultValue=""
    >
      <option value="" disabled>{isLoadingProjects ? 'Loading...' : 'Select a project to add'}</option>
      {(projectSearchTerm.trim().length >= 2 ? projectSearchResults : allProjects)
        .filter(project => !relatedProjects.find(rp => rp.project_url === project.project_url))
        .filter(p => {
          const q = (projectSearchTerm || '').trim().toLowerCase();
          if (!q) return true;
          const hay = `${p.projectName || ''} ${p.builderName || ''} ${p.location || ''} ${p.city || ''}`.toLowerCase();
          return hay.includes(q);
        })
        .map((p, idx) => (
          <option key={p.project_url || `${p.projectName}-${idx}`} value={idx}>
            {p.projectName || `Project ${idx+1}`}
            {p.builderName ? ` — ${p.builderName}` : ''}
          </option>
        ))}
    </select>
    {isLoadingProjects && (
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
      </div>
    )}
  </div>

  {/* Selected projects */}
  {relatedProjects.length > 0 && (
    <div className="space-y-1.5 mt-2">
      <div className="text-xs font-medium text-gray-700">Selected Projects ({relatedProjects.length}/5):</div>
      <div className="space-y-1.5">
        {relatedProjects.map((project, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-white border border-gray-100 rounded-lg"
          >
            <div className="flex items-center gap-2 min-w-0">
              {project.thumbnail && (
                <img
                  src={project.thumbnail}
                  alt=""
                  className="w-6 h-6 object-cover rounded"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">
                  {project.projectName || 'Project'}
                </p>
                <p className="text-[10px] text-indigo-600 truncate">
                  {project.project_url?.replace(/^https?:\/\//, '')}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeRelatedProject(project.project_url)}
              className="p-0.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
              title="Remove"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

            {/* Editor Controls */}
          <div className="flex flex-wrap items-center gap-2">
  <button
    type="button"
    onClick={uploadInlineImage}
    className="px-3 py-1.5 text-xs rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1.5"
    title="Upload image and insert at cursor"
  >
    <Upload className="w-3.5 h-3.5" />
    Insert Image
  </button>
  
  <button
    type="button"
    onClick={insertImageByUrl}
    className="px-3 py-1.5 text-xs rounded-lg bg-sky-600 text-white hover:bg-sky-700 flex items-center gap-1.5"
    title="Insert image by URL at cursor"
  >
    <ImageIcon className="w-3.5 h-3.5" />
    Insert from URL
  </button>
  
  <button
    type="button"
    onClick={async () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/webp';
      input.multiple = true;
      input.onchange = async () => {
        const files = Array.from(input.files || []).slice(0, 4);
        if (!files.length) return;
        
        // STRICT: Check all files are WebP
        const nonWebpFiles = files.filter(file => file.type !== 'image/webp');
        if (nonWebpFiles.length > 0) {
          showToast.error('Only WebP images are allowed');
          return;
        }
        
        showToast.loading('Uploading...', { id: 'gridUpload' });
        try {
          const urls = [];
          for (const f of files) {
            const fd = new FormData();
            fd.append('image', f);
            const r = await api.post(`/blog/upload-image`, fd);
            const u = r?.data?.url || r?.data?.data?.url || r?.data?.imageUrl || '';
            if (u) urls.push(u);
          }
          const cardStyle = 'background:#fff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;display:flex;flex-direction:column;';
          const imgStyle = `width:100%;height:${gridSizeToPx[gridImgSize]}px;object-fit:cover;display:block;`;
          const cards = urls.map((u, idx) => 
            `<figure class="grid-card" style="${cardStyle}">
              <img style="${imgStyle}" src="${u}" alt="" />
              ${gridWithTitles ? `<figcaption style="padding:4px 6px;font-size:12px;color:#4b5563;text-align:center;" contenteditable="true">Title ${idx+1}</figcaption>` : ''}
            </figure>`
          ).join('');
          const gridCols = gridLayout === 'lastLarge' ? '1fr 1fr 1fr 1.6fr' : 'repeat(4, 1fr)';
          const inner = `<div class="img-grid-4 layout-${gridLayout}" style="display:grid;grid-template-columns:${gridCols};gap:8px;margin:8px 0;">${cards}</div>`;
          const html = gridWithTitles
            ? `<section class="img-grid-4-frame" style="border:1px solid #e5e7eb;border-radius:8px;padding:8px;background:#f9fafb;">
                <div class="grid-title" style="text-align:center;font-weight:600;margin:0 0 8px;font-size:13px;color:#374151;" contenteditable="true">Grid Title</div>
                ${inner}
              </section>` 
            : `${inner}<p><br/></p>`;
          const quill = safeGetQuill();
          if (quill) {
            const sel = quill.getSelection(true) || { index: quill.getLength(), length: 0 };
            quill.clipboard.dangerouslyPasteHTML(sel.index, html, 'user');
            quill.setSelection(sel.index + 1, 0);
          }
          showToast.success('Inserted image grid');
        } catch (err) {
          console.error(err);
          showToast.error('Failed to insert grid');
        } finally {
          showToast.dismiss('gridUpload');
        }
      };
      input.click();
    }}
    className="px-3 py-1.5 text-xs rounded-lg bg-purple-600 text-white hover:bg-purple-700"
    title="Insert 4 images as a grid"
  >
    Insert 4-Image Grid
  </button>
  
  <button
    type="button"
    onClick={() => setBwMode(v => !v)}
    className="px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
    title="Toggle Black & White mode for images"
  >
    {bwMode ? 'Color Mode' : 'B/W Mode'}
  </button>
</div>

            {/* Content Editor */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Edit3 className="w-5 h-5 text-orange-600" />
                  <label className="text-lg font-semibold text-gray-900">
                    Blog Content
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setEditorFullscreen(true)}
                  className="px-2 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center gap-1"
                  title="Open editor in full screen"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Full screen</span>
                </button>
              </div>

              {!editorFullscreen && (
                <div className="quill-box border border-gray-200 rounded-xl mb-4 bg-white shadow-sm">
                  <div className="quill-editor-container editor-resize">
                    <ReactQuill
                      ref={quillRef}
                      theme="snow"
                      value={description}
                      onChange={handleQuillChange}
                      className=""
                      modules={quillModules}
                      formats={quillFormats}
                    />
                  </div>
                </div>
              )}
              
            </div>

            {editorFullscreen && (
              <div className="fixed inset-0 z-[5000] bg-white editor-fs-wrap">
                <div className="flex items-center justify-between px-3 py-2 border-b">
                  <div className="font-medium text-gray-800 truncate">Editing: {title || 'Untitled'}</div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditorFullscreen(false)}
                      className="px-2 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center gap-1"
                      title="Exit full screen"
                    >
                      <Minimize2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Exit</span>
                    </button>
                  </div>
                </div>
                <div className="editor-fs">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={handleQuillChange}
                    className=""
                    modules={quillModules}
                    formats={quillFormats}
                  />
                </div>
              </div>
            )}

            {/* Live Preview */}
            {showPreview && (
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="font-medium">Preview</span>
                    <span className="text-gray-400">(updates in real-time)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setPreviewMode('desktop')} className={`px-2.5 py-1.5 rounded-lg border ${previewMode==='desktop' ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-700'}`}>
                      <Monitor className="w-4 h-4 inline mr-1" /> Desktop
                    </button>
                    <button type="button" onClick={() => setPreviewMode('mobile')} className={`px-2.5 py-1.5 rounded-lg border ${previewMode==='mobile' ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-700'}`}>
                      <Smartphone className="w-4 h-4 inline mr-1" /> Mobile
                    </button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className={`rounded-xl border border-gray-200 shadow-sm overflow-hidden ${previewMode==='mobile' ? 'w-[390px]' : 'w-full'} max-w-[1024px]`}>
                    {/* Featured image */}
                    {frontImagePreview && (
                      <img src={frontImagePreview} alt="preview" className="w-full max-h-72 object-cover" />
                    )}
                    <div className="p-4 sm:p-6">
                      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{title || 'Your blog title'}</h1>
                      <div className="text-gray-500 text-sm mb-4">/{slug || 'my-custom-slug'}</div>
                      <article className="prose max-w-none prose-img:rounded-lg prose-headings:scroll-mt-24" dangerouslySetInnerHTML={{ __html: description || '<p>Start writing content...</p>' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Section (collapsible + drag reorder) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <label className="text-lg font-semibold text-gray-900">FAQs</label>
                  <span className="text-sm text-gray-500">(Optional)</span>
                </div>
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={enableFAQ}
                    onChange={(e)=>setEnableFAQ(e.target.checked)}
                  />
                  Enable FAQ section
                </label>
              </div>

              {enableFAQ && (
                <div className="space-y-3">
                  {faqs.map((f, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl"
                         draggable
                         onDragStart={() => { dragIndexRef.current = idx; }}
                         onDragOver={(e) => e.preventDefault()}
                         onDrop={() => {
                           const from = dragIndexRef.current;
                           const to = idx;
                           if (from === null || from === to) return;
                           setFaqs(prev => {
                             const arr = [...prev];
                             const [m] = arr.splice(from, 1);
                             arr.splice(to, 0, m);
                             return arr;
                           });
                           setCollapsedFaqs(prev => {
                             const arr = [...prev];
                             const [m] = arr.splice(from, 1);
                             arr.splice(to, 0, m);
                             return arr;
                           });
                         }}>
                      <div className="flex items-center justify-between p-3 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <span className="cursor-move text-gray-400" title="Drag to reorder">⋮⋮</span>
                          <span className="text-sm font-medium text-gray-800">FAQ #{idx+1}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button type="button" className="text-gray-600 text-sm" onClick={() => setCollapsedFaqs(prev => {
                            const arr = [...prev];
                            arr[idx] = !arr[idx];
                            return arr;
                          })}>{collapsedFaqs[idx] ? 'Expand' : 'Collapse'}</button>
                          <button
                            type="button"
                            onClick={()=>{
                              setFaqs(prev=>prev.filter((_,i)=>i!==idx));
                              setCollapsedFaqs(prev=>prev.filter((_,i)=>i!==idx));
                            }}
                            className="px-3 py-1 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                            title="Remove FAQ"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      {!collapsedFaqs[idx] && (
                        <div className="p-4">
                          <div className="grid grid-cols-1 lg:grid-cols-10 gap-3 items-start">
                            <div className="lg:col-span-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                              <input
                                type="text"
                                value={f.question}
                                onChange={(e)=>setFaqs(prev=>prev.map((x,i)=> i===idx ? { ...x, question:e.target.value } : x))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter question"
                              />
                            </div>
                            <div className="lg:col-span-6">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                              <textarea
                                rows={3}
                                value={f.answer}
                                onChange={(e)=>setFaqs(prev=>prev.map((x,i)=> i===idx ? { ...x, answer:e.target.value } : x))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter answer"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={()=>setFaqs(prev=>[...prev, { question:'', answer:'' }])}
                      className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Add FAQ
                    </button>
                    <button
                      type="button"
                      onClick={()=>{
                        const topic = (title || categories || 'real estate').toLowerCase();
                        const base = [
                          { q: `What is ${topic}?`, a: `An overview of ${topic} and why it matters.` },
                          { q: `How to choose the best ${topic}?`, a: `Key factors to consider when selecting ${topic}.` },
                          { q: `Common mistakes in ${topic}`, a: `Avoid these pitfalls when dealing with ${topic}.` },
                        ];
                        setFaqs(prev => [...prev, ...base]);
                        setCollapsedFaqs(prev => [...prev, false, false, false]);
                      }}
                      className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" /> Add Suggested FAQs
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              {!blogToEdit && (
                <button
                type="button"
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium flex items-center space-x-2"
                disabled={isSubmitting}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e, false);
                }}
              >
                <Save className="w-4 h-4" />
                <span>{
                  isSubmitting && !isPublished ? 'Saving...' : 
                  isPublished ? 'Save as Draft' : 'Save as Draft'
                }</span>
              </button>
              )}

              <button
                type="button"
                className="px-8 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-200 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e, true);
                }}
                disabled={isSubmitting}
              >
                {isSubmitting && isPublished ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{blogToEdit ? 'Updating...' : 'Publishing...'}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>{blogToEdit ? 'Update Blog' : 'Publish Blog'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        {/* History modal */}
        {showHistory && (
          <div className="fixed inset-0 bg-black/50 z-[4000] flex items-center justify-center" onClick={()=>setShowHistory(false)}>
            <div className="bg-white rounded-xl shadow-xl p-4 w-[92vw] max-w-[520px]" onClick={(e)=>e.stopPropagation()}>
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">Draft History</div>
                <button className="text-gray-600" onClick={()=>setShowHistory(false)}><X className="w-5 h-5"/></button>
              </div>
              {historyList?.length ? (
                <div className="max-h-[60vh] overflow-auto divide-y">
                  {historyList.map((h, i) => (
                    <div key={i} className="py-2 flex items-center justify-between">
                      <div className="text-sm">
                        <div className="font-medium">{h.title || 'Untitled'}</div>
                        <div className="text-gray-500">{new Date(h.ts).toLocaleString()}</div>
                      </div>
                      <button className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50" onClick={()=>{
                        try {
                          const raw = localStorage.getItem(draftKey);
                          if (!raw) return;
                          const s = JSON.parse(raw);
                          setTitle(s.title || '');
                          setDescription(s.description || '');
                          setFrontImagePreview(s.frontImagePreview || '');
                          setCategories(s.categories || '');
                          setMetaTitle(s.metaTitle || '');
                          setMetaDescription(s.metaDescription || '');
                          setSlug(s.slug || '');
                          setRelatedProjects(Array.isArray(s.relatedProjects) ? s.relatedProjects : []);
                          setEnableFAQ(!!s.enableFAQ);
                          setFaqs(Array.isArray(s.faqs) && s.faqs.length ? s.faqs : [{question:'',answer:''}]);
                          setAuthor(s.author || author);
                          showToast.success('Draft restored');
                          setShowHistory(false);
                        } catch {}
                      }}>Restore</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-600">No history yet.</div>
              )}
            </div>
          </div>
        )}
        {/* Lightbox Overlay */}
        {lightboxUrl && (
          <div
            onClick={() => setLightboxUrl('')}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
          >
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={lightboxUrl} style={{ maxWidth: '95vw', maxHeight: '95vh', objectFit: 'contain', borderRadius: 8 }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogWriteModal;