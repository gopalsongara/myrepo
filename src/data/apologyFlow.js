/**
 * Apology journey + response option configuration.
 * Negative paths stay supportive and always progress forward — no infinite loops.
 */

/** Change this to your name — shown above the response form */
export const senderName = 'GR'

export const PHASES = {
  ENVELOPE: 'envelope',
  LETTER: 'letter',
  JOURNEY: 'journey',
  SECOND_CHANCE: 'secondChance',
  RESPONSE: 'response',
  RESULT: 'result',
}

export const JOURNEY_START = 'screen1'

export const journeyScreens = {
  screen1: {
    id: 'screen1',
    message: 'I am Sorry 🥺',
    animal: 'sad-cat',
    mood: 'sad',
    buttons: [
      { id: 's1-yes', label: 'Okay, fine ❤️', next: 'screen4', variant: 'yes' },
      { id: 's1-no', label: 'Not forgiven 😤', next: 'screen2', variant: 'no' },
    ],
  },
  screen2: {
    id: 'screen2',
    message: 'Pleaseeeee, forgive me!',
    animal: 'pleading-puppy',
    mood: 'plead',
    buttons: [
      { id: 's2-yes', label: 'Okay, stay happy ❤️', next: 'secondChance', variant: 'yes' },
      { id: 's2-no', label: 'No, still angry!', next: 'screen3', variant: 'no' },
    ],
  },
  screen3: {
    id: 'screen3',
    message: 'Are you really sure?',
    animal: 'worried-bunny',
    mood: 'worried',
    buttons: [
      { id: 's3-yes', label: 'Okay, forgiven', next: 'secondChance', variant: 'yes' },
      { id: 's3-no', label: 'Yes, I am still angry', next: 'screen4', variant: 'no' },
    ],
  },
  screen4: {
    id: 'screen4',
    message: 'Flowers for you 🌸',
    animal: 'flowers-cat',
    mood: 'gift',
    buttons: [
      { id: 's4-yes', label: 'Accepted ❤️', next: 'secondChance', variant: 'yes' },
      { id: 's4-no', label: 'Not yet!', next: 'screen5', variant: 'no' },
    ],
  },
  screen5: {
    id: 'screen5',
    message: "I promise I'll do better.",
    animal: 'hopeful-puppy',
    mood: 'hopeful',
    buttons: [
      { id: 's5-yes', label: 'I believe you', next: 'secondChance', variant: 'yes' },
      { id: 's5-no', label: 'Prove it first!', next: 'screen6', variant: 'no' },
    ],
  },
  screen6: {
    id: 'screen6',
    message: 'One more chance, please?',
    animal: 'dramatic-bunny',
    mood: 'dramatic',
    buttons: [
      { id: 's6-yes', label: 'Maybe ❤️', next: 'secondChance', variant: 'yes' },
      { id: 's6-no', label: 'I need time', next: 'screen7', variant: 'no' },
    ],
  },
  screen7: {
    id: 'screen7',
    message: "I don't want to lose you.",
    animal: 'tired-cat',
    mood: 'tired',
    buttons: [
      { id: 's7-yes', label: "Let's talk", next: 'secondChance', variant: 'yes' },
      { id: 's7-no', label: "I'm still hurt", next: 'screen8', variant: 'no' },
    ],
  },
  screen8: {
    id: 'screen8',
    message: 'Can we make things better?',
    animal: 'hopeful-puppy',
    mood: 'hopeful',
    buttons: [
      { id: 's8-yes', label: "Yes, let's try again ❤️", next: 'secondChance', variant: 'yes' },
      {
        id: 's8-no',
        label: 'Not right now',
        next: 'secondChance',
        variant: 'no',
        note: 'supportive',
      },
    ],
  },
}

export const secondChanceOptions = [
  { id: 'start-again', label: "Yes, let's start again ❤️", tone: 'positive' },
  { id: 'second-chance', label: 'Give us a second chance 🥺', tone: 'positive' },
  { id: 'talk-first', label: "Let's talk first 💗", tone: 'neutral' },
  { id: 'need-time', label: 'I need some time 🌸', tone: 'gentle' },
  { id: 'still-hurt', label: "I'm still hurt 💔", tone: 'gentle' },
  { id: 'need-space', label: 'I need some space.', tone: 'gentle' },
]

export const responseOptions = [
  { id: 'forgive', label: 'I forgive you ❤️', tone: 'positive' },
  { id: 'second-chance', label: 'Give us a second chance 🥺', tone: 'positive' },
  { id: 'lets-talk', label: "Let's talk 💗", tone: 'neutral' },
  { id: 'need-time', label: 'I need some time 🌸', tone: 'gentle' },
  { id: 'still-hurt', label: "I'm still hurt 💔", tone: 'gentle' },
  { id: 'need-space', label: 'I need some space.', tone: 'gentle' },
]

export const feelingOptions = [
  { id: 'happy', label: 'Happy' },
  { id: 'still-upset', label: 'Still upset' },
  { id: 'missing-you', label: 'Missing you' },
  { id: 'want-to-talk', label: 'Want to talk' },
  { id: 'need-time', label: 'Need time' },
  { id: 'ready-second-chance', label: 'Ready for a second chance' },
]

export const POSITIVE_TONES = new Set(['positive'])

/** Main letter body — shown before the animated heart */
export const APOLOGY_LETTER_BODY = `Dear,KS ❤️

I know I made mistakes, and I'm truly sorry for hurting you. I never wanted to be the reason behind your tears or sadness.

You mean more to me than words can express. I know a simple sorry can't fix everything, but I promise to learn from my mistakes and let my actions show you how much you mean to me.

I still smile when I think about our beautiful memories, and I hope we can create many more someday.

I don't expect you to forget everything overnight. Take all the time you need. Your feelings matter, and I'll never rush you to forgive me.

I'm genuinely sorry. You deserve all the love and happiness in the world.`

/** Closing signature — shown after the heart + wish line */
export const APOLOGY_LETTER_CLOSING = `With love,
Someone who never wants to lose you. ❤️`

export const YOUTUBE_VIDEO_ID = '0KozfDYK1EU'
