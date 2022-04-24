export const Data={
    title: "מחרוזות ומערכים",
    writer:"הדר זגורי, יועץ תכנות",
    time:"24.4.22",
    Intro: [{
        Main:"אז נתחיל בהקדמה מהו מערך?",
        Info:"מערך (Array) הוא אחד ממבני הנתונים הפשוטים ביותר: מערך הוא אוסף פריטים שניתן לגשת אליהם בצורה ישירה באמצעות אינדקס.",
        ActualData:`var myArray = [Object1,Object2 ,Object3 ,Object4];`,
        code:`<p>var myArray = [Object1,Object2 ,Object3 ,Object4];</p>`
    },{
        Main:"פעולת splice",
        Info: "כדי למחוק פריט ממערך משתמשים ב-splice עם שני ארגומנטים, ארגומנט ראשון שמציין את אינדקס הפריט הראשון שצריך למחוק מהמערך.",
        ActualData: `var fruits = ["Banana","Oragne","Apple","Mango"]; \n fruits.splice(0,1);`,
        code:`<p>var fruits = ["Banana","Oragne","Apple","Mango"]; <br/> fruits.splice(0,1);</p>`
    },{
        Main:"ומה עם מחרוזות?",
        Info:"מחרוזת היא רצף של סימנים מתוך אלפבית נתון. בשפות תכנות מחרוזת היא טיפוס נתונים המכיל רצף של תווים. ניתן להגדיר על מחרוזות המון פעולות כמו toUpperCase, length",
        ActualData: `var txt = "ABCDEFGHIGHIKLMNOPQRSTUVWXYZ \n var length = txt.length; \n var text1 = "Hello World"; \n var text2 = text1.toUpperCase();`,
        code:`<p>var txt = "ABCDEFGHIGHIKLMNOPQRSTUVWXYZ<br/> var length = txt.length; <br> var text1 = "Hello World"; <br> var text2 = text1.toUpperCase();`
     }
]
    
}