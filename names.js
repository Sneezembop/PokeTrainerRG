
exports.femaleName = () => getRndName('female');
exports.maleName = () => getRndName('male');

var femaleNameList = ["Sophia","Emma","Olivia","Ava","Mia","Isabella","Riley","Aria","Zoe","Charlotte","Lily","Layla","Amelia","Emily","Madelyn","Aubrey","Adalyn","Madison","Chloe","Harper","Abigail","Aaliyah","Avery","Evelyn","Kaylee","Ella","Ellie","Scarlett","Arianna","Hailey","Nora","Addison","Brooklyn","Hannah","Mila","Leah","Elizabeth","Sarah","Eliana","Mackenzie","Peyton","Maria","Grace","Adeline","Elena","Anna","Victoria","Camilla","Lillian","Natalie","Isabelle","Skyler","Maya","Lucy","Lila","Audrey","Makayla","Penelope","Claire","Kennedy","Paisley","Savannah","Alaina","Gabriella","Violet","Kylie","Charlie","Stella","Allison","Liliana","Eva","Callie","Kinsley","Reagan","Sophie","Alyssa","Alice","Caroline","Aurora","Eleanor","Juliana","Annabelle","Emilia","Sadie","Bella","Julia","Keira","Bailey","Hazel","Jocelyn","London","Samantha","Vivian","Gianna","Alexandra","Cora","Melanie","Everly","Jordyn","Luna"];


var maleNameList = ["Jackson","Aiden","Lucas","Liam","Noah","Ethan","Mason","Caden","Oliver","Elijah","Grayson","Jacob","Michael","Benjamin","Carter","James","Jayden","Logan","Alexander","Caleb","Ryan","Luke","Daniel","Jack","William","Owen","Gabriel","Matthew","Connor","Jayce","Isaac","Sebastian","Henry","Muhammad","Cameron","Wyatt","Dylan","Nathan","Nicholas","Julian","Eli","Levi","Isaiah","Landon","David","Christian","Andrew","Brayden","John","Lincoln","Samuel","Joseph","Hunter","Joshua","Mateo","Dominic","Adam","Leo","Ian","Josiah","Anthony","Colton","Max","Thomas","Evan","Nolan","Aaron","Carson","Christopher","Hudson","Cooper","Adrian","Jonathan","Jason","Charlie","Miles","Jeremiah","Gavin","Asher","Austin","Ezra","Chase","Alex","Xavier","Jordan","Tristan","Easton","Zachary","Parker","Bryson","Tyler","Camden","Damian","Declan","Elliot","Elias","Cole","Harrison","Zane","Kai"];

function getRndName(gender){
	
	var rtrname = '';
	var index = 0;
	
	if (gender == 'male'){
		index = Math.floor(Math.random() * maleNameList.length);
		rtrname = maleNameList[index];
		
	}else{
		index = Math.floor(Math.random() * femaleNameList.length);
		rtrname = femaleNameList[index];
	}
	
	
	return rtrname;
}