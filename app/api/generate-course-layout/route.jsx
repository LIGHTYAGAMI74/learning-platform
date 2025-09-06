import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/config/db';
import { NextResponse } from 'next/server';
import {
  GoogleGenAI,
} from '@google/genai';
import mime from 'mime';
import { writeFile } from 'fs/promises';

const PROMPT = `Create a comprehensive learning course titled "Quantum Mysteries of Black Holes" focused on black holes and quantum theory, designed for intermediate learners with a basic physics background. Include the following details in the course structure:

Course Description: The course explores the intersection of black holes and quantum theory, covering how quantum mechanics challenges classical gravity and spacetime. It includes foundational concepts, advanced theories like Hawking radiation, and speculative ideas such as quantum entanglement in black holes. Through engaging lectures, simulations, and discussions, learners will bridge general relativity and quantum field theory to understand one of the universe's most enigmatic phenomena.

Course Banner Image Prompt: Create a modern, 3D digital illustration representing black holes and quantum theory. Include UI/UX elements such as mockup screens displaying quantum equations, text blocks with terms like "Hawking Radiation" and "Event Horizon," icons of particles and waves, buttons for interactive simulations, and creative workspace tools like holographic projectors. Add symbolic elements like 3D models of swirling black holes, quantum entanglement threads, sticky notes with formulas, design components such as particle colliders, and visual aids like orbiting electrons around a singularity. Use a dark theme with a black background and shiny white accents for a sleek, high-contrast look. Incorporate vibrant highlights in blues, purples, and oranges for energy fields and quantum effects. The illustration should feel creative, tech-savvy, and educational, rendered in high-detail 3D with depth, shadows, and glowing elements.

Course Structure:
- Chapter 1: Foundations of Black Holes
  - Topics: Introduction to general relativity and spacetime curvature, formation of black holes from stellar collapse, key properties (event horizon, singularity, Schwarzschild radius)
  - Duration: 2 hours
- Chapter 2: Quantum Mechanics Basics
  - Topics: Wave-particle duality and uncertainty principle, quantum field theory overview, entanglement and superposition in quantum systems
  - Duration: 1.5 hours
- Chapter 3: Hawking Radiation and Black Hole Thermodynamics
  - Topics: Virtual particles and quantum vacuum near event horizons, derivation of Hawking temperature and entropy, black hole evaporation and information paradox
  - Duration: 3 hours
- Chapter 4: Quantum Gravity and Black Holes
  - Topics: Challenges in unifying quantum theory with general relativity, string theory’s role in resolving singularities, loop quantum gravity and quantized spacetime
  - Duration: 2.5 hours
- Chapter 5: Advanced Topics and Speculations
  - Topics: Black hole firewalls and AMPS paradox, quantum entanglement across event horizons (ER=EPR conjecture), observational evidence from gravitational waves and telescopes
  - Duration: 2 hours
- Chapter 6: Applications and Future Directions
  - Topics: Black holes in cosmology and the early universe, quantum computing analogies with black hole information, open questions and ongoing research
  - Duration: 1.5 hours

Additional Details:
- Total Duration: 12.5 hours
- Target Audience: Students, physics enthusiasts, or professionals with introductory physics knowledge
- Learning Outcomes: Understand quantum behaviors of black holes, critique major theories, and appreciate unresolved mysteries in modern physics
- Assessment: Quizzes per chapter, a final project on simulating Hawking radiation, and discussion forums
- Prerequisites: Basic calculus, introductory physics, and familiarity with relativity concepts in JSON format only Schema: "course": 1 "name": "string" "description": "string", "category": "string" "level": "string" "include Video": "boolean" "noOtChapters": "number" "bannerimagePrompt": "string". "chapters": [ { "chapterName": "string". "duration": "string", "topics": [ "string" Databse , User Input: rect js,6 chapter`


export async function POST(request) {

    const formData = await request.json();
    console.log('API END POINT REACHED');
    const user = await currentUser();


    // To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node



// async function saveBinaryFile(fileName, content) {
//   try {
//     await writeFile(fileName, content);
//     console.log(`File ${fileName} saved to file system.`);
//   } catch (err) {
//     console.error(`Error writing file ${fileName}:`, err);
//   }
// }


  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseModalities: [
        'IMAGE',
        'TEXT',
    ],
    systemInstruction: [
        {
          text: `
`,
        }
    ],
  };
  const model = 'gemini-2.5-flash-image-preview';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT+JSON.stringify(formData),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  const RawResponse = response.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

  // Find the start and end of the JSON object
  const jsonStart = RawResponse.indexOf('{');
  const jsonEnd = RawResponse.lastIndexOf('}');
  
  let JSONRespo;
  if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
    const jsonString = RawResponse.substring(jsonStart, jsonEnd + 1);
    try {
      JSONRespo = JSON.parse(jsonString);
    } catch (err) {
      console.error("Failed to parse AI response JSON:", err);
      JSONRespo = {}; // fallback
    }
  } else {
      console.error("Could not find a valid JSON object in the AI response.");
      JSONRespo = {}; // fallback
  }

  const courseData = JSONRespo.course || {};

  const result = await db.insert(coursesTable).values({
    ...formData,
    title: courseData.name,
    description: courseData.description,
    category: courseData.category,
    difficultyLevel: courseData.level,
    noOfChapters: courseData.noOfChapters,
    courseJson: JSONRespo,
    userEmail: user?.primaryEmailAddress?.emailAddress || 'noemail',
  });
console.log(result);
  return NextResponse.json(JSONRespo, { status: 200 });
  // let fileIndex = 0;
  // for await (const chunk of response) {
  //   if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
  //     continue;
  //   }
  //   if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
  //     const fileName = `ENTER_FILE_NAME_${fileIndex++}`;
  //     const inlineData = chunk.candidates[0].content.parts[0].inlineData;
  //     const fileExtension = mime.getExtension(inlineData.mimeType || '');
  //     const buffer = Buffer.from(inlineData.data || '', 'base64');
  //     saveBinaryFile(`${fileName}.${fileExtension}`, buffer);
  //     await saveBinaryFile(`${fileName}.${fileExtension}`, buffer);
  //   } else {
  //     console.log(chunk.text);
  //   }
  // }
}





