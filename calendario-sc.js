
var begTags = "<center><H2><font size=\"2\" face=\"Verdana\">";


// html code for end of the month
var endTags = "</TR></TBODY></TABLE><br>";

var monthName = "somemonth";
var yearName = "someyear";
var numberOfDays = 0;       // days in the month
var postDay = 0;            // day of the week the day after the last day of the month falls on (mod 7)
var numBlankDays = 0;       // number of "blank" days at the start of the month
var cellsHTML = "";         // HTML string
var generator;

// Constant array of month names
var months=new Array;
months[1] = "January";
months[2] = "February";
months[3] = "March";
months[4] = "April";
months[5] = "May";
months[6] = "June";
months[7] = "July";
months[8] = "August";
months[9] = "September";
months[10] = "October";
months[11] = "November";
months[12] = "December";

// Constant array of days of the week
var daysOfWeekLong = new Array;
daysOfWeekLong[1] = "Sunday";
daysOfWeekLong[2] = "Monday";
daysOfWeekLong[3] = "Tuesday";
daysOfWeekLong[4] = "Wednesday";
daysOfWeekLong[5] = "Thursday";
daysOfWeekLong[6] = "Friday";
daysOfWeekLong[7] = "Saturday";
daysOfWeekLong[8] = "Sunday";
var daysOfWeekShort = new Array;
daysOfWeekShort[1] = "Sun";
daysOfWeekShort[2] = "Mon";
daysOfWeekShort[3] = "Tues";
daysOfWeekShort[4] = "Wed";
daysOfWeekShort[5] = "Thur";
daysOfWeekShort[6] = "Fri";
daysOfWeekShort[7] = "Sat";
daysOfWeekShort[8] = "Sun";

// Build the row that contains the day names
function columnHeaders()
{
    var result = "";
    var weekStart = document.CalendarSettings.WeekStart.value;

    var weekHead2 = "</font></H2></center><TABLE width=\"100%\" border=1 bordercolordark=\"#000000\" bordercolorlight=\"#FFFFFF\" cellpadding=\"5\">" + "\n" + "<TBODY><TR>";

    var weekHead3 = "<TH valign=center align=middle width=\"14%\" bgcolor=\"#000000\"><font size=\"1\" color=\"#FFFFFF\" face=\"Verdana\">"+"\n";
    var weekHead4 = "</font></TH>";

        result += weekHead2;
        var currday;
		for(var day = 1; day <= 7; day++)
        {
            result += weekHead3;
            currday = day + (weekStart - 1);
            // determine whether to use long or short day names
        	if (document.CalendarSettings.names[1].checked)
            {
                result += daysOfWeekShort[currday];
            }
            else
            {
                result += daysOfWeekLong[currday];
            }

            result += weekHead4;
        }
        result += "</TR><TR>";
    return result;
}

// Determine the number of days in the month and the starting/ending dates
function createMonth(inputMonth, inputYear, inputDay)
{
        var leapYear = false;
		monthName = months[inputMonth];
        yearName = inputYear.toString();
		cellsHTML = "";
        numBlankDays = inputDay;
		//figure out if the year is a leap year
		if(inputYear%4 == 0)
		{
		   	if(inputYear%100 != 0)
  			{
				leapYear = true;
			}
			else
			{
				if(inputYear%400 == 0)
					leapYear = true;
				else
					leapYear = false;
			}
		}


		//figure out the number of days in the month
		//if month is NOT february, april, june, september, nor november then it has 31 days
		if(inputMonth != 2 && inputMonth  != 4 && inputMonth != 6 && inputMonth != 9 && inputMonth != 11)
		{
			numberOfDays = 31;
		}
		else
		{
			//if month is NOT february, then it has 30 days
			if(inputMonth != 2)
			{
				numberOfDays = 30;
			}
			else
			{
				//if month is a leap year, then it has 29 days. if not, it has 28
				if(leapYear)
				{
					numberOfDays = 29;
				}
				else
				{
					numberOfDays = 28;
				}
			}
		}

		postDay = (numberOfDays + numBlankDays) % 7;  // day after end of month
}

// produce the HTML code for a month calendar
function getMonth()
{
        // determine which font size to use for dates.
        var fontsize=1;
		if (document.CalendarSettings.fontsize[0].checked) fontsize=1;
		if (document.CalendarSettings.fontsize[1].checked) fontsize=3;
		if (document.CalendarSettings.fontsize[2].checked) fontsize=5;
		if (document.CalendarSettings.fontsize[3].checked) fontsize=7;

		//integer to keep track of how many days were added to the month in the html string
		cellCount = 0;

		//prints out blank cells needed to start off month calendar
		for(var blanks = 0; blanks < numBlankDays; blanks++)
		{
				cellsHTML = cellsHTML + "<TD vAlign=top align=left width=\"14%\" >&nbsp;<br><br><br><br></TD>";
                cellsHTML += "\n";
				cellCount++;
		}

		//prints out cells for each day of the month
		for(var days = 1; days <= numberOfDays; days++)
		{
			cellsHTML = cellsHTML + "<TD vAlign=top align=left width=\"14%\" ><font size=\""+fontsize+"\" face=\"Verdana\">" +days +"</font><br><br><br><br></TD>";
            cellsHTML += "\n";
    		cellCount++;
			if(cellCount % 7 == 0)
			{
				cellsHTML = cellsHTML + "</tr><tr>";
                cellsHTML += "\n";
			}
		}

		//prints out blank cells needed to end off month calendar
		while (cellCount % 7 != 0)
		{
			cellsHTML = cellsHTML + "<TD vAlign=top align=left width=\"14%\" >&nbsp;<br><br></TD>";
            cellsHTML += "\n";
    		cellCount++;
		}

		//returns full html code for the month
		return begTags + monthName + " " + yearName + "\n" + columnHeaders() + "\n" + cellsHTML + endTags;
}

// Show the complete calendar in a popup window
function showCalendar()
{
		var currentMonth = document.CalendarSettings.Month.value;
		var currentYear = document.CalendarSettings.Year.value;
        // See if user provided a custom year input
        if (document.CalendarSettings.SpecialYear.value != "")
        {
            special = document.CalendarSettings.SpecialYear.value;
            if (special < 1 || special > 9999)
            {
                alert ("Year not in range 1 - 9999, using year 2000.");
                special = 2000;
            }
            currentYear = special.toString();
        }
      // Use Date function to return starting day of week for the month
      // Note that Date uses base zero numbering for month and day.
      var startDate = new Date(currentYear, currentMonth-1, 1);
      var startDay = startDate.getDay();
      if (document.CalendarSettings.WeekStart.value == 2)
      {
      		startDay = (startDate.getDay() - 1);
            if (startDay == -1) startDay = 6;
      }
	  var monthLimit = document.CalendarSettings.numMonths.value;

        generator=window.open("","name","height=450,width=700,resizable=1,scrollbars=1,menubar=1");

        generator.document.write("<html><head><title>Calendar"+currentYear);
        generator.document.write("</title>");
        generator.document.write("</head><body onload='window.focus();'>");
        generator.document.write("\n");

        //Iterate for as many months as user desires.
		for(var index = 0; index < monthLimit; index++)
		{
            createMonth( currentMonth, currentYear, startDay);
            generator.document.write(getMonth());
            generator.document.write("\n");
            // Increment year if it's December
    		if(currentMonth == 12 )
			{
				currentYear++;
			}
			currentMonth = currentMonth%12 + 1;
            // post day of this month becomes start day of next month
            startDay = postDay;
		}

        generator.document.write("<center><font size=1>generated by ");
        generator.document.write("<a href=\"http://www.calpoly.edu/~jdalbey/CalendarMaker.html\">HTML Calendar Maker 1.1.</a> Copyright (C) 2009 John Dalbey.</font>");
        generator.document.write("</center>");
        generator.document.write("</body></html>");
        generator.document.close();
}

// Form reset
function reset()
{
		document.CalendarSettings.Month.value = 1;
		document.CalendarSettings.Year.value = 2008;
		document.CalendarSettings.SpecialYear.value = "";
		document.CalendarSettings.Day.value = 1;
		document.CalendarSettings.numMonths.value = 1;
}

function referenceCalendar()
{
window.open("http://www.vrtisworks.com/kiki/fun/minical.htm","newWindow","toolbar=no,width=300,height=400,directories=no,status=no,scrollbars=yes,resize=yes,menubar=no")
}
</script></h
