// Brewery/Beergarden data
export interface Brewery {
  id: number
  day: number
  type: "brewery" | "keller"
  name: string
  loc: string
  beer: string | null
  food: string | null
  fact: string
  avoid: string
  q: string
  price: string
  hours: string
  phone: string
  web: string | null
}

export const BREWERIES: Brewery[] = [
  {id:1,day:1,type:"brewery",name:"Brauerei Höhn",loc:"Memmelsdorf",beer:"Görchla — amber lager, wood-fire brewed, rich flavor. The Helles is simpler. Also try the Bierbrand (beer distillate, 3yr oak-aged).",food:"Schäuferla served as a pulled-pork burger or breaded fried meatball. Several vegetarian options.",fact:"7th generation brewery. Georg Höhn lights the wood fire a day before each Görchla batch — one of the last wood-fire brewed beers in the region.",avoid:"Check hours for Thursdays; rural breweries sometimes take early week days off.",q:"Brauerei+Höhn+Memmelsdorf",price:"€€",hours:"11:30–22:00 (Closed Mon/Tue)",phone:"+49 951 406140",web:"brauerei-hoehn.de"},
  {id:3,day:1,type:"brewery",name:"Drei Kronen",loc:"Memmelsdorf",beer:"Stöffla — delicate Rauchbier, European Beer Star winner. The 1457 lager: determined cereal flavor, very drinkable. They even brew an IPA.",food:"Sauces made with their beers, bread with smoked grains. Vegetarian and vegan options available.",fact:"Founded 1457, right across from the church. Their motto: the best inn is always the one facing the church — cure the soul first, then satisfy the body.",avoid:"No days off here! Kitchen open till 9 PM on Thu/Fri.",q:"Brauereigasthof+Drei+Kronen+Memmelsdorf",price:"€€",hours:"11:00–22:30",phone:"+49 951 944330",web:"drei-kronen.de"},
  {id:5,day:1,type:"brewery",name:"Brauerei Hummel",loc:"Merkendorf",beer:"Ungespundet Kellerbier and Räucherla — smoked, decisive but very balanced. Beers kept in cold chain, served perfectly chilled.",food:"Seasonal kitchen: asparagus in spring, chanterelles in summer, fried carp in autumn. Schlachtschüssel (hearty boiled pork platter) in winter.",fact:"Walking in feels like time travel to the 1960s — bright wood tables, wall paneling. You order bottles by email and pay by bank transfer. Nothing is modern, everything is comfortable.",avoid:"Closed on Tuesdays, so your Thursday hike is perfectly safe!",q:"Brauerei+Hummel+Merkendorf",price:"€",hours:"10:00–22:00 (Closed Tue)",phone:"+49 9542 1222",web:"brauerei-hummel.de"},
  {id:4,day:1,type:"brewery",name:"Brauerei Wagner",loc:"Merkendorf",beer:"Lager Ungespundet — fresh, strong cereal flavor. Richard Wagner Dunkel and the Jubiläumsbier 850 (robust Kellerbier).",food:"Giant pretzels and homemade charcuterie boards — the must-order here.",fact:"17,000 hectoliters/year from a village of 900 people. Impossible to miss — Wagner trucks, containers, and yellow-blue flags are everywhere.",avoid:"Pace yourself, you still have two more villages today.",q:"Brauerei+Wagner+Merkendorf",price:"€",hours:"09:00–23:00 (Closed Mon)",phone:"+49 9542 7434",web:"brauerei-wagner.de"},
  {id:6,day:1,type:"brewery",name:"Brauerei Göller",loc:"Drosendorf",beer:"Lager — incredibly balanced and drinkable. Seasonals: Sommer Lager (hoppier), Urstöffla (Aug-Oct, rare Bernstein smoked — nearly impossible to find elsewhere), Gaumekitzler (May-Jun, red spiced).",food:"Schlachtschüssel year-round (once every 4 weeks). Traditional stinco, sausages. Vegetarian options including fried cheese and vegan meatballs with local legumes.",fact:"Family runs both the brewery and a butchery — one heir handles beer, the other handles meat. 500 outdoor seats make it one of the largest stops on the trail.",avoid:"Hours are variable — call ahead before making the detour. Cash only, no card payments.",q:"Brauerei+Göller+Drosendorf",price:"€",hours:"Variable (Call ahead)",phone:"+49 9505 464",web:"brauerei-goeller.de"},
  {id:7,day:1,type:"brewery",name:"Brauerei Knoblach",loc:"Schammelsdorf",beer:"Ungespundetes 'U' — malty with a pleasant bitter finish. Räuschla — smoked Märzen, lightly spiced. Also Landbier dark and Hefeweizen. Try a Schnapps alongside your beer like the locals do.",food:"Blaue Zipfel (sausage cooked in vinegar) and weekly-rotating seasonal dishes using the freshest local ingredients.",fact:"~300 regulars have their own personal decorated mug stored on shelves. Visitors from around the world keep a Krugla here. Automatic beer vending machine outside when closed.",avoid:"Gets incredibly crowded with locals in the late afternoon.",q:"Brauerei+Knoblach+Schammelsdorf",price:"€",hours:"14:30–22:00 (Closed Mon/Tue)",phone:"+49 9505 267",web:"brauerei-knoblach.de"},
  {id:8,day:2,type:"brewery",name:"Hönig Zur Post",loc:"Tiefenellern",beer:"Posthörnla — lightly smoked, light but tasty. Also Lager (strong cereal), Pils, Weizen, plus Christmas and Easter seasonals. In summer, grab your Posthörnla at the Biergarten: orange benches and stone tables under horse chestnuts with panoramic views over the Lohntal valley.",food:"Thursday wood-fired pizza with local toppings. Dark homemade bread from the brewery's own oven — pairs perfectly with the Posthörnla.",fact:"Named 'zur Post' because it was literally the post office. Legend says drivers kept stopping here for a beer long after switching from horses to cars.",avoid:"Don't drink too fast on an empty stomach after that 2-hour hike; order food!",q:"Brauerei+Hönig+Tiefenellern",price:"€",hours:"09:30–22:00 (Closed Wed)",phone:"+49 9505 80110",web:"brauerei-hoenig.de"},
  {id:10,day:2,type:"brewery",name:"Brauerei Reh",loc:"Lohndorf",beer:"Zwickl — the standout: intense color, generous hopping, pleasant bitter finish. Also Pils and Landbier Hell.",food:null,fact:"Started as a slaughterhouse in 1901 that decided to brew its own beer. No Biergarten — you drink in the warehouse surrounded by vintage prints and the medieval six-pointed brewing star.",avoid:"Cash only. No Biergarten — you'll be drinking in the storage warehouse, which is part of the charm. Don't expect a traditional pub setting.",q:"Brauerei+Reh+Lohndorf",price:"€",hours:"Variable (Closed Mon/Tue)",phone:"+49 9505 269",web:"brauerei-reh.de"},
  {id:11,day:2,type:"brewery",name:"Brauerei Hölzlein",loc:"Lohndorf",beer:"Vollbier — the only tap beer, strong cereal flavor when served fresh. Seasonal bottles: Pils from May 1st, Bock from late October.",food:"The cordon bleu 'special' with all-local ingredients and crispy fries. Also excellent Schnitzel — wide and fried to perfection.",fact:"Heart of Lohndorf since 1781 — a village that claims the highest brewery-per-capita ratio in the world (one per 300 people).",avoid:"Often take Mon/Tue off, but your Friday visit is perfectly clear.",q:"Brauerei+Hölzlein+Lohndorf",price:"€",hours:"10:00-22:00 (Closed Mon/Tue)",phone:"+49 9505 1335",web:"brauerei-hoelzlein.de"},
  {id:12,day:2,type:"brewery",name:"Brandholz Brauerei",loc:"Melkendorf",beer:"Golden Brown — unfiltered lager, >5% ABV, intense and full-bodied. Overdrive — a bock aged in whisky barrels. Innovation over tradition. Vending machine outside when closed.",food:null,fact:"Opened 2018 on the site of the historic Winkler brewery (115+ years). Innovation over tradition — whisky barrel aging, craft-forward recipes. Check their Facebook for rare open weekends.",avoid:"Rarely open — check their Facebook page before your trip. If closed, the outdoor vending machine has chilled bottles and a table is always left out for hikers.",q:"brandholz+brauerei+Melkendorf",price:"€€",hours:"Limited taproom hours",phone:"+49 176 81335552",web:"brandholz-brauerei.de"},
  {id:13,day:3,type:"brewery",name:"Brauerei Krug",loc:"Geisfeld",beer:"Ungespundetes Lager — renowned, but only available 3hrs/week (Tue 18-19, Sat 9-11). Buy directly from Stefan Krug.",food:null,fact:"Founded 1778 — the original half-timbered farm buildings still stand. Stefan Krug writes on his site: visitors are welcome to interrupt him anytime to browse or buy beer.",avoid:"No taproom, no restaurant — sales only 3hrs/week (Tue 18–19, Sat 9–11). Your Saturday morning is your only realistic window. If Stefan's around, he'll happily let you interrupt him.",q:"Brauerei+Krug+Geisfeld",price:"€",hours:"09:00–22:00 (Closed Wed)",phone:"+49 9505 1319",web:"brauerei-krug.de"},
  {id:14,day:3,type:"brewery",name:"Brauerei Griess",loc:"Geisfeld",beer:"Kellerbier — turbid, savory, unfiltered perfection. Halbstark — blonde, heavily hopped, only 2.5% ABV (name means 'half hooligan / half strong').",food:"Kalterbraten (cold roast), Brotzeit boards of local charcuterie and aged cheeses, and seasonal fried carp.",fact:"Their Kellerbier has crossed borders — you'll find it in Italian and European craft beer bars. Balanced between old and new generations of the family.",avoid:"Don't spend too much time inside the tavern, because the Keller is next...",q:"Brauerei+Griess+Geisfeld",price:"€",hours:"15:00+ (Closed Mon/Tue)",phone:"+49 9505 1528",web:"brauerei-griess.de"},
  {id:15,day:3,type:"keller",name:"Griess Keller",loc:"Geisfeld",beer:"Kellerbier fresh from the underground barrel cellars — same Griess beer, served at perfect cellar temperature.",food:"Simple menu of snacks and hot dishes on the terraces.",fact:"Majestic half-timbered entrance leads to actual underground cellars. Reachable only by a secondary road — you have to look for it, but that's part of the charm.",avoid:"It's a short walk down Kellerweg outside the village, don't miss the turn!",q:"Griess+Keller+Geisfeld",price:"€",hours:"15:00+ (Closed Mon/Tue)",phone:"+49 9505 1528",web:"brauerei-griess.de"},
  {id:16,day:3,type:"brewery",name:"Brauerei Sauer",loc:"Roßdorf",beer:"Ur-Bräu — unfiltered lager, intense color, dry finish. Braunbier — rare Bernstein style, low fermentation, sweet and soft on the palate. In summer, the Roßdorfer Felsenkeller opens — the actual rock-carved cellar depicted on Sauer's bottles, serving Ur-Bräu underground since 1720.",food:"Local herbs season all dishes. Try the famous salad dressing made with non-alcoholic Weizenbier — sold in supermarkets across the region.",fact:"Bottles say 'Roßdorfer' not 'Sauer' — pure village pride. Featured in Playboy magazine (1983, beer article) and TV series Der König (1994).",avoid:"Usually closed on Mondays, but your Saturday arrival is perfect. The Felsenkeller usually opens late afternoon only.",q:"Brauerei+Sauer+Roßdorf",price:"€",hours:"09:00–22:00 (Closed Mon)",phone:"+49 9543 1485",web:"brauerei-sauer.de"},
  {id:19,day:3,type:"keller",name:"Almrauschhütte",loc:"Amlingstadt",beer:"Serves Ott beer from the Leinleitertal region — not own brew, but a solid local choice.",food:"Traditional Franconian dishes, taglieri, Gerupfter, plus hamburgers and vegan/vegetarian options. Live music on many weekends.",fact:"Over 800 seats, almost all outdoors, right at the edge of the Hauptsmoorwald forest. One of the most active Biergartens in the area with a regular live music programme.",avoid:"Can get very crowded on sunny weekends. Check their Facebook for music schedules.",q:"Almrauschhütte+Strullendorf",price:"€",hours:"Variable (Check Facebook)",phone:"+49 9543 4417799",web:null},
  {id:18,day:3,type:"keller",name:"Schwanenkeller",loc:"Strullendorf",beer:"Serves Rittmayer beer (from 15km south), not own brew. Your victory beer!",food:"Hot meals at mealtimes, snacks all day. You can also bring your own food — one of the few places on the trail where this is welcome.",fact:"'Swan Cellar' — where forest meets town, under centuries-old oaks with access to large underground cellars. You can bring your own food.",avoid:"Getting too comfortable and missing your check-in at the guesthouse!",q:"Schwanenkeller+Strullendorf",price:"€",hours:"15:30+ (Summer only)",phone:"+49 9543 44020",web:"schwanen-keller.de"},
  {id:20,day:3,type:"keller",name:"Gasthaus Lindenbräu",loc:"Strullendorf",beer:"Serves Mahrs beer from Bamberg — a major regional brewery, not a rarity but still a quality local product.",food:"Franconian and Bavarian classics, plus international dishes: curry, American-style steaks on the grill. Evening menu only for internationals.",fact:"The most well-known address in Strullendorf, sitting halfway down the historic Lindenallee — the linden tree avenue that gives it its name. Family-run with rooms for travelers.",avoid:"Kitchen opens at 16:30. Closed Tuesday and Wednesday.",q:"Lindenbräu+Strullendorf",price:"€€",hours:"16:30–22:00 (Closed Tue/Wed)",phone:"+49 9543 226",web:"linden-braeu.de"},
]

// Route data
export interface RouteDay {
  day: number
  title: string
  km: string
  date: string
  vibe: string
  villages: { n: string; s: number; d: string | null; tag?: string }[]
}

export const ROUTE_DAYS: RouteDay[] = [
  {day:1,title:"The Northern Villages",km:"~14.1 km",date:"Thursday, April 16",
   vibe:"First stage serves as an accessible introduction to the region. The trail features a moderate elevation profile with waypoints distributed evenly every 2.5 to 3 kilometers. The primary hiking segment concludes in Schammelsdorf, followed by a final 2-kilometer descent into the Litzendorf valley.",
   villages:[{n:"Memmelsdorf",s:2,d:null,tag:"Start"},{n:"Merkendorf",s:2,d:"km 3.6"},{n:"Drosendorf",s:1,d:"km 6.5"},{n:"Schammelsdorf",s:1,d:"km 11.6"},{n:"Litzendorf",s:0,d:"km 14.1",tag:"Basecamp"}]},
  {day:2,title:"The Lohntal Circuit",km:"~16.6 km",date:"Friday, April 17",
   vibe:"Second stage is the most topographically demanding section of the trail, featuring a sustained ascent across the Ellertal mountain ridge. Following the descent into Tiefenellern, the return route utilizes well-paved, flat agricultural paths connecting the valley floor settlements.",
   villages:[{n:"Litzendorf",s:0,d:null,tag:"Start"},{n:"Ridge Hike",s:0,d:"~km 8.3",tag:"No stops"},{n:"Tiefenellern",s:1,d:"km 8.3"},{n:"Lohndorf",s:2,d:"km 11.3"},{n:"Melkendorf",s:1,d:"km 14.5"},{n:"Litzendorf",s:0,d:"km 16.6",tag:"Return"}]},
  {day:3,title:"South to Strullendorf",km:"~11.8 km",date:"Saturday, April 18",
   vibe:"Third stage presents a straightforward, generally flat transition toward the southern terminus. The route connects Litzendorf to Strullendorf via open agricultural fields and dense forested sections, maintaining a moderate pace suitable for the final walking day.",
   villages:[{n:"Litzendorf",s:0,d:null,tag:"Start"},{n:"Geisfeld",s:3,d:"km 3.5"},{n:"Roßdorf am Forst",s:1,d:"km 6.2"},{n:"Amlingstadt",s:1,d:"km 9.1"},{n:"Strullendorf",s:2,d:"km 11.1",tag:"Finish"}]},
]

// Packing list
export interface PackCategory {
  cat: string
  items: string[]
}

export const DEFAULT_PACKING_LIST: PackCategory[] = [
  {cat:"Essentials",items:["Cash (Euros — strictly needed!)","Power Bank & Cable (for Komoot)","Deutschland-Ticket & ID"]},
  {cat:"Pharmacy & Toiletries",items:["Tick / Insect Repellent","Blister Plasters (Compeed)","Paracetamol (No Ibuprofen)","Gaviscon / Antacids","Electrolyte Powder Packets","Travel-Sized Toothbrush/Paste/Deo"]},
  {cat:"Clothing",items:["1 Lightweight Rain Jacket","1 Light Fleece or Sweater","2-3 Breathable T-Shirts","1 'Evening' Outfit (clean shirt/pants)","3-4 Pairs Hiking Socks","3-4 Pairs Underwear"]},
  {cat:"Gear & Footwear",items:["Foamy Jogging Shoes (Worn on feet)","1-Liter Water Bottle","Canvas Tote Bag (souvenir beers Day 3)","2-3 Granola Bars (Day 2 ridge hike)","Sunglasses & Small Sunscreen"]},
]

// Guide descriptions
export const GUIDE: Record<number, string> = {
  1:"<b>Founded 1783</b> and now in its <b>seventh generation</b>. The flagship Görchla is an amber lager still brewed with <b>traditional wood-fire heating</b> — master brewer Georg Höhn personally prepares the fire starting the day before each batch. The only other beer is a simpler Helles, plus a <b>Bierbrand: a beer distillate aged three years in oak</b> barrels. The kitchen reworks Franconian classics in a modern key — Schäuferla served as a pulled-pork burger or as a breaded fried meatball — with several vegetarian options. In summer, a relaxing inner courtyard opens up for outdoor dining between the brewery and the hotel. The eighth generation, Sebastian and sister Lisa, already run the kitchen with the goal of blending tradition and innovation.",
  3:"<b>Founded in 1457</b>, right across from the village church — their motto says the best inn is always the one facing the church: <b>cure the soul first, then satisfy the body</b>. Run by Isabella and Markus, fourth generation since their great-grandparents took over. The Stöffla, a delicate Rauchbier, <b>won a European Beer Star</b>; the 1457 lager is named after their founding year. All brews are cooled in <b>traditional open vats</b>. The restaurant (since 2007) serves traditional dishes where nearly every sauce is made with one of their beers, and bread is baked with the same smoked grains used for the Stöffla. Vegetarian and vegan options available. You can <b>book a full brew day on their pilot system</b> and take home 5L of your own beer.",
  4:"One of the largest breweries on the trail — <b>17,000 hectoliters per year</b> from a village of just 900 people. Brewing traces here go back to 1797; the <b>Wagner family has run it since 1919</b>. The production facility sits right in the village center, impossible to miss: Wagner trucks in every parking lot, yellow-blue flags fluttering everywhere. The Biergarten buzzes from early morning — locals picking up their weekly beer supply, hikers resting in the shade, <b>e-bikers charging up</b> (stations provided). The Lager Ungespundet has a fresh, pronounced cereal flavor that <b>tastes incredible this close to the barley fields</b> it comes from. Notable specials include the Richard Wagner Dunkel (celebrating the master brewer's 75th) and the Jubiläumsbier 850, a robust Kellerbier made for the village's 850th anniversary.",
  5:"Stepping into Hummel feels like <b>time-traveling to the 1960s</b> — bright polished-wood tables, wall paneling, nothing modern but everything comfortable. The beer range is extensive, covering all major German styles plus many seasonals. The Ungespundet Kellerbier is a classic, and the Räucherla is a smoked beer with a decisive but beautifully balanced flavor. A detail the beer-savvy traveler will appreciate: all bottles are stored in a cold room and <b>served with an unbroken cold chain</b>, at very low prices. The kitchen changes daily and follows the Franconian seasons strictly: Schlachtschüssel in winter, asparagus in spring, chanterelles in summer, crispy fried carp in autumn. Ordering bottles works old-school: <b>send an email, get a quote, pay by bank transfer</b>.",
  6:"<b>Founded 1865</b> on the edge of Drosendorf where the village meets open fields. The Göller family is split between two passions — <b>one heir runs the brewery, the other runs the butchery</b>. With <b>500 outdoor seats</b> and 90 indoors, this is one of the largest stops on the entire trail. Because they run their own slaughterhouse, all meat dishes are prepared in-house. Schlachtschüssel (the Franconian equivalent of bollito) is <b>available year-round</b> here, roughly once every four weeks — elsewhere it's winter-only. Seasonal standouts: Sommer Lager with more pronounced Hallertau hops in summer; <b>Urstöffla from August to October</b>, a lightly smoked Bernstein-style beer that's nearly impossible to find anywhere else; and Gaumekitzler from May to June, a red spiced ale with bold hopping.",
  7:"<b>Founded as an inn in 1880</b> in the exact center of Schammelsdorf, always owned by the Knoblach family. About <b>300 regulars from around the world</b> keep their personal decorated Krugla (ceramic mug) on shelves inside — a tradition that transforms the place into a living museum of loyal drinkers. Brewer Michael Knoblach also produces <b>fruit distillates from local orchards</b> — expect them to be sweeter than Italian grappa. It's common here to <b>pair each pint with a 2cl Schnapps</b>, as locals do. The kitchen rotates weekly using the freshest seasonal ingredients, with rustic staples like Blaue Zipfel always available. If you find it closed, an <b>automatic beer vending machine</b> outside serves chilled bottles at modest prices.",
  8:"<b>Founded 1478</b>, this brewery is often called 'zur Post' because its courtyard <b>literally served as the local post office</b> — with stables for changing postal horses. Legend has it that after the switch to motor vehicles in 1911, the drivers kept the old habit of stopping here for a beer at the midpoint of their route. The star beer is the Posthörnla, a lightly smoked lager that <b>pairs beautifully with their dark homemade bread</b> baked in the brewery's own oven. That same oven powers one of the inn's beloved traditions: <b>Thursday wood-fired pizza</b> topped with local cured meats and seasonal ingredients. Everything served comes from the surrounding forests and farms. In summer, the <b>Biergarten opens on an elevated position</b> overlooking the entire Lohntal valley — bright orange benches and stone tables under massive horse chestnut trees, planted centuries ago above the underground cellars to keep them cool.",
  10:"<b>Founded in 1901</b> when the local <b>slaughterhouse decided to start brewing</b> its own beer — and never looked back. There's no Biergarten here: you drink inside the storage warehouse, seated at small tables surrounded by towering pallets of beer, <b>vintage prints on the walls</b>, the medieval six-pointed brewing star (the historic symbol of German brewing guilds), and deer (Reh) signage everywhere. The brewery also <b>produces beer on contract</b> for third-party restaurants in the area.",
  11:"The beating heart of Lohndorf <b>since 1781</b> — a village that claims the <b>highest brewery-per-capita ratio in the world</b> (roughly one per 300 people). The elegant main building houses the tavern, behind which a large shaded Keller opens under horse chestnut trees. There's <b>only one beer on tap: Vollbier</b>, a classic lager whose strong cereal character shines when served fresh. Seasonal bottles appear on schedule — Pils from May 1st, Bock from the last week of October. The kitchen's crown jewel is the <b>cordon bleu 'special'</b>, made exclusively with local ingredients and served with perfectly crispy fries.",
  12:"Opened in <b>2018 on the site formerly occupied by Winkler</b>, a family-run brewery that lasted over 115 years. Brandholz is <b>not regularly open</b> — you need to follow their Facebook page and hope to be in the area on the right weekend, usually around religious holidays. When it is open, tables fill the inner courtyard with grilled local specialties and <b>live music from local bands</b>. The beer philosophy here is <b>innovation over tradition</b>: the Golden Brown is an unfiltered lager exceeding 5% ABV; the Overdrive is a bock aged in whisky barrels. On closed days, a <b>vending machine outside</b> dispenses chilled bottles.",
  13:"<b>Founded 1778</b> and surrounded by <b>original half-timbered farm buildings</b> from that era. Brauerei Krug no longer operates a restaurant or taproom — the brewery is <b>open for public sales only three hours per week</b>: Tuesday evening 18–19 and Saturday morning 9–11. Getting your hands on their renowned Ungespundetes Lager requires careful timing. But the place is worth visiting even just to walk along the lane between the historic buildings. Owner Stefan Krug makes it clear: <b>visitors are always welcome to interrupt him</b> at any moment to browse, chat, or buy beer.",
  14:"Run by the same family <b>since 1872</b>, Griess sits in perfect balance between old and new generations. You pass the tavern, enter a courtyard full of wooden tables, and reach the <b>Ausschank — the tap room</b> overlooking the old farm buildings. The traditional Kellerbier is turbid, savory, and unfiltered to perfection; it has <b>crossed borders into Italian and European craft beer bars</b>. Their most famous creation is the Halbstark: a blonde, heavily hopped beer at just 2.5% ABV — the name is a <b>wordplay between 'hooligan' and 'half strong'</b>, nodding to its halved alcohol content.",
  15:"A few hundred meters from the brewery, <b>reached only by a secondary road</b> off Kellerweg outside the village. A majestic half-timbered building marks the entrance to the <b>actual underground cellars</b> where Griess beer reaches perfect maturation. Tables are set on <b>earthen terraces under centuries-old trees</b>, completely immersed in greenery — the elevated position offers peaceful forest views. The menu is simple: snacks and hot dishes, all paired with Griess beer served fresh from underground.",
  16:"<b>Founded in 1720</b>, run by the Sauer family since 1784. Beer is still produced traditionally and <b>cooled in a rock-carved cellar</b> — the dramatic stone setting depicted on every bottle label and glass. In summer, the <b>Roßdorfer Felsenkeller opens</b>: the actual underground chambers where beer has been stored since the brewery's founding, atmospheric and dramatic, usually from late afternoon. The bottles proudly display <b>'Roßdorfer' rather than 'Sauer'</b>, reflecting deep village identity. The kitchen highlights local herbs — the sandy soil and nearby streams make Roßdorf rich in wild aromatics, blended into the <b>famous salad dressing made with non-alcoholic Weizenbier</b>. The brewery has had its brush with fame: a <b>1983 Playboy article</b> about beer and a 1994 episode of the TV crime series Der König were both set here.",
  18:"<b>'Swan Cellar'</b> — positioned right where the forest meets the town of Strullendorf, under the shade of <b>centuries-old oaks</b>. The historic building provides access to a large <b>underground cellar system</b> used traditionally to keep beer cold. Serves Rittmayer beer from about 15km south rather than its own brew. The kitchen offers hot meals only during meal times, with snacks available most of the day — and uniquely for the trail, <b>you're welcome to bring your own food</b>. This is where you'll have your <b>victory beer</b> after completing the 13 Brauereien Weg."
}

// Village completion messages
export const VILLAGE_MESSAGES: Record<string, { icon: string; msg: string }> = {
  "Memmelsdorf":{icon:"🏘️",msg:"Memmelsdorf — Wood-fire Görchla and a brewery from 1457 — strong start."},
  "Merkendorf":{icon:"🍺",msg:"Merkendorf — 17,000 hectoliters from 900 people — village punches above its weight."},
  "Drosendorf":{icon:"🌾",msg:"Drosendorf — One family, two passions — beer and butchery."},
  "Schammelsdorf":{icon:"🍻",msg:"Schammelsdorf — Your mug could join the 300 on Knoblach's shelf."},
  "Tiefenellern":{icon:"⛰️",msg:"Tiefenellern — Post office turned brewery — Posthörnla earned after the ridge."},
  "Lohndorf":{icon:"🏆",msg:"Lohndorf — World's highest brewery-per-capita — two down in one village."},
  "Melkendorf":{icon:"🎸",msg:"Melkendorf — Whisky barrel bock and a vending machine — innovation stop done."},
  "Geisfeld":{icon:"🦴",msg:"Geisfeld — From 1778 farm buildings to the underground Keller — three stops cleared."},
  "Roßdorf":{icon:"🏡",msg:"Roßdorf — Rock-carved cellars since 1720 — featured in Playboy and on your list."},
  "Amlingstadt":{icon:"🎵",msg:"Amlingstadt — 800 seats and live music at the forest edge — big stop done."},
  "Strullendorf":{icon:"🎉",msg:"Strullendorf — Swan Cellar under the oaks — the finish line. Prost."}
}

// Distance mappings
export const KM_MAP: Record<string, { r: string; c: string }> = {
  "Memmelsdorf":{r:"0",c:"0"},
  "Merkendorf":{r:"3.6",c:"3.6"},
  "Drosendorf":{r:"6.5",c:"6.5"},
  "Schammelsdorf":{r:"11.6",c:"11.6"},
  "Tiefenellern":{r:"8.3",c:"22.4"},
  "Lohndorf":{r:"11.3",c:"25.4"},
  "Melkendorf":{r:"14.5",c:"28.6"},
  "Geisfeld":{r:"3.5",c:"34.2"},
  "Roßdorf":{r:"6.2",c:"36.9"},
  "Amlingstadt":{r:"9.1",c:"39.8"},
  "Strullendorf":{r:"11.1",c:"41.8"}
}

export const BREWERY_KM: Record<number, { r: string; c: string }> = {
  1:{r:"12 m",c:"12 m"},
  3:{r:"41 m",c:"41 m"},
  5:{r:"3.9 km",c:"3.9 km"},
  4:{r:"4.4 km",c:"4.4 km"},
  6:{r:"7.1 km",c:"7.1 km"},
  7:{r:"11.9 km",c:"11.9 km"},
  8:{r:"9.2 km",c:"23.3 km"},
  10:{r:"11.4 km",c:"25.5 km"},
  11:{r:"11.9 km",c:"26.0 km"},
  12:{r:"14.8 km",c:"28.9 km"},
  13:{r:"4.0 km",c:"34.7 km"},
  14:{r:"4.4 km",c:"35.1 km"},
  15:{r:"4.8 km",c:"35.5 km"},
  16:{r:"6.6 km",c:"37.3 km"},
  19:{r:"9.1 km",c:"39.8 km"},
  18:{r:"11.1 km",c:"41.8 km"},
  20:{r:"11.8 km",c:"42.5 km"}
}

// Waypoints for Stops tab (pass-through villages at day transitions)
export const STOPS_WAYPOINTS: Record<number, { start: { n: string; rk: string; ck: string }[]; end: { n: string; rk: string; ck: string }[] }> = {
  1: {
    start: [], // Day 1 starts from first brewery location
    end: [{ n: "Litzendorf", rk: "km 14.1", ck: "km 14.1" }]
  },
  2: {
    start: [
      { n: "Litzendorf", rk: "km 0", ck: "km 14.1" },
      { n: "Schammelsdorf", rk: "km 1.9", ck: "km 16.0" }
    ],
    end: [{ n: "Litzendorf", rk: "km 16.6", ck: "km 30.7" }]
  },
  3: {
    start: [
      { n: "Litzendorf", rk: "km 0", ck: "km 30.7" },
      { n: "Melkendorf", rk: "km 1.4", ck: "km 32.1" }
    ],
    end: [] // Day 3 ends at last brewery
  }
}

// Day completion toasts
export const DAY_TOASTS: Record<number, { i: string; t: string; r: string; s: string; n: string }> = {
  1:{i:'🍻',t:'Day 1',r:'The Northern Villages',s:'Seven stops visited — from Höhn\'s wood-fire brewed Görchla to the shelves of 300 personal mugs at Knoblach. Four villages and centuries of Franconian brewing tradition covered on foot.',n:'Tomorrow: The Lohntal Circuit. A morning hike through the dry ridges of the Fränkische Toskana, followed by the former post office brewery in Tiefenellern and the Lohntal valley — home to what may be the world\'s highest brewery-per-capita ratio.'},
  2:{i:'⛰️',t:'Day 2',r:'The Lohntal Circuit',s:'Five more stops completed — from the hilltop Posthörnla with views over the Lohntal to Reh\'s warehouse tasting room among vintage brewing prints. The ridge and the valley delivered.',n:'Tomorrow: South to Strullendorf. Collect your bags and a canvas tote for souvenir bottles. The route passes through Geisfeld\'s half-timbered brewery lanes and Roßdorf\'s rock-carved cellars before arriving in Strullendorf.'},
  3:{i:'🏆',t:'Day 3',r:'South to Strullendorf',s:'Eighteen stops across three days, thirty-five kilometres, and ten villages — from millennium-old Memmelsdorf to the Swan Cellar beneath the oaks of Strullendorf. The 13 Brauereien Weg is complete.',n:'Tomorrow: a seven-minute S-Bahn ride through the Hauptsmoorwald to Bamberg Central, then ICE home. The bags are a little heavier now. Prost.'}
}
