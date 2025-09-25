'use client';

import { useState, useEffect } from 'react';

const Greeting = () => {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning ☀️');
    else if (hour < 17) setGreeting('Good Afternoon 🌤️');
    else setGreeting('Good Evening 🌙');
  }, []);


  if (!greeting) return <h1 className="text-2xl font-bold">You&apos;re Back!</h1>;

  return <h1 className="text-2xl font-bold">{greeting}</h1>;
};

export default Greeting;
