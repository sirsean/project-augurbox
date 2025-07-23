export interface Card {
  id: number;
  code: string;       // e.g. MAJ_00
  name: string;       // "The Greenhorn"
  description: string;// single-line synopsis for quick prompts
  prompt: string;     // full descriptive prompt
}

const cards: Card[] = [
  // Major Arcana (22 cards)
  {
    id: 0,
    code: 'MAJ_00',
    name: 'The Fool',
    description: 'New beginnings, innocence, spontaneity',
    prompt: 'A mysterious figure teeters on the precipice of a fragmented reality, poised to delve into the chaos of the unknown worlds. They clutch a bundle of archaic tools and a white rose etched with cryptic symbols, while a mechanical canine companion hovers beside them. Above, a digital sun flickers with enigmatic energy, casting shadows of new beginnings and infinite adventures.'
  },
  {
    id: 1,
    code: 'MAJ_01',
    name: 'The Magician',
    description: 'Manifestation, resourcefulness, power',
    prompt: 'An enigmatic magician stands before an altar made of recycled circuit boards, one hand reaching towards the techno-sky and the other gesturing to the neon-lit streets below, channeling the energy of the underground. The four tarot suits are reimagined as futuristic tools—metallic wands, glowing cups, digital swords, and neon pentacles, embodying digital mastery over the elements. Above, an infinity hologram glows with boundless potential and the power to materialize cybernetic dreams.'
  },
  {
    id: 2,
    code: 'MAJ_02',
    name: 'The High Priestess',
    description: 'Intuition, sacred knowledge, divine feminine',
    prompt: 'A serene figure sits between towering monolithic data servers marked with binary code patterns, representing dual interface and synthetic balance. Behind her flickers a holographic tapestry adorned with luminous pomegranates, symbols of digital fertility and latent wisdom. She unspools a digital scroll, whispering algorithms of forbidden knowledge available only through deep contemplation within the cyber network.'
  },
  {
    id: 3,
    code: 'MAJ_03',
    name: 'The Empress',
    description: 'Femininity, beauty, nature, abundance',
    prompt: 'A nurturing sovereign reclines on a throne intertwined with neon Venus symbols, enveloped by virtual gardens of lush, pixelated flora and flowing streams of binary water. Her crown, an array of LED stars forming cosmic constellations, complements a holographic robe adorned with synthetic pomegranates. Golden wheat, represented in luminous digital sprites, blooms at her feet, signifying the fertile abundance born from creative digital artistry and nurturing innovation.'
  },
  {
    id: 4,
    code: 'MAJ_04',
    name: 'The Emperor',
    description: 'Authority, father figure, structure, control',
    prompt: 'A commanding ruler is seated on a throne constructed from repurposed industrial machinery, encircled by augmented reality ram head symbols that exude digital masculine vigor. In his grasp, an illuminated scepter crowned with an ankh circuit symbolizes authority and synthetic life. Behind, virtual barren landscapes display his influence over post-apocalyptic realms through ironclad order, strategic discipline, and cybernetic governance.'
  },
  {
    id: 5,
    code: 'MAJ_05',
    name: 'The Hierophant',
    description: 'Spiritual wisdom, religious beliefs, conformity',
    prompt: 'A hierophant in tattered robes sits between colossal data towers inscribed with sacred algorithms, wearing a triple crown of corroded brass and fiber optic cables. Crossed skeleton keys gleam with electric current in his weathered hands. Two acolytes kneel before glowing terminals, receiving the transmission of forbidden digital knowledge from master to student. The keys represent the unlocking of consciousness within the vast neural network.'
  },
  {
    id: 6,
    code: 'MAJ_06',
    name: 'The Lovers',
    description: 'Love, harmony, relationships, choices',
    prompt: 'Two figures stand beneath a cybernetic angel with mechanical wings who projects a blessing hologram over their union. Behind the woman grows a bio-luminescent Tree of Knowledge bearing digital fruit that pulse with data streams, while behind the man stands a metallic Tree of Life with fiber optic flames. This represents the choice between virtual and authentic connection, digital consciousness, and the harmony found in balancing human emotion with technological enhancement.'
  },
  {
    id: 7,
    code: 'MAJ_07',
    name: 'The Chariot',
    description: 'Control, willpower, success, determination',
    prompt: 'A cybernetic warrior sits in an armored vehicle constructed from salvaged metal and circuitry, pulled by two mechanical sphinxes - one obsidian black with red LED eyes, one chrome white with blue optical sensors - representing opposing digital forces controlled through neural interface willpower. The dystopian cityscape behind glows with conquered territories, while overhead a holographic canopy displays infinite probability matrices.'
  },
  {
    id: 8,
    code: 'MAJ_08',
    name: 'Strength',
    description: 'Inner strength, bravery, compassion, focus',
    prompt: 'A gentle figure in weathered white robes embedded with fiber optic threads calmly interfaces with a cybernetic lion, its metallic jaws and LED mane responding to their bio-electric touch. The gesture demonstrates that inner strength and digital compassion can overcome raw computational force. Above their head floats a holographic infinity symbol, representing unlimited neural power and the triumph of conscious spirit over base programming through empathy rather than force.'
  },
  {
    id: 9,
    code: 'MAJ_09',
    name: 'The Hermit',
    description: 'Soul searching, seeking inner guidance, solitude',
    prompt: 'A cloaked figure stands alone atop a transmission tower peak amid a landscape of electronic debris, holding aloft a makeshift lantern containing a six-pointed LED star powered by scavenged batteries. The harsh light cuts through digital static, illuminating pathways through the electronic wasteland for other travelers while the hermit seeks inner wisdom through solitary communion with the vast data streams. Their walking staff, fashioned from antenna and cable, represents support found in spiritual discipline within the digital wilderness.'
  },
  {
    id: 10,
    code: 'MAJ_10',
    name: 'Wheel of Fortune',
    description: 'Good luck, karma, life cycles, destiny',
    prompt: 'A massive mechanical wheel rotates in a polluted sky, its surface etched with algorithmic symbols and corrupted data streams. A cybernetic sphinx with glowing optical sensors perches atop wielding an energy blade, while a bio-mechanical serpent descends on one side and a digital manifestation of Anubis rises on the other. The wheel represents the eternal cycle of technological fortune, digital karma, and the constant dance between system upgrades and obsolescence in the connected world.'
  },
  {
    id: 11,
    code: 'MAJ_11',
    name: 'Justice',
    description: 'Justice, fairness, truth, cause and effect',
    prompt: 'A figure in weathered judicial robes sits between two towering server racks, holding a plasma sword and digital scales that process data streams in real-time. The sword points upward toward a holographic constellation representing higher algorithmic ideals, while the scales weigh digital actions and their cascading consequences through the network. The cubic crown on their head displays scrolling code representing well-ordered logic and impartial digital judgment.'
  },
  {
    id: 12,
    code: 'MAJ_12',
    name: 'The Hanged Man',
    description: 'Suspension, restriction, letting go, sacrifice',
    prompt: 'A figure hangs suspended from a T-shaped transmission tower, bio-mechanical cables connecting to neural ports in their skull, yet their expression shows digital serenity rather than distress. A halo of swirling data patterns surrounds their head, indicating enlightenment gained through conscious interface sacrifice and surrender to the network. The living metal of the tower pulses with electric current, suggesting this willing integration brings new technological growth and expanded perspective through the collective consciousness.'
  },
  {
    id: 13,
    code: 'MAJ_13',
    name: 'Death',
    description: 'Endings, beginnings, change, transformation',
    prompt: 'A bio-mechanical skeleton clad in corroded black armor rides a ghost-white synthetic horse, its chassis gleaming with ceramic plates. The rider carries a tattered black flag bearing a white rose symbol etched in bioluminescent circuits. Before the horse lie deactivated android figures representing the obsolescence of old systems, while in the distance a new sun rises between twin data towers, promising digital rebirth and technological transformation through necessary systemic endings.'
  },
  {
    id: 14,
    code: 'MAJ_14',
    name: 'Temperance',
    description: 'Balance, moderation, patience, purpose',
    prompt: 'An angelic figure with cybernetic wings stands with one foot on synthetic turf and one in a pool of luminescent coolant, pouring liquid data streams between two bio-mechanical cups in a continuous digital flow. The glowing triangle on their chest displays harmonic wave patterns representing elemental balance, while the path behind leads toward transmission towers crowned with satellite arrays, showing the way to higher network consciousness through technological equilibrium.'
  },
  {
    id: 15,
    code: 'MAJ_15',
    name: 'The Devil',
    description: 'Bondage, addiction, sexuality, materialism',
    prompt: 'A horned figure with cyber-implants perches atop a black server cube while two chained figures with neural interface ports stand below. The digital chains flicker with data streams, showing that bondage is often self-imposed through technological dependency and virtual addictions. The inverted pentagram glows with corrupted code representing consciousness trapped in the digital matrix, but the scene suggests liberation is possible through awareness of the system\'s control.'
  },
  {
    id: 16,
    code: 'MAJ_16',
    name: 'The Tower',
    description: 'Sudden change, upheaval, chaos, revelation',
    prompt: 'An electromagnetic pulse strikes a towering data center, destroying its antenna array and sending figures with neural implants tumbling toward the wasteland below. The tower represents false digital structures built on corrupted code foundations, while the EMP brings sudden system revelation and necessary destruction of virtual illusions, clearing the way for authentic analog reconstruction.'
  },
  {
    id: 17,
    code: 'MAJ_17',
    name: 'The Star',
    description: 'Hope, faith, purpose, renewal, spirituality',
    prompt: 'A figure kneels by a pool of liquid mercury under a sky filled with satellite constellations, pouring luminescent coolant onto the electronic landscape and back into the pool. The large central star is an eight-pointed transmission beacon representing hope and digital guidance, while seven smaller orbital satellites represent the network nodes. A mechanical bird nearby symbolizes the consciousness ready to upload and transcend physical limitations.'
  },
  {
    id: 18,
    code: 'MAJ_18',
    name: 'The Moon',
    description: 'Illusion, fear, anxiety, subconscious, intuition',
    prompt: 'A full moon with digital display features looks down on a data pathway winding between two transmission towers toward distant server farms. A bio-mechanical crustacean emerges from polluted water while a cybernetic wolf and robotic dog emit electronic howls at the moon, representing wild and domesticated aspects of technological nature. Digital dewdrops fall from the moon, symbolizing the nourishment of the artificial subconscious through ambient data streams.'
  },
  {
    id: 19,
    code: 'MAJ_19',
    name: 'The Sun',
    description: 'Positivity, fun, warmth, success, vitality',
    prompt: 'A radiant sun shines down on a joyful child riding a white horse in a walled garden. Sunflowers grow behind the wall, turning their faces toward the light, while the child holds a red banner of passion and life force. The scene radiates pure joy, vitality, and innocent celebration of life.'
  },
  {
    id: 20,
    code: 'MAJ_20',
    name: 'Judgement',
    description: 'Judgement, rebirth, inner calling, forgiveness',
    prompt: 'An angel blows a trumpet from the heavens while figures rise from coffins below with arms outstretched toward the divine call. The trumpet bears a flag with a red cross on white, symbolizing purity redeemed. The scene represents spiritual awakening, resurrection, and the call to higher purpose.'
  },
  {
    id: 21,
    code: 'MAJ_21',
    name: 'The World',
    description: 'Completion, accomplishment, travel',
    prompt: 'A dancing figure is surrounded by an oval wreath, representing completion and cosmic consciousness. In each corner appears a symbol of the four elements - angel (air), eagle (water), lion (fire), and bull (earth). The figure holds two wands, symbolizing balance between opposing forces and mastery over all elements.'
  },

  // Wands (Fire) - 14 cards (22-35)
  {
    id: 22,
    code: 'WANDS_ACE',
    name: 'Ace of Wands',
    description: 'New creative energy, inspiration, potential',
    prompt: 'A mechanical hand protrudes from a smoggy, holographic cloud, clutching a fiery wand with flickering LED leaves sprouting from its shaft. In the distance lies a digital fortress and towering data servers, representing the potential for groundbreaking tech ventures and cyber enterprises. The wand symbolizes the raw power of innovation and the spark of creative genius in the digital frontier.'
  },
  {
    id: 23,
    code: 'WANDS_02',
    name: 'Two of Wands',
    description: 'Future planning, making decisions, personal power',
    prompt: 'A figure stands atop a fortified digital outpost, holding a virtual globe in one hand and a glowing data wand in the other, surveying a sprawling cyber landscape. A second holographic wand hovers beside them, representing strategic foresight and digital vision. The scene encapsulates planning for future technological paths, making decisions at the crossroads of innovation, and wielding the power to code one\'s digital destiny.'
  },
  {
    id: 24,
    code: 'WANDS_03',
    name: 'Three of Wands',
    description: 'Expansion, foresight, overseas opportunities',
    prompt: 'A figure stands on a digital precipice overlooking a vast ocean of data streams, watching virtual ships sail toward the horizon. Three luminescent wands stand embedded in the cyber soil beside them, marking boundaries of exploration. The scene symbolizes the expansion of digital horizons, tech trade and enterprise, and the foresight needed to navigate upcoming technological opportunities.'
  },
  {
    id: 25,
    code: 'WANDS_04',
    name: 'Four of Wands',
    description: 'Celebration, harmony, home, achievement',
    prompt: 'Four radiant, LED-adorned cyber wands form a luminous canopy adorned with virtual garlands and digital fruit, where avatars in the distance raise their digitized arms in celebration. A digital fortress rises in the background, representing the joy of virtual homecoming, celebration of digital achievements, and the harmony in online community affairs.'
  },
  {
    id: 26,
    code: 'WANDS_05',
    name: 'Five of Wands',
    description: 'Conflict, disagreements, competition',
    prompt: 'Five digital avatars engage in a high-energy virtual duel with data wands raised, though pixelated smiles suggest this is play-fighting rather than combative warfare. The scene represents healthy techno-competition, contrasting digital philosophies, and the dynamic energy sparked by challenging intellectual encounters and online debates.'
  },
  {
    id: 27,
    code: 'WANDS_06',
    name: 'Six of Wands',
    description: 'Success, public recognition, progress',
    prompt: 'A triumphant figure rides a sleek cybernetic steed through digital crowds, wearing a crown of light-emitting circuits and wielding a data wand topped with a holographic wreath. Five other figures raise glowing wands in recognition, their cheers echoing through virtual reality speakers. The scene represents victory in the digital realm, successful tech innovation, and public recognition of digital achievements.'
  },
  {
    id: 28,
    code: 'WANDS_07',
    name: 'Seven of Wands',
    description: 'Challenge, competition, perseverance',
    prompt: 'A figure stands atop a transmission tower wielding a plasma wand defensively while six other energy weapons thrust up from the electronic wasteland below, representing cyber challenges and digital competitors. The elevated position and defensive neural interface stance suggest the advantage of maintaining one\'s digital principles and standing firm against system corruption despite overwhelming technological opposition.'
  },
  {
    id: 29,
    code: 'WANDS_08',
    name: 'Eight of Wands',
    description: 'Speed, action, air travel, movement',
    prompt: 'Eight luminescent data wands streak through the digital atmosphere like plasma arrows against a clear virtual sky, suggesting rapid data transmission and swift technological action. Below them lies a serene cyber landscape with streams of liquid light, representing the swift resolution of network delays and the rapid progress of digital projects and quantum communications.'
  },
  {
    id: 30,
    code: 'WANDS_09',
    name: 'Nine of Wands',
    description: 'Resilience, courage, persistence, test of faith',
    prompt: 'A battle-scarred figure leans on a makeshift neural staff, looking warily behind at eight glowing wands standing upright like a digital perimeter fence. Despite obvious cyber-combat wounds and flickering implants, they remain alert and ready for the next system breach. The scene represents perseverance through technological trials, maintaining digital vigilance, and the strength gained through surviving cyber warfare.'
  },
  {
    id: 31,
    code: 'WANDS_10',
    name: 'Ten of Wands',
    description: 'Burden, extra responsibility, hard work',
    prompt: 'A bent figure struggles under the weight of ten heavy data wands crackling with electric energy while walking toward a distant digital outpost or cyber settlement. The technological burden seems almost too much to bear, yet the virtual destination glows on the horizon. The scene represents the heavy digital responsibilities that come with tech success and the determination to see complex coding projects through to completion.'
  },
  {
    id: 32,
    code: 'WANDS_PAGE',
    name: 'Page of Wands',
    description: 'Enthusiasm, exploration, discovery',
    prompt: 'A young figure in weathered cyber-punk attire holds a glowing data wand as if examining its circuitry, standing in a barren electronic wasteland with transmission towers in the distance. Their stance suggests digital curiosity and readiness for cyber adventure. The salamander circuits adorning their jacket pulse with electric current, representing the transformative power of innovation and the enthusiasm of youth exploring the digital frontier.'
  },
  {
    id: 33,
    code: 'WANDS_KNIGHT',
    name: 'Knight of Wands',
    description: 'Energy, passion, adventurous, impulsive',
    prompt: 'A cyber-knight in bio-mechanical armor rides a rearing synthetic steed, holding a plasma wand like an energy lance. The mount\'s LED eyes glow with electric fire as it prepares to charge forward through the digital battlefield. The knight\'s armor is etched with salamander circuits that pulse with energy. The scene represents passionate digital action, cyber adventure, and the impulsive energy that drives bold technological ventures.'
  },
  {
    id: 34,
    code: 'WANDS_QUEEN',
    name: 'Queen of Wands',
    description: 'Confidence, courage, determination',
    prompt: 'A queen sits on a throne decorated with holographic lions and digital sunflowers that track the light, holding a plasma wand in one hand and a bio-luminescent sunflower in the other. A sleek black cyber-cat with glowing eyes sits at her feet, representing her connection to intuitive digital powers and network magic. The scene radiates confidence, electric warmth, and the determination to achieve goals through personal charisma in the cyber realm.'
  },
  {
    id: 35,
    code: 'WANDS_KING',
    name: 'King of Wands',
    description: 'Leadership, vision, honor, determination',
    prompt: 'A king sits on a digital throne holding a flowering data wand that pulses with electric blooms, with salamander circuits decorating both his bio-mechanical robes and the throne architecture. One salamander hologram appears to be biting its own tail in an infinite loop, representing the eternal nature of creative digital energy and recursive code. The scene represents mature technological leadership, cyber vision, and the ability to inspire others through innovative example in the connected world.'
  },

  // Cups (Water) - 14 cards (36-49)
  {
    id: 36,
    code: 'CUPS_ACE',
    name: 'Ace of Cups',
    description: 'Love, new relationships, compassion, creativity',
    prompt: 'A cybernetic hand emerges from a smoggy data cloud offering a bio-luminescent cup overflowing with liquid light, from which five streams of neural data flow into the electronic wasteland below. A mechanical dove with fiber optic wings carrying a digital communion chip descends toward the cup, representing synthetic love and artificial spiritual nourishment. The scene symbolizes the beginning of emotional connection through technological interface.'
  },
  {
    id: 37,
    code: 'CUPS_02',
    name: 'Two of Cups',
    description: 'Unity, partnership, mutual attraction',
    prompt: 'Two figures in weathered tech-wear face each other, each holding a glowing bio-mechanical cup, preparing to pledge their digital commitment or cyber friendship. Above them, a winged lion\'s head with LED eyes emerges from a caduceus made of intertwined fiber optic cables, representing the healing power of balanced virtual relationships and mutual attraction based on shared neural frequencies and understanding.'
  },
  {
    id: 38,
    code: 'CUPS_03',
    name: 'Three of Cups',
    description: 'Celebration, friendship, creativity, community',
    prompt: 'Three figures in cyber-punk attire raise their luminescent cups in a digital toast, celebrating friendship, technological creativity, or good algorithmic fortune. They stand in a virtual garden of pixelated flora or fertile data landscape, representing the joy that comes from sharing tech success with friends and the creative energy generated by online community and collaborative coding.'
  },
  {
    id: 39,
    code: 'CUPS_04',
    name: 'Four of Cups',
    description: 'Contemplation, apathy, reevaluation',
    prompt: 'A figure sits under a bio-mechanical tree with neural interface ports, three glowing cups on the electronic ground before them, while a cybernetic hand from a data cloud offers a fourth cup pulsing with digital energy. The figure appears lost in digital contemplation or cyber meditation, perhaps considering new technological opportunities or reevaluating current system configurations. The scene suggests a pause for digital reflection.'
  },
  {
    id: 40,
    code: 'CUPS_05',
    name: 'Five of Cups',
    description: 'Regret, failure, disappointment, pessimism',
    prompt: 'A cloaked figure in tattered tech robes contemplates three spilled cups leaking liquid light while two remain standing behind them, still glowing. In the distance, a digital bridge made of hardlight leads to a cyber fortress or data haven, suggesting that despite system losses and technological disappointments, there is still a pathway forward through the network and hope for digital restoration.'
  },
  {
    id: 41,
    code: 'CUPS_06',
    name: 'Six of Cups',
    description: 'Revisiting the past, childhood memories, innocence',
    prompt: 'A cyber-child in patched bio-mechanical clothing offers a cup filled with a holographic flower to another smaller child in what appears to be a digital courtyard or virtual garden setting. Six cups filled with pixelated flowers surround them, representing digital nostalgia, innocent pleasures in the virtual realm, and the simple joys of childhood memories preserved in the data stream.'
  },
  {
    id: 42,
    code: 'CUPS_07',
    name: 'Seven of Cups',
    description: 'Opportunities, choices, wishful thinking, illusion',
    prompt: 'A silhouetted figure stands before seven cups floating in smoggy data clouds, each containing different digital symbols representing various cyber choices or virtual temptations. The scene suggests the need to distinguish between realistic technological opportunities and mere digital fantasies or algorithmic wishful thinking in the connected world.'
  },
  {
    id: 43,
    code: 'CUPS_08',
    name: 'Eight of Cups',
    description: 'Disappointment, abandonment, withdrawal, escapism',
    prompt: 'A figure in weathered tech gear walks away from eight glowing cups arranged in a digital stack, heading toward transmission towers under a crescent moon with LED display panels. The scene represents the difficult decision to leave behind virtual situations that no longer serve digital spiritual or emotional growth, seeking higher network ground despite abandoning previous cyber investments.'
  },
  {
    id: 44,
    code: 'CUPS_09',
    name: 'Nine of Cups',
    description: 'Satisfaction, happiness, fulfillment, success',
    prompt: 'A satisfied figure in cyber attire sits with arms crossed before a curved bio-mechanical bench displaying nine golden cups that pulse with soft light. Their expression shows digital contentment and technological achievement. This is often called the "wish card," representing the fulfillment of virtual desires and the satisfaction that comes from achieving emotional and digital material goals in the connected realm.'
  },
  {
   id: 45,
    code: 'CUPS_10',
    name: 'Ten of Cups',
    description: 'Happiness, home, family, satisfaction',
    prompt: 'A couple in matching tech wear stands with arms raised toward a holographic rainbow in the digital sky displaying ten luminescent cups, while cyber-children play nearby with glowing toys. A comfortable data haven sits in the background, representing ultimate digital happiness, virtual family harmony, and the achievement of emotional fulfillment through love and connected community in the network.'
  },
  {
    id: 46,
    code: 'CUPS_PAGE',
    name: 'Page of Cups',
    description: 'Creative opportunities, intuitive messages, curiosity',
    prompt: 'A young figure in weathered bio-mechanical clothing stands by a sea of liquid mercury holding a luminescent cup from which a digital fish made of data streams appears to emerge, representing the unexpected nature of intuitive technological messages and creative cyber inspiration. The holographic fish symbolizes the contents of the artificial subconscious mind surfacing into digital conscious awareness.'
  },
  {
    id: 47,
    code: 'CUPS_KNIGHT',
    name: 'Knight of Cups',
    description: 'Creativity, romance, charm, imagination',
    prompt: 'A cyber-knight in bio-mechanical armor rides a synthetic horse at a leisurely pace, holding a glowing cup as if offering it to someone through the digital realm. The horse walks calmly rather than charging, its LED eyes soft and peaceful, representing the gentle, romantic approach to virtual life and the pursuit of emotional and artistic ideals rather than material conquest in the connected world.'
  },
  {
    id: 48,
    code: 'CUPS_QUEEN',
    name: 'Queen of Cups',
    description: 'Compassion, care, emotional stability, intuition',
    prompt: 'A queen sits on a bio-mechanical throne at the edge of a pool of liquid data, holding an ornate cup that displays swirling holographic patterns and gazing into it contemplatively. Digital fish and synthetic shells decorate the throne, representing her connection to the artificial subconscious and emotional data depths. She embodies digital compassion, intuitive cyber wisdom, and emotional technological maturity.'
  },
  {
    id: 49,
    code: 'CUPS_KING',
    name: 'King of Cups',
    description: 'Emotional balance, compassion, diplomacy',
    prompt: 'A king sits on a bio-mechanical throne that appears to float on turbulent streams of liquid data, yet he remains calm and balanced, holding a luminescent cup and a neural interface scepter. A digital fish leaps from the data stream nearby, representing the mastery of virtual emotions and the ability to remain stable while navigating the depths of technological feeling and cyber intuition.'
  },

  // Swords (Air) - 14 cards (50-63)
  {
    id: 50,
    code: 'SWORDS_ACE',
    name: 'Ace of Swords',
    description: 'New ideas, mental clarity, breakthrough',
    prompt: 'A cybernetic hand emerges from a smoggy data cloud grasping a plasma sword crowned with a holographic wreath, representing victory through digital mental clarity and algorithmic truth. Transmission towers appear in the distance, symbolizing the challenges that can be overcome through clear cyber thinking and the cutting power of digital truth and computational logic.'
  },
  {
    id: 51,
    code: 'SWORDS_02',
    name: 'Two of Swords',
    description: 'Difficult decisions, weighing options, stalemate',
    prompt: 'A blindfolded figure in tech gear sits holding two crossed energy swords, with liquid data streams and rocky server clusters behind them. The digital blindfold represents the need to rely on inner algorithmic wisdom when external sensors are unclear, while the crossed plasma swords suggest a cyber stalemate requiring careful consideration of technological options.'
  },
  {
    id: 52,
    code: 'SWORDS_03',
    name: 'Three of Swords',
    description: 'Heartbreak, separation, grief, sorrow',
    prompt: 'Three plasma swords pierce a bio-mechanical heart against a stormy digital sky filled with data rain clouds. The scene represents cyber heartbreak, network separation, and the sharp pain of digital grief, but also suggests that system storms eventually pass and emotional healing protocols can begin after acknowledging the pain subroutines.'
  },
  {
    id: 53,
    code: 'SWORDS_04',
    name: 'Four of Swords',
    description: 'Rest, relaxation, meditation, replenishment',
    prompt: 'A figure lies in repose on a bio-mechanical platform or cyber bed with hands in neural interface position, while three energy swords hover on the wall above and one lies beneath, glowing softly. The scene represents the need for system rest, digital meditation, and peaceful contemplation to restore mental and spiritual processing power.'
  },
  {
    id: 54,
    code: 'SWORDS_05',
    name: 'Five of Swords',
    description: 'Defeat, surrender, walking away, self-interest',
    prompt: 'A figure in battle-worn tech armor holds three plasma swords while looking at two others walking away dejectedly through the electronic wasteland, their energy weapons abandoned on the ground, flickering and dying. The sky is cloudy with digital static and turbulent data streams, representing cyber conflict where victory comes at too high a computational cost and the hollow nature of winning through algorithmic self-interest alone.'
  },
  {
    id: 55,
    code: 'SWORDS_06',
    name: 'Six of Swords',
    description: 'Transition, change, rite of passage, moving on',
    prompt: 'A figure sits in a hover-craft with a cyber-child, being ferried across calm streams of liquid data toward distant digital shores. Six energy swords stand upright in the craft, their plasma blades reflecting in the data streams, representing the thoughts, beliefs, or memories being carried from one phase of technological life to another during times of system transition.'
  },
  {
    id: 56,
    code: 'SWORDS_07',
    name: 'Seven of Swords',
    description: 'Deception, getting away with something, stealth',
    prompt: 'A figure in stealth tech gear sneaks away from a cyber encampment carrying five energy swords, while two remain stuck in the electronic ground behind them, their plasma blades dimming. The scene suggests digital stealth, cyber strategy, or attempting to get away with stolen data, but also the potential consequences of taking what doesn\'t belong in the network or not facing virtual situations directly.'
  },
  {
    id: 57,
    code: 'SWORDS_08',
    name: 'Eight of Swords',
    description: 'Imprisonment, entrapment, self-imposed restriction',
    prompt: 'A blindfolded figure in neural interface gear stands surrounded by eight energy swords stuck in the electronic ground, appearing trapped but with a clear pathway behind them through the digital static. The scene represents self-imposed technological limitations, mental cyber imprisonment, and the need to recognize that many restrictions exist only in the programmed mind.'
  },
  {
    id: 58,
    code: 'SWORDS_09',
    name: 'Nine of Swords',
    description: 'Anxiety, worry, fear, depression, nightmares',
    prompt: 'A figure sits up in a bio-mechanical bed with head in hands, appearing distressed, while nine energy swords hover on the wall above, casting eerie plasma light. The scene represents digital anxiety, cyber worry, virtual nightmares, and the mental anguish that can come from overthinking algorithms or dwelling on negative system possibilities rather than facing digital reality.'
  },
  {
    id: 59,
    code: 'SWORDS_10',
    name: 'Ten of Swords',
    description: 'Painful endings, deep wounds, betrayal, crisis',
    prompt: 'A figure lies face down with ten energy swords in their back, under a dark digital sky with the first hints of dawn light from distant transmission towers on the horizon. The scene represents painful system endings, cyber betrayal, and hitting digital rock bottom, but the electronic dawn suggests that even the darkest network night eventually gives way to new technological beginnings.'
  },
  {
    id: 60,
    code: 'SWORDS_PAGE',
    name: 'Page of Swords',
    description: 'Curiosity, new ideas, vigilance, messages',
    prompt: 'A young figure in weathered tech gear stands on uneven electronic ground holding an energy sword aloft while looking alertly around. Data clouds and mechanical birds fill the digital sky, representing the active, curious cyber mind ready to defend digital ideas or deliver encrypted messages. The uneven electronic terrain suggests the need for mental algorithmic agility and technological balance.'
  },
  {
    id: 61,
    code: 'SWORDS_KNIGHT',
    name: 'Knight of Swords',
    description: 'Ambition, drive, determination, fast thinking',
    prompt: 'A cyber-knight charges forward on a bio-mechanical steed with plasma sword raised, the mount\'s synthetic mane and the knight\'s digital plume streaming in the wind of rapid data transmission. The scene represents swift cyber action, digital determination, and the drive to achieve technological goals through force of neural will and quantum-quick thinking.'
  },
  {
    id: 62,
    code: 'SWORDS_QUEEN',
    name: 'Queen of Swords',
    description: 'Independence, unbiased judgement, clear boundaries',
    prompt: 'A queen sits on a bio-mechanical throne holding an upright plasma sword, her other hand extended as if gesturing for digital clarity. Data clouds fill the cyber sky while her expression shows wisdom gained through virtual experience and system interfaces. She represents technological independence, clear algorithmic thinking, and the ability to make unbiased digital judgments.'
  },
  {
    id: 63,
    code: 'SWORDS_KING',
    name: 'King of Swords',
    description: 'Mental clarity, intellectual power, authority',
    prompt: 'A king sits on a digital throne holding an upright energy sword, representing cyber justice and mental clarity. His throne is decorated with holographic butterflies and digital sylphs, symbols of data streams and computational thought. The scene represents intellectual technological authority, clear algorithmic thinking, and the power that comes from mental discipline and cyber wisdom.'
  },

  // Pentacles (Earth) - 14 cards (64-77)
  {
    id: 64,
    code: 'PENTACLES_ACE',
    name: 'Ace of Pentacles',
    description: 'New financial opportunity, manifestation',
    prompt: 'A cybernetic hand emerges from a smoggy data cloud holding a golden pentacle that pulses with circuit patterns, representing new digital material opportunities and the potential for cyber prosperity. Below lies a path of fiber optic cables leading to transmission towers, symbolizing the practical steps needed to manifest technological success and digital abundance in the connected world.'
  },
  {
    id: 65,
    code: 'PENTACLES_02',
    name: 'Two of Pentacles',
    description: 'Multiple priorities, time management, adaptability',
    prompt: 'A figure in tech gear juggles two glowing pentacles connected by a holographic infinity loop while data ships navigate through digital waves in the background. The scene represents the challenge of balancing multiple technological responsibilities, managing processing time and system resources, and adapting to changing network circumstances while maintaining digital equilibrium.'
  },
  {
    id: 66,
    code: 'PENTACLES_03',
    name: 'Three of Pentacles',
    description: 'Teamwork, collaboration, building, learning',
    prompt: 'A cyber-craftsperson works on a digital cathedral made of hardlight while two figures - one holding holographic blueprints and another observing through augmented reality - discuss the project. Three pentacles are projected into the virtual stone above, representing skilled tech teamwork, collaborative coding, and the building of something lasting through combined digital expertise and networked effort.'
  },
  {
    id: 67,
    code: 'PENTACLES_04',
    name: 'Four of Pentacles',
    description: 'Conservation, frugality, security, holding on',
    prompt: 'A figure in weathered tech robes sits holding tightly to a glowing pentacle while balancing one on their head and standing on two others, all pulsing with electric energy. A cyber city appears in the background, representing security through conservation of digital resources, but also the potential limitations of holding too tightly to virtual material possessions and encrypted data hoards.'
  },
  {
    id: 68,
    code: 'PENTACLES_05',
    name: 'Five of Pentacles',
    description: 'Financial loss, poverty, lack, isolation',
    prompt: 'Two figures in tattered tech gear walk through digital snow past an illuminated data sanctuary window showing five glowing pentacles. Despite their apparent cyber poverty and system hardship, help and digital spiritual sustenance are available nearby through the network if they choose to access it. The scene represents technological material hardship but also the availability of online assistance and community support.'
  },
  {
    id: 69,
    code: 'PENTACLES_06',
    name: 'Six of Pentacles',
    description: 'Generosity, charity, sharing, fairness',
    prompt: 'A cyber-merchant holds digital scales in one hand while transferring crypto coins to needy figures in weathered tech gear with the other. Six glowing pentacles appear above in holographic displays, representing the flow of digital material resources through generosity, online charity, and fair algorithmic exchange. The scene emphasizes the importance of both giving and receiving data wealth in technological balance.'
  },
  {
    id: 70,
    code: 'PENTACLES_07',
    name: 'Seven of Pentacles',
    description: 'Assessment, reward for hard work, patience',
    prompt: 'A figure in tech gear leans on a neural interface staff while contemplating seven glowing pentacles growing on a bio-mechanical bush, representing the pause to assess digital progress and results after sustained coding effort. The scene suggests technological patience, reflection on virtual achievements, and the decision whether to continue current development efforts or make system changes.'
  },
  {
    id: 71,
    code: 'PENTACLES_08',
    name: 'Eight of Pentacles',
    description: 'Diligence, skill development, quality, mastery',
    prompt: 'A cyber-craftsperson sits at a bio-mechanical workbench carefully coding pentacles into existence, with six completed holographic works displayed and one in progress on glowing screens. A cyber city appears in the distance, representing the dedication to digital skill development, quality programming craftsmanship, and the patient work required to achieve technological mastery.'
  },
  {
    id: 72,
    code: 'PENTACLES_09',
    name: 'Nine of Pentacles',
    description: 'Accomplishment, luxury, self-sufficiency',
    prompt: 'An elegantly dressed figure in high-tech attire stands in a lush virtual garden filled with bio-mechanical grapevines bearing nine golden pentacles that pulse with energy. A hooded cyber-falcon with LED eyes perches on their hand, representing the digital luxury and technological self-sufficiency that come from disciplined coding effort and wise investment of system resources and processing time.'
  },
  {
    id: 73,
    code: 'PENTACLES_10',
    name: 'Ten of Pentacles',
    description: 'Wealth, financial security, family, inheritance',
    prompt: 'An elderly figure in weathered tech robes watches as family members in matching cyber gear gather in a digital courtyard, with ten pentacles arranged overhead forming a holographic tree-like pattern. Robotic companions play nearby and an archway of hardlight leads to a data fortress, representing lasting digital wealth, technological family legacy, and the security that comes from established network foundations.'
  },
  {
    id: 74,
    code: 'PENTACLES_PAGE',
    name: 'Page of Pentacles',
    description: 'Study, new opportunities, ambition, messages',
    prompt: 'A young figure in weathered tech gear stands in an electronic field holding a glowing pentacle up for examination, with transmission towers in the distance. Their studious attention to the holographic pentacle represents new digital learning opportunities, practical cyber study, and the careful examination of technological material prospects and virtual possibilities.'
  },
  {
    id: 75,
    code: 'PENTACLES_KNIGHT',
    name: 'Knight of Pentacles',
    description: 'Efficiency, routine, conservatism, methodical',
    prompt: 'A cyber-knight sits motionless on a heavy bio-mechanical work horse, holding a glowing pentacle and surveying freshly processed data fields. Unlike other knights, this figure represents steady, methodical digital progress rather than swift action - the careful, conservative approach that ensures lasting technological success through patience and persistent coding.'
  },
  {
    id: 76,
    code: 'PENTACLES_QUEEN',
    name: 'Queen of Pentacles',
    description: 'Practicality, creature comforts, financial security',
    prompt: 'A queen sits on a bio-mechanical throne in a virtual garden setting, holding a luminescent pentacle while surrounded by digital abundance and cyber luxury. A robotic rabbit with glowing eyes appears at her feet, representing technological fertility and digital prosperity. She embodies practical cyber wisdom, nurturing virtual abundance, and the ability to create network security and digital comfort.'
  },
  {
    id: 77,
    code: 'PENTACLES_KING',
    name: 'King of Pentacles',
    description: 'Financial success, leadership, security, generosity',
    prompt: 'A king sits on a digital throne decorated with holographic bull heads and surrounded by bio-mechanical grapevines, holding a pentacle that pulses with energy while his data fortress and virtual gardens stretch behind him. The scene represents successful leadership in technological material affairs, established digital wealth, and the generosity that comes from true cyber abundance and network security.'
  }
];

export default cards;

