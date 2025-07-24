export interface Card {
  id: number;
  code: string;       // e.g. MAJ_00
  name: string;       // "The Greenhorn"
  description: string;// single-line synopsis for quick prompts
  prompt: string;     // full descriptive prompt
}

export const cards: Card[] = [
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

  // Tools (Fire/Action) - 14 cards (22-35)
  {
    id: 22,
    code: 'TOOLS_ACE',
    name: 'Ace of Tools',
    description: 'New creative energy, raw potential for action, the spark of creation',
    prompt: 'A weathered hand emerges from swirling dust and debris, gripping a gleaming multi-tool that sparks with electric energy. Scattered around are the remnants of previous builds—twisted metal, broken circuits, salvaged components waiting to be transformed. In the distance, the skeletal framework of a new construction rises against the harsh Fringe sky, representing the raw potential of creation, the first spark of ambitious engineering, and the drive to impose order on the wasteland through sheer will and craftsmanship.'
  },
  {
    id: 23,
    code: 'TOOLS_02',
    name: 'Two of Tools',
    description: 'Future planning, strategic decision-making, personal power through preparation',
    prompt: 'An Engineer Guild member stands atop a reinforced observation tower, holding a salvaged globe showing territorial claims in one hand and a gleaming wrench in the other, surveying the harsh Fringe landscape spread before them. A second tool—a plasma cutter—rests against the tower wall, representing the dual nature of creation and destruction in frontier engineering. The scene captures the essence of strategic planning, making crucial decisions about resource allocation, and wielding personal power through careful preparation and territorial vision.'
  },
  {
    id: 24,
    code: 'TOOLS_03',
    name: 'Three of Tools',
    description: 'Expansion, foresight, trade opportunities',
    prompt: 'A weathered Drifter stands on a rocky outcrop overlooking a vast trade route that cuts through the wasteland, watching a caravan of scavenged vehicles heading toward the horizon loaded with salvaged machinery. Three tools—a plasma torch, welding rig, and diagnostic scanner—stand embedded in the rocky ground beside them, marking the boundaries of their established territory. The scene symbolizes expansion of operations, long-term foresight in territorial claims, and the entrepreneurial opportunities that come from understanding trade routes and resource flows.'
  },
  {
    id: 25,
    code: 'TOOLS_04',
    name: 'Four of Tools',
    description: 'Celebration, stability, home, achievement',
    prompt: 'Four massive construction tools—plasma cutters, arc welders, hydraulic lifts, and fusion hammers—form the framework of a newly completed settlement structure, their work lights casting celebratory patterns across the gathered Engineers Guild members who raise their hands in triumph. The completed habitat dome gleams in the background, representing the joy of successful construction, celebration of engineering achievements, and the stability that comes from building something lasting in the harsh Fringe environment.'
  },
  {
    id: 26,
    code: 'TOOLS_05',
    name: 'Five of Tools',
    description: 'Conflict, competition, labor disputes',
    prompt: 'Five Engineers Guild members engage in a heated but non-violent dispute over salvage rights, each brandishing different tools—wrenches, plasma cutters, diagnostic scanners—while arguing over a massive piece of valuable machinery half-buried in the wasteland debris. Despite the intensity of their disagreement, this represents healthy competition for resources, contrasting engineering philosophies, and the dynamic energy that drives innovation through professional rivalry and territorial disputes.'
  },
  {
    id: 27,
    code: 'TOOLS_06',
    name: 'Six of Tools',
    description: 'Success, public recognition, progress through skilled work',
    prompt: 'A triumphant engineer rides a reinforced construction mech through a crowd of celebrating Drifters and Guild members, wearing a crown made from welded salvage and holding a gleaming power drill topped with a wreath of twisted metal. Five other workers raise their tools—wrenches, plasma cutters, diagnostic scanners—in recognition of the successful completion of a major infrastructure project. The scene represents victory through skilled labor, public recognition of engineering excellence, and the respect earned through masterful craftsmanship in the harsh Fringe environment.'
  },
  {
    id: 28,
    code: 'TOOLS_07',
    name: 'Seven of Tools',
    description: 'Defensive position, perseverance, holding ground',
    prompt: 'A lone Mercenary stands atop a fortified scrap tower, wielding a high-powered plasma rifle defensively while six other weapons—assault rifles, grenade launchers, energy blasters—thrust up from the wasteland raiders below. The elevated position and defensive stance suggest the advantage of preparation and superior firepower when protecting valuable salvage claims against overwhelming opposition and territorial raiders in the lawless Fringe.'
  },
  {
    id: 29,
    code: 'TOOLS_08',
    name: 'Eight of Tools',
    description: 'Swift action, rapid deployment, efficient execution',
    prompt: 'Eight industrial tools—plasma torches, fusion cutters, hydraulic jacks, diagnostic probes—streak through the dust-filled air like projectiles toward a massive salvage operation, suggesting rapid deployment of engineering resources and swift coordinated action. Below lies a sprawling scrapyard with gleaming metal deposits, representing the efficient execution of large-scale projects and the rapid progress that comes from coordinated effort and proper tool deployment.'
  },
  {
    id: 30,
    code: 'TOOLS_09',
    name: 'Nine of Tools',
    description: 'Resilience, final stand, strength through adversity',
    prompt: 'A battle-scarred engineer leans on a makeshift neural-linked staff, looking warily over their shoulder at eight defensive tools—plasma barriers, auto-turrets, energy shields—arranged like a protective perimeter behind them. Despite obvious wounds from territorial conflicts and equipment malfunctions, they remain alert and ready for the next challenge. The scene represents perseverance through engineering trials, maintaining vigilance over valuable claims, and the strength gained through surviving the harsh realities of Fringe construction work.'
  },
  {
    id: 31,
    code: 'TOOLS_10',
    name: 'Ten of Tools',
    description: 'Overwhelming responsibility, the burden of success',
    prompt: 'A bent figure struggles under the massive weight of ten heavy construction tools—arc welders, fusion hammers, plasma saws, hydraulic lifts—while trudging toward a distant settlement construction site. The technological burden of equipment and responsibility seems almost crushing, yet the gleaming new habitat domes on the horizon represent the reward for such dedication. The scene captures the overwhelming responsibilities that come with engineering success and the determination required to complete massive infrastructure projects.'
  },
  {
    id: 32,
    code: 'TOOLS_PAGE',
    name: 'Page of Tools',
    description: 'Eagerness to learn, technical curiosity, apprenticeship',
    prompt: 'A young apprentice engineer in patched work clothes holds a gleaming multi-tool up for careful examination, standing in a vast salvage yard with transmission towers and construction sites dotting the horizon. Their eager stance suggests technical curiosity and readiness for hands-on learning. Tool holsters and diagnostic equipment mark them as someone beginning their engineering journey, representing the enthusiasm of youth discovering the transformative power of skilled craftsmanship in the Fringe.'
  },
  {
    id: 33,
    code: 'TOOLS_KNIGHT',
    name: 'Knight of Tools',
    description: 'Passionate action, impulsive building, adventurous engineering',
    prompt: 'A knight-engineer in reinforced work armor rides a heavy construction mech, wielding a massive plasma cutter like a lance. The mech\'s hydraulic systems hiss with steam as it prepares to charge into a new construction project with reckless enthusiasm. The knight\'s armor is decorated with guild insignia and tool motifs that gleam in the harsh light. The scene represents passionate engineering action, the impulsive drive to build and create, and the adventurous spirit that tackles impossible construction projects.'
  },
  {
    id: 34,
    code: 'TOOLS_QUEEN',
    name: 'Queen of Tools',
    description: 'Confident leadership, mastery of craft, determined execution',
    prompt: 'A guild queen sits on a throne constructed from precision-welded metal and advanced diagnostic equipment, holding a gleaming sonic screwdriver in one hand and a bio-luminescent work light in the other. A mechanical companion—part cat, part diagnostic drone—rests at her feet with glowing sensor arrays. The scene radiates engineering confidence, technical mastery, and the determination to achieve ambitious construction goals through skilled leadership and intuitive understanding of complex systems.'
  },
  {
    id: 35,
    code: 'TOOLS_KING',
    name: 'King of Tools',
    description: 'Master craftsman, visionary leadership, engineering wisdom',
    prompt: 'A king sits on a throne built from the finest salvaged machinery, holding a master\'s tool—a fusion welder that pulses with controlled energy—while construction blueprints and technical schematics decorate both his reinforced robes and the throne\'s metalwork. A holographic display shows ongoing construction projects in an endless loop, representing the cyclical nature of building and rebuilding in the Fringe. The scene embodies master-level engineering leadership, technical vision, and the ability to inspire others through innovative construction and infrastructure projects.'
  },

  // Vials (Water/Resources) - 14 cards (36-49)
  {
    id: 36,
    code: 'VIALS_ACE',
    name: 'Ace of Vials',
    description: 'New emotional connections, pure resources, the beginning of valuable relationships',
    prompt: 'A weathered hand emerges from swirling bio-luminescent mist, offering a pristine glass vial filled with shimmering, opalescent fluid that pulses with inner light. Five streams of the precious liquid flow from the vial into collection channels carved in the rocky ground, representing the generous sharing of rare biological resources. A bio-mechanical dove with iridescent feathers and glowing eyes descends toward the vial, symbolizing the pure potential for new alliances, the beginning of valuable trade relationships, and the emotional nourishment that comes from sharing scarce resources in the harsh Fringe.'
  },
  {
    id: 37,
    code: 'VIALS_02',
    name: 'Two of Vials',
    description: 'Partnership in trade, mutual benefit, alliance formation',
    prompt: 'Two Venonauts in weathered environmental suits face each other across a makeshift trading post, each holding a glowing bio-containment vial filled with precious alien flora extracts, preparing to complete a mutually beneficial exchange. Above them, a winged serpent carved from living coral hovers over intertwined vines that pulse with bio-electric energy, representing the symbiotic power of balanced trade relationships and mutual prosperity built on the careful exchange of rare biological and chemical resources.'
  },
  {
    id: 38,
    code: 'VIALS_03',
    name: 'Three of Vials',
    description: 'Celebration of successful harvest, community sharing, creative collaboration',
    prompt: 'Three members of The Borsh Conservatory of Gastrocraft raise their bio-luminescent vials in celebration, toasting a successful harvest of rare alien spores beneath a canopy of cultivated bio-mechanical flora. They stand in a lush greenhouse laboratory where exotic plants pulse with strange light, representing the joy that comes from successful collaborative cultivation, the creative energy generated by shared knowledge of xenobiology, and the community bonds forged through dangerous resource gathering expeditions.'
  },
  {
    id: 39,
    code: 'VIALS_04',
    name: 'Four of Vials',
    description: 'Contemplation of offers, weighing trade opportunities, emotional detachment',
    prompt: 'A solitary trader sits beneath a gnarled bio-mechanical tree whose roots interface with underground chemical deposits, three filled vials arranged on the ground before them while a fourth vial containing an unknown, swirling substance is offered by an outstretched mechanical appendage. The trader appears lost in contemplation, perhaps considering whether this new resource is worth the risk, representing the careful evaluation needed when dealing with unknown biological materials and the emotional distance required for successful negotiation in dangerous trades.'
  },
  {
    id: 40,
    code: 'VIALS_05',
    name: 'Five of Vials',
    description: 'Loss of valuable resources, contamination, broken alliances',
    prompt: 'A cloaked figure in a contamination suit contemplates three shattered vials leaking precious bio-fluid into the toxic soil, their valuable contents lost to accident or sabotage, while two intact vials still glow behind them with salvageable resources. In the distance, a bridge of living coral spans a chasm leading to a thriving bio-dome settlement, suggesting that despite the loss of precious materials and broken trade relationships, there remains hope for rebuilding alliances and recovering from resource disasters through persistence and careful cultivation.'
  },
  {
    id: 41,
    code: 'VIALS_06',
    name: 'Six of Vials',
    description: 'Nostalgia for simpler times, sharing innocent resources, gentle memories',
    prompt: 'A young apprentice alchemist in patched environmental gear offers a small vial filled with glowing flower essence to a younger child in what appears to be a protected bio-dome garden, surrounded by the careful cultivation of six different specimen containers holding preserved petals and seeds from a time before the wasteland. The scene represents nostalgic longing for the innocent abundance that existed before the harsh realities of resource scarcity, the simple joy of sharing gentle biological materials, and the preservation of pure, uncorrupted genetic samples from a more fertile past.'
  },
  {
    id: 42,
    code: 'VIALS_07',
    name: 'Seven of Vials',
    description: 'Multiple trade opportunities, illusion vs reality in resources, tempting offers',
    prompt: 'A silhouetted figure stands before seven vials floating in bioluminescent mist, each containing different alien substances—some glowing with promise, others dark and ominous—representing various trade opportunities and resource choices. The scene suggests the critical need to distinguish between legitimate biological treasures and dangerous temptations, the difficulty of evaluating unknown alien flora, and the wishful thinking that can lead traders to overestimate the value of mysterious substances without proper analysis by The Borsh Conservatory.'
  },
  {
    id: 43,
    code: 'VIALS_08',
    name: 'Eight of Vials',
    description: 'Abandoning depleted resources, seeking new territories, emotional withdrawal',
    prompt: 'A lone Venonaut in full environmental protection walks away from eight drained vials arranged in the toxic soil of an exhausted extraction site, heading toward distant bio-luminescent formations under an alien sky. The scene represents the difficult decision to abandon depleted resource territories that no longer yield valuable materials, the emotional toll of leaving behind significant investments in cultivation and extraction, and the need to seek higher ground where untapped biological wealth might still flourish.'
  },
  {
    id: 44,
    code: 'VIALS_09',
    name: 'Nine of Vials',
    description: 'Satisfaction with accumulated resources, emotional fulfillment, successful cultivation',
    prompt: 'A satisfied resource trader sits with arms crossed before a curved bio-mechanical display rack showcasing nine precious vials filled with different rare essences that pulse with soft, varied light—each representing a successful harvest or beneficial trade. Their expression shows deep contentment and emotional fulfillment achieved through patient cultivation and wise resource management. This represents the "wish fulfilled" card of resource abundance, the satisfaction that comes from building sustainable bio-wealth through careful relationships with nature and trading partners.'
  },
  {
   id: 45,
    code: 'VIALS_10',
    name: 'Ten of Vials',
    description: 'Ultimate resource security, abundant community sharing, family prosperity',
    prompt: 'A family of bio-resource cultivators stands with raised hands beneath a living rainbow of symbiotic organisms that display ten glowing vials in a natural arc overhead, while children play safely among bioluminescent plants that grow in abundance around their thriving settlement. A established bio-dome community gleams in the background, representing ultimate resource security, the emotional fulfillment of sharing abundant biological wealth within a loving community, and the prosperity that comes from multi-generational investment in sustainable cultivation and harmonious relationships with alien ecosystems.'
  },
  {
    id: 46,
    code: 'VIALS_PAGE',
    name: 'Page of Vials',
    description: 'Curiosity about new resources, intuitive bio-sensing, learning opportunities',
    prompt: 'A young student of xenobiology stands by a pool of luminescent bio-fluid, holding a collection vial from which a strange, translucent organism seems to emerge and communicate, representing the unexpected nature of first contact with alien life forms and the intuitive messages that come through careful observation of biological samples. The bio-luminescent creature symbolizes the contents of the living ecosystem beginning to reveal its secrets to those patient enough to listen and learn from the natural world.'
  },
  {
    id: 47,
    code: 'VIALS_KNIGHT',
    name: 'Knight of Vials',
    description: 'Romantic approach to cultivation, gentle resource gathering, pursuit of beauty',
    prompt: 'A knight-cultivator in bio-adaptive armor rides a symbiotic mount at a leisurely pace through fields of alien flora, holding a prismatic vial as if offering its contents to pollinate the surrounding ecosystem. The mount moves calmly through the bio-luminescent landscape, its organic systems interfacing peacefully with the living environment, representing the gentle, romantic approach to resource cultivation and the pursuit of biological harmony rather than aggressive extraction and exploitation of natural systems.'
  },
  {
    id: 48,
    code: 'VIALS_QUEEN',
    name: 'Queen of Vials',
    description: 'Intuitive understanding of ecosystems, nurturing resource management, emotional wisdom',
    prompt: 'A queen sits on a bio-mechanical throne at the edge of a pool filled with living bio-fluid, holding an ornate master vial that displays swirling patterns of interconnected life forms while gazing into it with deep understanding. Symbiotic organisms and crystalline formations decorate her throne, representing her profound connection to the biological unconscious and the emotional depths of natural systems. She embodies compassionate resource stewardship, intuitive wisdom about ecological balance, and the emotional maturity needed to nurture both alien and human communities.'
  },
  {
    id: 49,
    code: 'VIALS_KING',
    name: 'King of Vials',
    description: 'Mastery of resource diplomacy, emotional balance in trade, wise cultivation leadership',
    prompt: 'A king sits on a bio-mechanical throne that appears to float on turbulent streams of various bio-fluids, yet he remains calm and balanced, holding a master vial and a scepter carved from living coral. An exotic bio-mechanical creature leaps from the stream nearby, representing his mastery of resource emotions and the ability to remain diplomatically stable while navigating the complex depths of inter-species trade relationships, biological cultivation, and the emotional negotiations required for sustainable resource management in the dangerous Fringe environment.'
  },

  // Comms (Air/Information) - 14 cards (50-63)
  {
    id: 50,
    code: 'COMMS_ACE',
    name: 'Ace of Comms',
    description: 'New breakthrough in information, clarity of communication, pure truth cutting through deception',
    prompt: 'A weathered hand emerges from swirling electromagnetic interference, grasping a crystalline communication device that pulses with pure, unfiltered data streams. The device is crowned with a holographic wreath of interlinked signal patterns, representing victory through perfect information clarity and the cutting power of undeniable truth. In the distance, transmission towers stand like sentinels against the chaotic sky, symbolizing the challenges that can be overcome when communication is clear, direct, and free from the distortion of propaganda and misinformation that plagues the Fringe.'
  },
  {
    id: 51,
    code: 'COMMS_02',
    name: 'Two of Comms',
    description: 'Information stalemate, difficult decisions about what to believe, conflicting sources',
    prompt: 'A blindfolded figure sits in a makeshift communication bunker, holding two crossed antenna arrays that crackle with opposing data streams, while behind them competing transmission towers broadcast conflicting information into the chaotic atmosphere. The blindfold represents the need to rely on inner wisdom when external sources are compromised or contradictory, while the crossed communication devices suggest an information stalemate requiring careful analysis to determine which signals carry truth and which carry deception in the fog of Fringe information warfare.'
  },
  {
    id: 52,
    code: 'COMMS_03',
    name: 'Three of Comms',
    description: 'Betrayal through information, painful truth, communication that causes separation',
    prompt: 'Three sharp transmission spires pierce through a bio-mechanical communication hub against a stormy sky filled with chaotic data static, representing the painful moment when truth cuts through relationships and illusions. The scene captures the sharp anguish of betrayal through leaked information, the separation that occurs when hidden communications are revealed, and the grief that comes from learning that trusted allies have been spreading misinformation or withholding critical intelligence in the dangerous game of Fringe survival.'
  },
  {
    id: 53,
    code: 'COMMS_04',
    name: 'Four of Comms',
    description: 'Communication silence, rest from information overload, peaceful isolation from signals',
    prompt: 'A figure lies in repose on a shielded platform within a Faraday cage sanctuary, hands positioned over a dormant communication console, while three active signal arrays hover on the walls above and one lies silent beneath, their lights dimmed to gentle pulses. The scene represents the crucial need for communication rest, mental silence from the constant bombardment of information, and peaceful contemplation away from the endless noise of competing signals, propaganda, and data streams that assault inhabitants of the Fringe.'
  },
  {
    id: 54,
    code: 'COMMS_05',
    name: 'Five of Comms',
    description: 'Information warfare victory at great cost, propaganda triumph, hollow communication victory',
    prompt: 'A figure in battle-worn communication gear stands holding three active signal jammers while looking at two others walking away dejectedly through the wasteland, their abandoned communication equipment sparking and dying in the toxic soil. The sky crackles with digital static and conflicting data streams, representing the pyrrhic victory of information warfare where winning through deception, propaganda manipulation, and signal jamming comes at too high a cost to relationships and community trust, leaving the victor isolated in their hollow triumph.'
  },
  {
    id: 55,
    code: 'COMMS_06',
    name: 'Six of Comms',
    description: 'Safe passage of information, transitioning to better communication, moving toward truth',
    prompt: 'A figure sits in a shielded communication vessel with a young apprentice signal operator, being ferried across calm streams of filtered data toward distant relay stations that pulse with clean, verified information. Six communication arrays stand upright in the craft, their signal beams creating safe pathways through the chaotic electromagnetic interference, representing the careful transport of important knowledge, beliefs, and memories from one information environment to another during times of communication transition and the passage toward more reliable sources of truth.'
  },
  {
    id: 56,
    code: 'COMMS_07',
    name: 'Seven of Comms',
    description: 'Information theft, stealth communication, getting away with stolen intelligence',
    prompt: 'A figure in advanced signal-dampening gear sneaks away from a fortified communication complex, carrying five encrypted data cores while leaving two active signal emitters behind to mask their escape. The scene suggests covert intelligence gathering, the strategic theft of classified information, and the dangerous game of espionage communication, but also hints at the potential consequences of stealing sensitive data and the risk of being caught in the web of information warfare that defines survival in the Fringe.'
  },
  {
    id: 57,
    code: 'COMMS_08',
    name: 'Eight of Comms',
    description: 'Information overwhelm, trapped by conflicting signals, communication paralysis',
    prompt: 'A blindfolded figure stands surrounded by eight towering communication arrays that pulse with conflicting information streams, appearing mentally trapped by the overwhelming flood of contradictory data, yet with a clear pathway visible behind them through the interference. The scene represents the paralysis that comes from information overload, the mental imprisonment created by too many competing voices and signals, and the self-imposed limitations that arise when one becomes overwhelmed by the constant noise of Fringe communication networks.'
  },
  {
    id: 58,
    code: 'COMMS_09',
    name: 'Nine of Comms',
    description: 'Information anxiety, fear of the truth, communication nightmares',
    prompt: 'A figure sits up in a bio-mechanical communication chamber with head in hands, appearing distressed and unable to sleep, while nine menacing signal arrays hover on the walls above, casting eerie patterns of shifting data and electromagnetic interference. The scene represents the anxiety that comes from knowing too much dangerous information, the fear of communication being intercepted or misused, and the mental anguish that afflicts those who carry the burden of terrible truths in the information wars of the Fringe.'
  },
  {
    id: 59,
    code: 'COMMS_10',
    name: 'Ten of Comms',
    description: 'Information overload crisis, complete communication breakdown, the end of signal clarity',
    prompt: 'A figure lies face down, overwhelmed by ten massive communication towers that pierce through them like spears of overwhelming information, under a dark sky crackling with chaotic static and interference, yet the first hints of a clear signal dawn from distant, clean transmission sources on the horizon. The scene represents the complete breakdown of communication systems, the crisis point of information overload, and hitting rock bottom in the war between truth and misinformation, yet suggests that even the darkest communication night eventually gives way to new clarity and better signal sources.'
  },
  {
    id: 60,
    code: 'COMMS_PAGE',
    name: 'Page of Comms',
    description: 'Curiosity about information, learning to decode signals, vigilant communication',
    prompt: 'A young apprentice in weathered communication gear stands on uneven terrain scattered with broken signal equipment, holding a small but powerful signal detector aloft while scanning the chaotic electromagnetic environment with alert curiosity. Mechanical signal-relay birds fill the static-filled sky above, representing the active, inquisitive mind learning to navigate the complex world of Fringe communications, ready to decode new information sources and deliver critical messages despite the dangerous and unstable communication landscape.'
  },
  {
    id: 61,
    code: 'COMMS_KNIGHT',
    name: 'Knight of Comms',
    description: 'Rapid information deployment, aggressive communication, swift signal transmission',
    prompt: 'A cyber-knight charges forward on a signal-boosted mount, holding a high-powered transmission array like a lance, both rider and steed streaming with cascading data flows and electromagnetic energy as they race to deliver critical information across the hostile Fringe environment. The scene represents swift communication action, the aggressive pursuit of information objectives, and the drive to achieve strategic goals through the rapid deployment of communication technology and the determination to get vital intelligence through enemy interference.'
  },
  {
    id: 62,
    code: 'COMMS_QUEEN',
    name: 'Queen of Comms',
    description: 'Independent information analysis, unbiased communication, clear signal boundaries',
    prompt: 'A queen sits on a throne built from crystalline communication equipment, holding an upright signal array that cuts through electromagnetic interference with surgical precision, her other hand extended in a gesture that commands silence from the chaotic data streams around her. Her expression shows the wisdom gained through years of analyzing conflicting information sources, representing communication independence, clear analytical thinking, and the rare ability to make unbiased judgments about truth and falsehood in the propaganda-filled environment of the Fringe.'
  },
  {
    id: 63,
    code: 'COMMS_KING',
    name: 'King of Comms',
    description: 'Master of information strategy, communication authority, signal clarity through wisdom',
    prompt: 'A king sits on a throne constructed from the finest communication technology, holding an upright master signal array that broadcasts pure, unfiltered truth, while his throne is decorated with holographic data streams and signal pattern motifs that represent the flow of verified information. The scene embodies intellectual communication authority, the mental discipline required to distinguish truth from propaganda, and the wisdom that comes from mastering the complex art of information warfare and strategic communication in the dangerous realm of the Fringe.'
  },

  // Gear (Earth/Material) - 14 cards (64-77)
  {
    id: 64,
    code: 'GEAR_ACE',
    name: 'Ace of Gear',
    description: 'New equipment opportunity, material manifestation, the foundation of physical security',
    prompt: 'A weathered hand emerges from swirling dust and debris, holding a pristine piece of advanced equipment that hums with mechanical precision—a multi-purpose survival device that gleams with promise. Below lies a rough path carved through rocky terrain leading to distant mining operations and trade outposts, representing the practical steps needed to manifest material success and physical security in the harsh Fringe. The device symbolizes the potential for new territorial claims, the foundation of wealth through quality equipment, and the promise that "you are only as good as your gear."'
  },
  {
    id: 65,
    code: 'GEAR_02',
    name: 'Two of Gear',
    description: 'Balancing resources, equipment maintenance, adaptability in harsh conditions',
    prompt: 'A Union of Merchants trader in weathered gear carefully balances two pieces of essential survival equipment—a water purifier and a portable power cell—while behind them supply caravans navigate through the treacherous mountain passes of the wasteland. The scene represents the constant challenge of managing multiple essential resources, maintaining critical equipment in harsh conditions, and adapting to the ever-changing demands of Fringe survival where one broken piece of gear can mean the difference between life and death.'
  },
  {
    id: 66,
    code: 'GEAR_03',
    name: 'Three of Gear',
    description: 'Collaborative construction, shared expertise, building lasting infrastructure',
    prompt: 'A skilled technician from the Subsurface Miners Guild works on reinforcing a critical mining platform while two other specialists—one holding detailed geological surveys and another operating diagnostic equipment—collaborate on the project. Three pieces of precision mining gear are integrated into the platform structure above, representing skilled teamwork in harsh conditions, collaborative expertise in specialized equipment, and the building of lasting infrastructure that can withstand the brutal environment of the Fringe.'
  },
  {
    id: 67,
    code: 'GEAR_04',
    name: 'Four of Gear',
    description: 'Hoarding equipment, security through possession, fear of loss',
    prompt: 'A paranoid Drifter sits in their fortified shelter, clutching a valuable piece of survival gear while surrounded by three other essential items—oxygen recycler, defensive turret, food synthesizer—all carefully guarded and maintained. The wasteland settlement visible through the reinforced windows represents both security through careful conservation of resources and the psychological limitations that come from holding too tightly to material possessions when survival depends entirely on the reliability of one\'s equipment.'
  },
  {
    id: 68,
    code: 'GEAR_05',
    name: 'Five of Gear',
    description: 'Equipment failure, material hardship, loss of security',
    prompt: 'Two figures in torn environmental suits trudge through a toxic storm, their broken gear sparking and failing, while in the distance a well-lit trading post displays five pieces of quality survival equipment in its reinforced windows. Despite their apparent material hardship and equipment failure, help and essential gear are available nearby through the Union of Merchants if they can reach it. The scene represents the devastating impact of gear failure in the Fringe, but also suggests that community support and trade networks can provide a path back to security.'
  },
  {
    id: 69,
    code: 'GEAR_06',
    name: 'Six of Gear',
    description: 'Generous resource sharing, fair trade, equipment charity',
    prompt: 'A Union of Merchants trader holds a precision balance scale in one hand while distributing essential survival equipment to desperate Drifters with the other—oxygen masks, portable power cells, water purification tablets. Six pieces of quality gear are displayed overhead on elevated platforms, representing the flow of material resources through generous trade practices, fair equipment exchange, and the merchant philosophy that prosperity shared creates stronger communities in the harsh Fringe environment.'
  },
  {
    id: 70,
    code: 'GEAR_07',
    name: 'Seven of Gear',
    description: 'Assessment of investment, patience with long-term projects, evaluating returns',
    prompt: 'A contemplative member of the Subsurface Miners Guild leans on a reinforced mining staff while surveying seven pieces of precision extraction equipment arranged throughout a partially excavated mineral deposit. The scene represents the critical pause to assess material progress and returns after sustained resource investment, the patience required for long-term mining operations, and the decision whether to continue current extraction efforts or redirect resources to more promising geological formations.'
  },
  {
    id: 71,
    code: 'GEAR_08',
    name: 'Eight of Gear',
    description: 'Diligent craftsmanship, skill development, quality over quantity',
    prompt: 'A master craftsperson sits at a reinforced workbench in their workshop, carefully assembling precision survival equipment with meticulous attention to detail. Six completed pieces of quality gear are displayed on the workshop walls while one complex device remains in progress on the workbench. The scene represents dedication to skilled craftsmanship, the development of expertise in equipment manufacturing, and the patient work required to achieve mastery in creating reliable gear that can mean the difference between life and death in the Fringe.'
  },
  {
    id: 72,
    code: 'GEAR_09',
    name: 'Nine of Gear',
    description: 'Material accomplishment, self-sufficiency, independent security',
    prompt: 'An elegantly equipped Drifter stands in their well-maintained personal compound, surrounded by nine pieces of premium survival gear—environmental suits, defense systems, resource processors—all functioning perfectly and providing complete self-sufficiency. A mechanical companion animal patrols the perimeter with advanced sensors, representing the material luxury and independent security that come from disciplined resource management and wise investment in quality equipment over flashy but unreliable alternatives.'
  },
  {
    id: 73,
    code: 'GEAR_10',
    name: 'Ten of Gear',
    description: 'Generational wealth, established security, legacy equipment',
    prompt: 'An elder from an established trading family stands in a fortified compound courtyard, watching as multiple generations of family members work with inherited equipment and maintain legacy systems. Ten pieces of masterwork gear are arranged overhead in a protective formation—weapons, shields, processors, vehicles—representing lasting material wealth, the security that comes from established resource foundations, and the pride of passing down quality equipment that has served the family through multiple generations of Fringe survival.'
  },
  {
    id: 74,
    code: 'GEAR_PAGE',
    name: 'Page of Gear',
    description: 'Study of equipment, learning practical skills, mechanical curiosity',
    prompt: 'A young apprentice trader stands in a salvage field, holding a complex piece of mining equipment up for detailed examination, with supply caravans visible on the distant horizon. Their focused attention to the mechanical device represents new opportunities for practical learning, the careful study of equipment functionality, and the methodical examination of material prospects that will determine their future success in the harsh realities of Fringe survival and trade.'
  },
  {
    id: 75,
    code: 'GEAR_KNIGHT',
    name: 'Knight of Gear',
    description: 'Methodical progress, reliable equipment use, conservative approach',
    prompt: 'A heavily armored knight sits steadily on a reinforced mechanical mount, holding a masterwork survival device while surveying a recently established mining operation. Unlike other knights, this figure represents steady, methodical material progress rather than swift action—the careful, conservative approach that ensures lasting success through patience, reliable equipment maintenance, and persistent effort in developing sustainable resource operations in the dangerous Fringe environment.'
  },
  {
    id: 76,
    code: 'GEAR_QUEEN',
    name: 'Queen of Gear',
    description: 'Practical wisdom, nurturing security, material comfort',
    prompt: 'A queen sits on a throne constructed from the finest salvaged materials in a well-appointed shelter, holding a masterwork survival device while surrounded by an abundance of quality equipment and comfortable living conditions. A mechanical companion creature with protective instincts rests at her feet, representing practical wisdom in resource management, the ability to create material comfort even in harsh conditions, and the nurturing approach that builds lasting security through careful attention to everyone\'s equipment needs.'
  },
  {
    id: 77,
    code: 'GEAR_KING',
    name: 'King of Gear',
    description: 'Material mastery, territorial leadership, equipment generosity',
    prompt: 'A king sits on a throne built from the most advanced salvaged technology, decorated with mechanical bull imagery and surrounded by thriving equipment stockpiles, holding a master-crafted device that represents ultimate material authority. His established fortress and well-equipped settlement stretch behind him in the distance, representing successful leadership in material affairs, territorial dominance through superior equipment, and the generosity that comes from true abundance—the willingness to share resources that makes him a leader others will follow into the dangerous unknown of the Fringe.'
  }
];

export default cards;

