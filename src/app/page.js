import Keybord from "@/components/Keyboard";
import Testbord from "@/components/Testbord";

// let randomnumber = Math.floor(Math.random() * 7);
export default function Home() {
  const para = [
    `The quick brown fox jumps over the lazy dog. This sentence is often used in typing tests as it contains every letter of the English alphabet. Typing accurately and quickly is an essential skill in the digital age.`,
    `In the heart of the city, there was a small, quaint bookstore. It was filled with books of all genres, from thrilling mysteries to epic fantasies. The smell of old books wafted through the air, creating a sense of nostalgia.`,
    `Climate change is a pressing issue in today’s world. Rising global temperatures, melting ice caps, and deforestation are just a few of the many consequences. It’s crucial for everyone to take steps towards a more sustainable future.`,
    `Technology has revolutionized the way we live and work. From smartphones to artificial intelligence, the advancements are truly remarkable. However, it’s important to use technology responsibly and ensure it benefits society.`,
    `Health and wellness are integral to a good quality of life. Regular exercise, a balanced diet, and adequate sleep are key factors. Mental health is equally important and should not be overlooked.`,
    `Art, in its many forms, is a universal language. It has the power to evoke emotions, provoke thought, and connect people from different cultures. Whether it’s a beautiful painting or a soulful melody, art enriches our lives.`,
    `Education is the cornerstone of progress. It empowers individuals, fosters critical thinking, and promotes social and economic development. In the age of information, lifelong learning is more important than ever.`,
  ][Math.floor(Math.random() * 7)];

  return (
    <main>
      <Testbord para={para} />
    </main>
  );
}

//   {Paragrapharr[Math.floor(Math.random() * Paragrapharr.length)]}
