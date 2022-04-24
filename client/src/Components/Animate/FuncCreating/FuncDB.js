export const Data={
    title: "פונקציות",
    writer:"הדר זגורי, יועץ תכנות",
    time:"24.4.22",
    Intro: [{
        Main:"מהי פונקציה",
        Info:"רצף של פקודות המאוגדות יחדיו, במטרה לבצע מטלה מוגדרת, מימוש של אלגוריתם.",
        ActualData:`function createListeners(){\n // some commands \n} \n createListeners();`,
        code:`<p>function createListeners() { <br/> // some commands <br/> } <br/> createListeners();</p>`
    },{
        Main:"פונקציה (לא מקבלת ערך)",
        Info: "פונקציה לא מקבלת ערך היא פונקציה שלא מקבלת פרמטרים כמו בדוגמה הבאה",
        ActualData: `function HelloWorld(){ \n console.log("Hello welcome צוותי הפלא"); \n}`,
        code:`<p>function HelloWorld() { <br/> console.log("Hello welcome צוותי הפלא"); <br/> }</p>`
    },{
        Main:"פונקציה (מקבלת ערך)",
        Info:"פונקציה שמקבלת ערך מקבלת כפרמטר משתנה כלשהו וניתן לבצע שימוש בו בפונקציה",
        ActualData: `function clickFunc(who){\n console.log(who.name) \n who.gotoAndStop(1);\n } \n clickFunc() // call the func`,
        code:`<p>function clickFunc(who) { <br/> console.log(who.name); <br/> who.gotoAndStop(1); <br/> } <br/> clickFunc(); // call the func</p>`
     },
     {
        Main:"פונקציה (מקבלת ערך ומחזירה ערך)",
        Info:"פונקציה שמקבלת ערך מקבלת כפרמטר משתנה כלשהו ומחזירה ערך אחר (יתכן אחרי חישוב כלשהו)",
        ActualData: `var x = myFunction(4,3) \n function myFunction(a,b){ \n return a*b \n}`,
        code:`<p>var x = myFunction(4,3) <br/> function myFunction(a,b){ <br/> reutnr a*b </br>}</p>`
     },
     {
        Main:"פונקציה שנקראת על ידי אירוע",
        Info:`קריאה לפונקציה בעת האזנה לכפתור. האזנה ללחיצת הכפתור כמו בדוגמה הבאה:` ,       
        ActualData: `this.mc1.addEventListener("click",f1_MouseClickHandler.bind(this)); \n function f1_MouseClickHandler(){ \n this.mc1.gotoAndStop(1); \n}`,
        code:`<p>this.mc1.addEventListener("click",f1_MouseClickHandler.bind(this)); <br/> <br/> function f1_MouseClickHandler(){ <br/> this.mc1.gotoAndStop(1); <br/>}</p>`
     },
     {
        Main:"פונקציה אנונימית ",
        Info:`פונקציה אנונימית הינה פונקציה שנקראת מבלי הצורך לתת לה שם בצורה הבאה:` ,       
        ActualData: `this.mc1.on("click",function(e){ \n this.mc1.gotoAndStop(1); \n}`,
        code:`<p>this.mc1.on("click",function(e){ <br/> this.mc1.gotoAndStop(1); <br/>}</p>`
     }
]
    
}