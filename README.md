# Timetabling

A basic timetabling system built upon AngularJS and SASS for presenting user availability and dates

## Overview

- Has been tested only in 'mdoern browsers'
- Not 100% mobile/tablet/small device optimised

## Requirements

✓ __The user should be able to mark time as “Present”, “Vacation”, “Public Holiday”, “Training”__ 'Present' is assumed default.

 __All categories other than “Present” are classified as Absent__

✓ __Weekends should be ignored by the system (not displayed and no classification should be given)__

✓ __The system should work on units of half days__ Each item added is added as either AM or PM. This is denoted through colours defined in the colour key. At the time of writing, blue denotes AM and pink denotes PM. 

__The default for days should be “Present” other than Public Holidays__


__Public Holidays should be defaulted to “Public Holiday” however should be able to be changed to any of the other categories__

✓ __The user should be able to see the records for other team members as they make their selections__ Can be seen and removed/added through the panel on the left

✓ __The interface should be designed to be able to deal with projects with up to 40 people__

✓ __The interface should highlight clashes with other users.__ This is denoted by a red mark to the right of the event

✓ __The interface should deal with a period of up to 12 months in the future__

✓ __It is not required that all 12 months must be shown at the same time and the interface should be optimised for the most common use case (Vacation and training to be added within the next 3 months)__ 1 month shown at a time, this was assumed optimal for screen sizings etc.

# Requirements questions

I am assuming that a clash is assumed if there is another booking (of any kind, from any user, including themselves) within 4 days of any given booking. 

Are duplicates allowed, should i validate this? 

Do you want to allow a user to select dates that cause clashes? By my definition nearly all sample data causes clashes. 
