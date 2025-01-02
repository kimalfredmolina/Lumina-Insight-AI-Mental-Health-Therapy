import React from 'react';
import bg1 from '../assets/bg1.gif';
import bg2 from '../assets/bg2.gif';

const Description = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <img
            src={bg1}
            alt="Counseling session illustration"
            className="w-78 h-64 object-cover rounded-md"
          />
          <p className="mt-4 text-gray-700 text-xl font-bold">
            Mental health is just as important as physical health. Taking the
            first step toward seeking help can be life-changing. Let's break
            the stigma together and create a safe space for healing.
          </p>
        </div>

        <div className="flex items-center text-center px-4">
        </div>

        <div className="flex flex-col items-center text-center">
          <img
            src={bg2}
            alt="Mind illustration"
            className="w-64 h-64 object-cover rounded-md"
          />
          <p className="mt-4 text-gray-700 text-xl font-bold">
            Our AI is designed to be a compassionate listener, offering a
            judgment-free space for you to share your feelings. Remember,
            you're never alone in this journey.
          </p>
        </div>
      </div>

      <div className="mt-8 max-w-2xl text-center">
        <p className="text-gray-700 text-xl font-bold mt-16">
          Mental health awareness is about understanding the challenges we all
          face and supporting each other through compassion and kindness.
          Prioritize self-care and reach out for help when you need it.
          Together, we can foster a world where mental health is valued and
          supported.
        </p>
      </div>
    </div>
  );
};

export default Description;
