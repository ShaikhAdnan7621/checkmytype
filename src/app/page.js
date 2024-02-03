"use client";
import React from "react";
import Testbord from "@/components/Testbord";

//   {Paragrapharr[Math.floor(Math.random() * Paragrapharr.length)]}
export default function Home() {
  const para = [
    `The quick brown fox jumps over the lazy dog. This sentence is often used in typing tests as it contains every letter of the English alphabet. Typing accurately and quickly is an essential skill in the digital age. It's not just about speed, but also about precision and efficiency. Mastering the keyboard can save valuable time and make you more productive in your work or studies.`,

    `In the heart of the city, there was a small, quaint bookstore. It was filled with books of all genres, from thrilling mysteries to epic fantasies. The smell of old books wafted through the air, creating a sense of nostalgia. Each book on the shelf had a story to tell, not just within its pages, but also of the hands it had passed through over the years. The bookstore was a haven for book lovers, a place where they could escape from the hustle and bustle of the city and lose themselves in the world of words.`,

    `Climate change is a pressing issue in today's world. Rising global temperatures, melting ice caps, and deforestation are just a few of the many consequences. It's crucial for everyone to take steps towards a more sustainable future. This includes reducing our carbon footprint, adopting renewable energy sources, and promoting conservation efforts. Climate change affects us all and it's our responsibility to protect the planet for future generations.`,

    `Technology has revolutionized the way we live and work. From smartphones to artificial intelligence, the advancements are truly remarkable. However, it's important to use technology responsibly and ensure it benefits society. As we continue to innovate, we must also consider the ethical implications of our technological advancements. Technology has the potential to greatly enhance our lives, but only if we use it wisely.`,

    `Health and wellness are integral to a good quality of life. Regular exercise, a balanced diet, and adequate sleep are key factors. Mental health is equally important and should not be overlooked. In our busy lives, it's easy to neglect our health, but it's crucial to make time for self-care. A healthy body and mind not only improve our personal well-being, but also enhance our performance in all aspects of life.`,

    `Art, in its many forms, is a universal language. It has the power to evoke emotions, provoke thought, and connect people from different cultures. Whether it's a beautiful painting or a soulful melody, art enriches our lives. It provides a form of expression that words often cannot capture and offers a unique perspective on the world around us. Art challenges us, inspires us, and ultimately makes us more human.`,

    `Education is the cornerstone of progress. It empowers individuals, fosters critical thinking, and promotes social and economic development. In the age of information, lifelong learning is more important than ever. Education is not just about acquiring knowledge, but also about learning how to think critically and solve problems. It's about learning to adapt to change and to strive for continuous improvement. The pursuit of education is a lifelong journey that shapes our understanding of the world and our place in it.`,
  ][Math.floor(Math.random() * 7)];

  return (
    <main>
      <Testbord para={para} />
    </main>
  );
}
