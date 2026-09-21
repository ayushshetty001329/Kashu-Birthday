import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const bouquet1 = {
  number: 1,
  label: 'Bouquet 01 · The Beginning',
  title: 'For my Kashu ❤️',
  subtitle: <>This is the first little piece of your birthday surprise.<br />And this one takes us right back to where our story began.</>,
};

const bouquet2 = {
  number: 2,
  label: 'Bouquet 02 · The Beginning We Didn’t Know Was Beginning',
  title: 'Somewhere between a shawarma and a conversation…',
  subtitle: 'something quietly started becoming us.',
  video: '/Kashu-Birthday/media/bouquet-02.mp4',
  paragraphs: [
    'Babe,',
    'I still think about how simple our first meeting was. Just you, me, a shawarma, and two people slowly getting to know each other. ❤️',
    'We didn’t know it then… but somewhere between those little conversations, the laughs, and those simple moments, something was quietly beginning.',
    'I wasn’t thinking about where it would lead. I was just enjoying being around you.',
    'And somehow, without either of us realizing it, those little moments became the beginning of us. ❤️',
    'Looking back now, it’s crazy to think that one simple day would eventually lead me to my favourite person.',
    'And honestly… I’d choose that first meeting all over again.',
    'Still falling for you,\nAyush ♡',
  ],
};

function Petals() {
  const petals = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);
  return <div className="petals" aria-hidden="true">{petals.map(i => <span key={i} style={{ '--i': i }}>♥</span>)}</div>;
}

function Typewriter({ paragraphs }) {
  const [shown, setShown] = useState([]);
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      for (let i = 0; i < paragraphs.length; i++) {
        const text = paragraphs[i];
        let current = '';
        for (const char of text) {
          if (cancelled) return;
          current += char;
          setShown(prev => [...prev.slice(0, i), current]);
          await new Promise(r => setTimeout(r, char === ' ' ? 8 : 18));
        }
        await new Promise(r => setTimeout(r, 280));
      }
    };
    run();
    return () => { cancelled = true; };
  }, [paragraphs]);
  return <div className="letter">{shown.map((p, i) => <p key={i}>{p.split('\n').map((line,j)=><React.Fragment key={j}>{j>0 && <br/>}{line}</React.Fragment>)}</p>)}</div>;
}

function Bouquet1({ onNext }) {
  const [stage, setStage] = useState('welcome');
  const [messageVisible, setMessageVisible] = useState(false);
  const paragraphs = [
    'Babe,',
    'This is my first birthday with you, and today I want to spend every hour reminding you how much I love you. ❤️',
    'So for our first hour, let’s go all the way back to the beginning.',
    'I still remember the first time I saw you on that scooty. I was literally drenched in sweat, looking absolutely finished… but somehow, your beauty still managed to distract me completely. 😂❤️',
    'I don’t know what it was about that moment, but I remember feeling something.',
    'Maybe it really was love at first sight. ❤️',
    'Because little did I know that the girl I noticed that day would become my Kashu, my favourite person, and the person I love the most. ♡',
    'And this is only the beginning… There are still so many pieces of our story I want to tell you.',
  ];
  const open = async () => {
    setStage('opening');
    await new Promise(r => setTimeout(r, 1400));
    setStage('photo');
    await new Promise(r => setTimeout(r, 1100));
    setMessageVisible(true);
  };
  if (stage === 'welcome') return <section className="screen"><div className="hero"><div className="eyebrow">{bouquet1.label}</div><h1>For my Kashu ❤️</h1><p>This is the first little piece of your birthday surprise.<br/>And this one takes us right back to where our story began.</p><button onClick={open}>Open your first bouquet ♡</button><small>Take your time. There is no rush.</small></div></section>;
  return <section className="screen reveal"><div className={`envelope ${stage === 'opening' ? 'opened' : ''}`}><div className="env-back"/><div className="env-flap"/><div className="env-front"/><div className="seal">♥</div></div><div className="pre">Before there was us…</div>{stage === 'photo' && <div className="photo-card"><img src="/Kashu-Birthday/media/bouquet-01.jpg" alt="A memory of Ayush and Kashu"/><span>A little piece of our story</span></div>}{messageVisible && <><Typewriter paragraphs={paragraphs}/><div className="end"><strong>That’s Bouquet #1. ❤️</strong><span>Keep this little secret close…<br/>There is more of our story waiting for you.</span><button className="next" onClick={onNext}>Open Bouquet #2 →</button></div></>}</section>;
}

function Bouquet2({ onBack }) {
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  return <section className="screen bouquet-two"><div className="memory-film"><div className="eyebrow">{bouquet2.label}</div><h2>{bouquet2.title}</h2><p className="subtitle">{bouquet2.subtitle}</p><div className={`film-frame ${playing ? 'playing' : ''}`}><div className="film-strip">{Array.from({length:7},(_,i)=><i key={i}/>)}</div><video src={bouquet2.video} playsInline controls={playing} onPlay={()=>setPlaying(true)} onEnded={()=>setFinished(true)} /><div className="film-caption">a little memory from the beginning</div></div>{finished ? <><Typewriter paragraphs={bouquet2.paragraphs}/><div className="end"><strong>And somehow… it became us. ❤️</strong><span>That was only chapter two.</span><button className="next" onClick={onBack}>← Back to Bouquet #1</button></div></> : <div className="row"><button className="ghost" onClick={onBack}>← Bouquet #1</button><button onClick={()=>document.querySelector('video')?.play()}>Play the memory ▶</button></div>}</div></section>;
}

function App(){
  const [bouquet,setBouquet] = useState(1);
  return <main className="app"><div className="bg"/><Petals/>{bouquet===1?<Bouquet1 onNext={()=>setBouquet(2)}/>:<Bouquet2 onBack={()=>setBouquet(1)}/>}<div className="counter">{bouquet} / 24</div></main>;
}

createRoot(document.getElementById('root')).render(<App />);
