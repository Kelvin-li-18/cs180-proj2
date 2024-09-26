import React from 'react';
import Section from './Section';

function ParentSection({ id, title, sections }) {
  return (
    <div id={id} className="mb-24"> {/* Larger margin-bottom for parent sections */}
      <h1 className="text-4xl font-bold mb-10 text-indigo-400">{title}</h1>

      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          content={section.content}
        />
      ))}
    </div>
  );
}

export default ParentSection;
