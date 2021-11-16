var mainDiv;
var characterLevel;
var selectedRace;

var startingClass;
var numClasses;
var classLevels;
var unspentLevels;

function init() {
	document.getElementById("cLevel").value = -1;
	characterLevel = -1;
	
	document.getElementById("race").value = -1;
	selectedRace = -1;
	
	document.getElementById("startClass").value = -1;
	document.getElementById("class2").value = -1;
	startingClass = -1;
	numClasses = 2;
	classLevels = [1,1,0,0,0];
	unspentLevels = -1;
	document.getElementById("startClassLevels").style.visibility = "hidden";
	document.getElementById("removeClassButton").disabled = true;
	
	document.getElementById("multiclassing").checked = false;
}

function cLevelUpdate() {
	characterLevel = document.getElementById("cLevel").value;
	
	document.getElementById("cLevelInfo").style.display = "block";
	document.getElementById("cLevelInfo").innerHTML = "<p>If you are new to D&D 5e or character creation in general, select <strong>Level 1</strong>. If you are an experienced player you may choose to start at <strong>Level 1</strong> or <strong>Level 3</strong>.<p>&#x200b;<p>A new character may only start at <strong>Level 5</strong> if the player's previous character died or retired at level 11 or higher.";
	
	if(characterLevel < 3) {
		document.getElementById("multiclassing").checked = false;
		onMCChange();
		document.getElementById("mcLabel").disabled = true;
	}
	
	if(characterLevel > 0) {
		unspentLevels = characterLevel - classLevels[0] + classLevels[1] + classLevels[2] + classLevels[3] + classLevels[4];
		if(characterLevel > 1)
			document.getElementById("mcLabel").disabled = false;
			
		if(characterLevel == 5)
			document.getElementById("cLevelInfo").innerHTML = "<p><strong>Reminder:</strong> A new character may only start at <strong>Level 5</strong> if the player's previous character died or retired at level 11 or higher.";
	}
}

function onMCChange() {
	if(document.getElementById("multiclassing").checked) {
		document.getElementById("startClassLabel").innerHTML = "Starting Class / Levels: ";
		document.getElementById("startClassLevels").style.visibility = "visible";
		document.getElementById("extraClasses").style.display = "block";
	}
	else {
		document.getElementById("startClassLabel").innerHTML = "Class: ";
		document.getElementById("startClassLevels").style.visibility = "hidden";
		document.getElementById("extraClasses").style.display = "none";
	}
}

function addClass() {
	classLevels[numClasses]++;
	var newClass = document.createElement("div");
	newClass.innerHTML = "Class / Levels: <select id='class" + (numClasses + 1) + "'>" +
					"<option value=-1>Select</option>" +
					"<option value=1>Artificer</option>" +
					"<option value=2>Barbarian</option>" +
					"<option value=3>Bard</option>" +
					"<option value=4>Cleric</option>" +
					"<option value=5>Druid</option>" +
					"<option value=6>Fighter</option>" +
					"<option value=7>Monk</option>" +
					"<option value=8>Paladin</option>" +
					"<option value=9>Ranger</option>" +
					"<option value=10>Rogue</option>" +
					"<option value=11>Sorcerer</option>" +
					"<option value=12>Warlock</option>" +
					"<option value=13>Wizard</option>" +
				"</select><label id='class" + (numClasses + 1) + "Levels'> / <a href='#' id='class2LeftArrow' class='arrow' onclick='removeClassLevel(" + (numClasses + 1) + ")'>&#8249;</a> " + classLevels[numClasses] + " <a href='#' id='class2RightArrow' class='arrow' onclick='addClassLevel(" + (numClasses + 1) + ")'>&#8250;</a></label>";
	document.getElementById("extraClasses").insertBefore(newClass, document.getElementById("extraClasses").childNodes[numClasses]);
	numClasses++;
	document.getElementById("removeClassButton").disabled = false;
	if(numClasses >= characterLevel)
		document.getElementById("addClassButton").disabled = true;
}

function removeClass() {
	document.getElementById("extraClasses").removeChild(document.getElementById("extraClasses").childNodes[numClasses - 1]);
	numClasses--;
	classLevels[numClasses] = 0;
	
	document.getElementById("addClassButton").disabled = false;
	if(numClasses <= 2)
		document.getElementById("removeClassButton").disabled = true;
}

window.onload=init;