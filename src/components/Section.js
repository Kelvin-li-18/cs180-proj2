import React from 'react';
import ImageCard from './ImageCard';
import ImageGrid from './ImageGrid';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

function Section({ id, title, content }) {
  return (
    <div id={id} className="mb-16">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>

      <div className="space-y-6">
        {content.map((item, index) => {
          if (item.type === 'paragraph') {
            return (
              <p key={index} className="text-lg text-gray-400 leading-relaxed break-words">
                {item.text}
              </p>
            );
          }
          if (item.type === 'math') {
            return (
              <div key={index} className="text-center text-2xl text-gray-300 break-words leading-relaxed">
                <Latex>{item.text}</Latex>
              </div>
            );
          }
          if (item.type === 'image-grid') {
            return (
              <ImageGrid key={index} columns={item.columns}>
                {item.images.map((image, imgIndex) => (
                  <ImageCard key={imgIndex} title={image.title} imageUrl={image.imageUrl} />
                ))}
              </ImageGrid>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Section;
