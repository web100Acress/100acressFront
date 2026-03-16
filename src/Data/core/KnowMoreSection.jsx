import React from 'react';

const KnowMoreSection = ({ data }) => {
  if (!data) return null;

  const { title, description, sections, cta } = data;

  return (
    <div className="mt-12 sm:mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 rounded-3xl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {title.split(' ').map((word, i) => 
              i === title.split(' ').length - 1 || i === title.split(' ').length - 2 ? (
                <span key={i} className="text-blue-600"> {word}</span>
              ) : (
                <span key={i}> {word}</span>
              )
            )}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            {description}
          </p>
        </div>

        {sections && sections.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {sections.slice(0, 3).map((section, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                  {section.title}
                </h3>
                <div className="text-gray-600 leading-relaxed">
                  {section.content && <p className="mb-4">{section.content}</p>}
                  {section.list && (
                    <ul className="list-disc pl-5 space-y-2">
                      {section.list.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                  )}
                  {section.subsections && (
                    <div className="space-y-4">
                      {section.subsections.map((sub, i) => (
                        <div key={i}>
                          <h4 className="font-semibold text-gray-900 mb-2">{sub.title}</h4>
                          <p className="text-sm">{sub.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.outro && <p className="mt-4">{section.outro}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {sections && sections.length > 3 && (
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {sections.slice(3).map((section, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                  {section.title}
                </h3>
                <div className="text-gray-600 leading-relaxed">
                  {section.content && (
                    <p className="mb-4 whitespace-pre-line">{section.content}</p>
                  )}
                  {section.list && (
                    <ul className="list-disc pl-5 space-y-3">
                      {section.list.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {cta && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 sm:p-8 text-white text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              {cta.title}
            </h3>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              {cta.description}
            </p>
            <a
              href={cta.link}
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              {cta.text}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowMoreSection;
