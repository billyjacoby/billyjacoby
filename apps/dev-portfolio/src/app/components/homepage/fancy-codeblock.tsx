import React from 'react';

const profile = {
  name: 'Billy Jacoby',
  skills: [
    'React',
    'React Native',
    'NextJS',
    'Redux',
    'Express',
    'Prisma',
    'Drizzle',
    'SQL',
    'Docker',
  ],
  attributes: {
    hardWorker: true,
    quickLearner: true,
    problemSolver: true,
  },
};

export const FancyCodeBlock = ({
  code = profile,
}: {
  code?: {
    name: string;
    skills: string[];
    attributes: Record<string, boolean>;
    //TODO: make this more extendable
    [key: string]: string | boolean | string[] | Record<string, boolean>;
  };
}) => {
  return (
    <code className="font-mono text-xs md:text-sm lg:text-base">
      <div className="blink">
        <span className="mr-2 text-pink-500">const</span>
        <span className="mr-2 text-white">engineer</span>
        <span className="mr-2 text-pink-500">=</span>
        <span className="text-gray-400">{'{'}</span>
      </div>
      <div>
        <span className="ml-4 mr-2 text-white lg:ml-8">name:</span>
        <span className="text-gray-400">{"'"}</span>
        <span className="text-green-400">{code.name}</span>
        <span className="text-gray-400">{"',"}</span>
      </div>
      <div className="ml-4 mr-2 lg:ml-8">
        <span className="text-white">skills:</span>
        <span className="text-gray-400">{"['"}</span>
        {code.skills.map((skill, index) => (
          <span key={skill}>
            <span className="text-fuchsia-500">{skill}</span>
            {index < code.skills.length - 1 && (
              <span className="text-gray-400">{"', '"}</span>
            )}
          </span>
        ))}
        <span className="text-gray-400">{"'],"}</span>
      </div>
      {Object.entries(code.attributes).map(([key, value]) => (
        <div key={key}>
          <span className="ml-4 mr-2 text-white lg:ml-8">{key}:</span>
          <span className="text-orange-400">{value.toString()}</span>
          <span className="text-gray-400">,</span>
        </div>
      ))}
      {/* <div>
        <span className="ml-4 mr-2 text-green-400 lg:ml-8">hireable:</span>
        <span className="text-orange-400">function</span>
        <span className="text-gray-400">{'() {'}</span>
      </div>
      <div>
        <span className="ml-8 mr-2 text-orange-400 lg:ml-16">return</span>
        <span className="text-gray-400">{'('}</span>
      </div>
      <div>
        <span className="ml-12 text-cyan-400 lg:ml-24">this.</span>
        <span className="mr-2 text-white">hardWorker</span>
        <span className="text-amber-300">&amp;&amp;</span>
      </div>
      <div>
        <span className="ml-12 text-cyan-400 lg:ml-24">this.</span>
        <span className="mr-2 text-white">problemSolver</span>
        <span className="text-amber-300">&amp;&amp;</span>
      </div>
      <div>
        <span className="ml-12 text-cyan-400 lg:ml-24">this.</span>
        <span className="mr-2 text-white">skills.length</span>
        <span className="mr-2 text-amber-300">&gt;=</span>
        <span className="text-orange-400">5</span>
      </div>
      <div>
        <span className="ml-8 mr-2 text-gray-400 lg:ml-16">{');'}</span>
      </div>
      <div>
        <span className="ml-4 text-gray-400 lg:ml-8">{'};'}</span>
      </div>
      */}
      <div>
        <span className="text-gray-400">{'};'}</span>
      </div>
    </code>
  );
};
