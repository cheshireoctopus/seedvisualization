# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Accelerator.delete_all

#name, city, state, latitude, longitude, companies, exits, funding, average, url

#Program, City,  State, Latitude,  Longitude, Companies, Exits$,  Funding$,  Average$,  URL (10 total)

db = [
["Flashpoint", "Atlanta", "GA",  33.755,  -84.3900,  16,  0, 20860000,  1303750, "http://flashpoint.gatech.edu/"],
["Capital Factory",  "Austin",  "TX",  30.25, -97.7500,  1,  500000,  6095000, 406333,  "http://capitalfactory.com/"],
["DreamIT Ventures", "Austin",  "TX",  30.25, -97.7500,  9, 0, 1700000, 188888,  "http://www.dreamitventures.com/"],
["TechStars Boston", "Boston",  "MA",  42.3581, -71.0636,  57,  9000000, 93170926,  1634577, "http://www.techstars.com/program/locations/boston/"],
["TechStars Boulder",  "Boulder", "CO",  40.0176, -105.2797, 66,  33000000,  151441174, 2294563, "http://www.techstars.com/program/locations/boulder/"],
["TechStars Chicago",  "Chicago", "IL",  41.8819, -87.6278,  30,  19500000,  30060738,  1002024, "http://www.techstars.com/program/locations/chicago/"],
["Healthbox",  "Chicago", "IL",  41.8819, -87.6278,  10,  0, 1252504, 125250,  "http://healthbox.com/"],
["Brandery", "CincinnatI",  "OH",  39.1,  -84.5167,  26,  0, 27400000,  1053846, "http://brandery.org/"],
["UpTech", "Cincinnati",  "OH",  39.1,  -84.5167,  8, 0, 2560000, 320000,  "http://uptechideas.org/"],
["10-xcelerator",  "Columbus",  "OH",  39.9833, -82.9833,  19,  0, 1570000, 82631, "http://10xelerator.com/"],
["Tech Wildcatters", "Dallas",  "TX",  32.7758, -96.7967,  26,  0, 7219000, 277653,  "http://techwildcatters.com/"],
["Momentum", "Grand Rapids",  "MI",  42.9612, -85.6557,  11,  0, 1666271, 151479,  "http://startgarden.com/?ref=momentum"],
["SURGE Accelerator",  "Houston", "TX",  29.7628, -95.3831,  22,  0, 11759848,  534538,  "http://www.surgeaccelerator.com/"],
["LaunchpadLA",  "Los Angeles", "CA",  34.05, -118.2500, 18,  0, 31373591,  1742977, "http://launchpad.la/"],
["Amplify.LA", "Los Angeles", "CA",  34.05, -118.2500, 23,  2000000, 7980000, 346956,  "http://www.amplify.la/"],
["StartEngine",  "Los Angeles", "CA",  34.05, -118.2500, 34,  0, 2190000, 64411, "http://www.startengine.com/"],
["K5Launch", "Los Angeles", "CA",  34.05, -118.2500, 15,  0, 937000,  62466, "http://k5launch.com/"],
["JumpStartFoundry", "Nashville", "TN",  36.1667, -86.7833,  21,  0, 4405000, 209761,  "http://jumpstartfoundry.com/"],
["TechStars NYC",  "New York",  "NY",  40.7127, -74.0059,  36,  22500000,  73595506,  2044319, "http://www.techstars.com/program/locations/nyc/"],
["Entrepreneurs Roundtable Accelerator", "New York",  "NY",  40.7127, -74.0059,  20,  0, 19422135,  971106,  "http://eranyc.com/"],
["NYC SeedStart",  "New York",  "NY",  40.7127, -74.0059,  12,  0, 13420000,  1118333, "http://nycseedstart.com/"],
["Blueprint Health", "New York",  "NY",  40.7127, -74.0059,  39,  0, 8071733, 206967,  "http://www.blueprinthealth.org/"],
["New York Digital Health Accelerator",  "New York",  "NY",  40.7127, -74.0059,  8, 0, 7425000, 928125,  "http://digitalhealthaccelerator.com/"],
["DreamIT Ventures - New York",  "New York",  "NY",  40.7127, -74.0059,  30,  0, 5871763, 195725,  "http://www.dreamitventures.com/"],
["Kaplan EdTech Accelerator",  "New York",  "NY",  40.7127, -74.0059,  10,  0, 2320000, 232000,  "http://www.kaplanedtechaccelerator.com/"],
["Women Innovate Mobile",  "New York",  "NY", 40.7127, -74.0059,  4, 0, 750000,  187500,  "http://wim.co/"],
["DreamIT Ventures - Philadelphia",  "Philadelphia",  "PA",  39.95, -75.1700,  63,  500000,  80815000,  1282777, "http://www.dreamitventures.com/"],
["AlphaLab", "Pittsburgh",  "PA",  40.4417, -80.0000,  66,  0, 13920310,  210913,  "http://alphalab.org/"],
["Portland Incubator Experiment",  "Portland",  "OR",  45.52, -122.6819, 22,  0, 32826000,  1492090, "http://www.piepdx.com/"],
["Portland Seed Fund", "Portland",  "OR",  45.52, -122.6819, 23,  0, 17522979,  761868,  "http://www.portlandseedfund.com/"],
["Betaspring", "Providence",  "RI",  41.8236, -71.4222,  71,  14000000,  15565000,  219225,  "http://www.betaspring.com/"],
["TechStars Cloud",  "San Antonio", "TX",  29.4167, -98.5, 11,  0, 22834000,  2075818, "http://www.techstars.com/cloud/"],
["RockHealth", "San Francisco", "CA",  37.7833, -122.4167, 49,  500000,  35390399,  722253, "http://rockhealth.com/"],
["Code for America Accelerator", "San Francisco", "CA",  37.7833, -122.4167, 7, 0, 13500000,  1928571, "http://www.codeforamerica.org/accelerator/"],
["Media Camp", "San Francisco", "CA",  37.7833, -122.4167, 11,  0, 11833720,  1075792, "http://www.mediacamp.com/"],
["BoomStartup",  "Sandy", "UT",  40.5725, -111.8597, 28,  0, 862500,  30803, "http://boomstartup.com/"],
["Mucker Lab", "Santa Monica",  "CA",  34.0219, -118.4814, 19,  0, 30321477,  1595867, "http://www.muckerlab.com/"],
["TechStars Seattle",  "Seattle", "WA",  47.6097, -122.3331, 30,  1500000, 42332404,  1411080, "http://www.techstars.com/program/locations/seattle/"],
["Microsoft Accelerator",  "Seattle", "WA",  47.6097, -122.3331, 31,  0, 3635000, 117258,  "https://www.microsoft.com/bizspark/accelerator/"],
["Y Combinator", "Silicon Valley",  "CA",  37.37, -122.04, 566, 1245658100,  1592642241,  2813855, "http://ycombinator.com/"],
["AngelPad", "Silicon Valley",  "CA",  37.37, -122.04, 73,  358750000, 93990731,  1287544, "http://angelpad.org/"],
["500startups",  "Silicon Valley",  "CA",  37.37, -122.04, 153, 11300000,  83719503,  547186, "http://500.co/"],
["Imagine K12",  "Silicon Valley",  "CA",  37.37, -122.04, 27,  0, 17982147, 666005, "http://www.imaginek12.com/"],
["i/o ventures", "Silicon Valley",  "CA",  37.37, -122.04, 16,  4850000, 7100000, 443750,  "http://www.ventures.io/"],
["The Alchemist Accelerator", "Silicon Valley",  "CA",  37.37, -122.04, 9, 0, 6115447, 679494, "http://www.alchemistaccelerator.com/"],
["Upwest Labs",  "Silicon Valley",  "CA",  37.37, -122.04, 17,  0, 5250000, 308823,  "http://upwestlabs.com/"],
["Boost VC", "Silicon Valley",  "CA",  37.37, -122.04, 25,  0, 1368000, 54720, "http://boost.vc/"],
["Capital Innovators", "St. Louis", "MO",  38.6272, -90.1978,  24,  0, 63049452,  2627060, "http://capitalinnovators.com/"],
["Acceleprise",  "Washington",  "DC",  38.8951, -77.0367,  6, 0, 2246100, 374350,  "http://www.acceleprise.vc/"],
]

db.each do |array|
  Accelerator.create(name:array[0] , city:array[1] , state:array[2] , latitude:array[3] , longitude:array[4] , companies:array[5] , exits:array[6] , funding:array[7] , average:array[8] , url:array[9])
end
