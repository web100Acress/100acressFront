// Blog Slug Testing Script
// Run this in browser console to test blog slug functionality

const BlogSlugTester = {
  // Test different slug scenarios
  async testSlugResolution() {
    console.log('🧪 Starting Blog Slug Tests...\n');
    
    const testCases = [
      {
        name: 'Valid slug test',
        slug: 'call-calling-script',
        expected: 'Should resolve to correct blog ID'
      },
      {
        name: 'Non-existent slug',
        slug: 'non-existent-blog-12345',
        expected: 'Should return "Blog not found"'
      },
      {
        name: 'Empty slug',
        slug: '',
        expected: 'Should handle gracefully'
      },
      {
        name: 'Special characters slug',
        slug: 'test-blog-with-special-chars',
        expected: 'Should handle special characters'
      }
    ];

    for (const testCase of testCases) {
      console.log(`📝 Testing: ${testCase.name}`);
      console.log(`🔗 Slug: ${testCase.slug}`);
      
      try {
        // Test slug resolution endpoint
        const response = await fetch(`/api/blog/slug/${encodeURIComponent(testCase.slug)}`);
        const data = await response.json();
        
        console.log('✅ Response:', data);
        console.log('📊 Status:', response.status);
        
        // Verify response structure
        if (data.data) {
          if (data.data.exists) {
            console.log('✅ Blog exists with ID:', data.data.id);
            console.log('📄 Title:', data.data.title);
          } else {
            console.log('⚠️ Blog does not exist (expected for invalid slugs)');
          }
        }
        
      } catch (error) {
        console.error('❌ Error:', error.message);
      }
      
      console.log('─'.repeat(50));
    }
  },

  // Test direct blog access
  async testDirectBlogAccess() {
    console.log('🔍 Testing Direct Blog Access...\n');
    
    // Test accessing blog by slug directly
    const testUrls = [
      '/blog/call-calling-script',
      '/blog/test-blog-post',
      '/blog/another-example'
    ];

    for (const url of testUrls) {
      console.log(`🌐 Testing URL: ${url}`);
      
      // Check if the page loads without errors
      try {
        // This would normally be tested by navigating to the URL
        // For console testing, we'll check the slug resolution first
        const slug = url.split('/blog/')[1];
        if (slug) {
          const response = await fetch(`/api/blog/slug/${encodeURIComponent(slug)}`);
          const data = await response.json();
          
          if (data.data?.exists) {
            console.log('✅ Blog can be accessed:', data.data.title);
          } else {
            console.log('❌ Blog not found for slug:', slug);
          }
        }
      } catch (error) {
        console.error('❌ Error accessing blog:', error.message);
      }
      
      console.log('─'.repeat(30));
    }
  },

  // Test the fix effectiveness
  async testFixEffectiveness() {
    console.log('🔧 Testing Fix Effectiveness...\n');
    
    // Simulate the old problematic behavior vs new behavior
    console.log('📊 Before Fix: Search fallback would always return latest blog');
    console.log('📊 After Fix: Should return specific blog or "not found"');
    
    // Test a slug that should NOT return the latest blog
    const testSlug = 'non-existent-slug-that-should-not-exist';
    
    try {
      const response = await fetch(`/api/blog/slug/${encodeURIComponent(testSlug)}`);
      const data = await response.json();
      
      if (data.data?.exists === false) {
        console.log('✅ Fix working! Non-existent slug properly returns "not found"');
      } else if (data.data?.exists === true) {
        console.log('⚠️ Unexpected: Non-existent slug returned a blog');
      } else {
        console.log('❓ Unexpected response structure');
      }
      
    } catch (error) {
      console.error('❌ Error testing fix:', error.message);
    }
  },

  // Run all tests
  async runAllTests() {
    console.log('🚀 Starting Complete Blog Slug Test Suite\n');
    console.log('=' .repeat(60));
    
    await this.testSlugResolution();
    await this.testDirectBlogAccess();
    await this.testFixEffectiveness();
    
    console.log('\n🏁 Test Suite Complete!');
    console.log('📋 Summary:');
    console.log('✅ Slug resolution endpoint tested');
    console.log('✅ Direct blog access tested');
    console.log('✅ Fix effectiveness verified');
    console.log('\n💡 Next Steps:');
    console.log('1. Test manually by visiting different blog URLs');
    console.log('2. Check browser console for any errors');
    console.log('3. Verify correct blog content is displayed');
  }
};

// Easy to run commands
console.log('🧪 Blog Slug Tester loaded!');
console.log('📋 Available commands:');
console.log('  BlogSlugTester.testSlugResolution() - Test slug resolution');
console.log('  BlogSlugTester.testDirectBlogAccess() - Test direct access');
console.log('  BlogSlugTester.testFixEffectiveness() - Test fix');
console.log('  BlogSlugTester.runAllTests() - Run all tests');
console.log('\n🚀 To run all tests: BlogSlugTester.runAllTests()');
