
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log('Starting seeding...');

  // 1. Seed Achievements
  const achievements = [
    { name: 'First Trade', description: 'Log your first trade in the journal', icon_url: '🎯' },
    { name: 'Quiz Master', description: 'Score 100% on any assessment', icon_url: '🧠' },
    { name: 'On a Roll', description: 'Maintain a 7-day learning streak', icon_url: '🔥' },
    { name: 'Scholar', description: 'Complete 10 lessons', icon_url: '📚' },
    { name: 'Risk Manager', description: 'Maintain a positive profit factor for 5 trades', icon_url: '🛡️' },
  ];

  for (const ach of achievements) {
    const { error } = await supabase.from('achievements').upsert(ach, { onConflict: 'name' });
    if (error) console.error('Error seeding achievement:', ach.name, error);
    else console.log('Seeded achievement:', ach.name);
  }

  // 2. Seed Lesson Categories
  const categories = [
    { name: 'Market Fundamentals', description: 'Understand the basics of financial markets', order_index: 1 },
    { name: 'Technical Analysis', description: 'Learn to read and interpret price charts', order_index: 2 },
    { name: 'Risk Management', description: 'Master the art of protecting your capital', order_index: 3 },
    { name: 'Trading Psychology', description: 'Develop discipline and emotional control', order_index: 4 },
    { name: 'Strategy Building', description: 'Create your own trading strategy', order_index: 5 },
  ];

  for (const cat of categories) {
    const { data, error } = await supabase.from('lesson_categories').upsert(cat, { onConflict: 'name' }).select().single();
    if (error) console.error('Error seeding category:', cat.name, error);
    else console.log('Seeded category:', data.name);
  }

  const { data: catData } = await supabase.from('lesson_categories').select('*');
  const catMap = Object.fromEntries(catData?.map(c => [c.name, c.id]) || []);

  // 3. Seed Lessons
  const lessons = [
    {
      category_id: catMap['Market Fundamentals'],
      title: 'What is a Stock?',
      content: 'A stock represents a share of ownership in a company. When you buy stock, you become a partial owner of that company. Stocks are traded on exchanges like the NYSE or NASDAQ. Companies issue stocks to raise capital for growth and operations.',
      estimated_time: 15,
      video_url: 'https://www.youtube.com/watch?v=ZCFkWDdmXG8',
      order_index: 1,
    },
    {
      category_id: catMap['Market Fundamentals'],
      title: 'What is Forex?',
      content: 'Forex (foreign exchange) is the global market where currencies are traded. It is the largest financial market in the world. Currencies are always traded in pairs, such as EUR/USD.',
      estimated_time: 12,
      video_url: 'https://www.youtube.com/watch?v=L9Y_9E_0p0A',
      order_index: 2,
    },
    {
      category_id: catMap['Technical Analysis'],
      title: 'Intro to Candlesticks',
      content: 'Candlestick charts show the price movement of an asset over time. Each candle represents the open, high, low, and close (OHLC) for a specific period.',
      estimated_time: 20,
      video_url: 'https://www.youtube.com/watch?v=M6X9v6v99vE',
      order_index: 1,
    },
    {
      category_id: catMap['Technical Analysis'],
      title: 'Support and Resistance',
      content: 'Support is a price level where a downtrend tends to pause due to a concentration of demand. Resistance is where an uptrend tends to pause due to supply.',
      estimated_time: 25,
      video_url: 'https://www.youtube.com/watch?v=kYI9w19N_nI',
      order_index: 2,
    },
    {
      category_id: catMap['Risk Management'],
      title: 'The 2% Rule',
      content: 'Never risk more than 2% of your total account balance on a single trade. This ensures that a string of losses wont wipe you out.',
      estimated_time: 10,
      video_url: 'https://www.youtube.com/watch?v=8p_9U1y3Xv8',
      order_index: 1,
    },
    {
      category_id: catMap['Trading Psychology'],
      title: 'Mastering FOMO',
      content: 'Fear Of Missing Out (FOMO) leads to impulsive trades. Learn to wait for your setup and understand that the market will always be there tomorrow.',
      estimated_time: 15,
      video_url: 'https://www.youtube.com/watch?v=A8vU-ZpL9-4',
      order_index: 1,
    },
  ];

  for (const lesson of lessons) {
    const { error } = await supabase.from('lessons').upsert(lesson, { onConflict: 'title' });
    if (error) console.error('Error seeding lesson:', lesson.title, error);
    else console.log('Seeded lesson:', lesson.title);
  }

  // 4. Seed Assessments
  const assessments = [
    { title: 'Basics Quiz', description: 'Test your foundational knowledge.', category: 'Fundamentals' },
    { title: 'Chart Mastery', description: 'Identify patterns and trends.', category: 'Technical' },
    { title: 'Risk Expert', description: 'Calculate position sizes and R:R.', category: 'Risk' },
  ];

  for (const ass of assessments) {
    const { data: assessment, error: aError } = await supabase.from('assessments').upsert(ass, { onConflict: 'title' }).select().single();
    if (aError) {
      console.error('Error seeding assessment:', ass.title, aError);
      continue;
    }
    console.log('Seeded assessment:', assessment.title);

    // Seed questions for the first assessment as a sample
    if (assessment.title === 'Basics Quiz') {
      const questions = [
        {
          assessment_id: assessment.id,
          question_text: 'What is a stock?',
          options: ['A share of ownership in a company', 'A type of bond', 'A currency exchange rate', 'A commodity futures contract'],
          correct_answer_index: 0,
        },
        {
          assessment_id: assessment.id,
          question_text: 'What is leverage in trading?',
          options: ['Using borrowed money to increase position size', 'A type of stock dividend', 'A trading strategy', 'The difference between bid and ask'],
          correct_answer_index: 0,
        },
        {
          assessment_id: assessment.id,
          question_text: 'Which market is the largest by daily volume?',
          options: ['Stock Market', 'Forex Market', 'Crypto Market', 'Bond Market'],
          correct_answer_index: 1,
        },
      ];

      for (const q of questions) {
        const { error } = await supabase.from('assessment_questions').upsert(q, { onConflict: 'question_text' });
        if (error) console.error('Error seeding question:', q.question_text, error);
        else console.log('Seeded question:', q.question_text);
      }
    }
  }

  console.log('Seeding completed!');
}

seed();
