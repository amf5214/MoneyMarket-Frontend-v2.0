export const API_FORMAT = "YYYY-MM-DD";
export const US_FORMAT = "MM-DD-YYYY";


const convertMonth = (month:number, offset:number) => {
    month += offset;
    if(month < 10) {
        return ("0" + month);
     } else {
         return String(month);
     }
}

const convertDay = (day:number) => {
    if(day < 10) {
       return ("0" + day);
    } else {
        return String(day);
    }
}

const convertMinute = (minute:number) => {
    if(minute < 10) {
       return ("0" + minute);
    } else {
        return String(minute);
    }
}

const convertHour = (hour:number) => {
    if(hour < 10) {
       return ("0" + hour);
    } else {
        return String(hour);
    }
}

export const formatDateString = (date:Date, format:string, seperator:string, monthOffset?:number) => {
    if(monthOffset == null) {
        monthOffset = 0;
    }
    let month:number = date.getMonth();
    let day:number = date.getDate();
    let year:number = date.getFullYear();
    let finalString = "";
    
    let formatString = format.split("-");
    for(let i:number = 0; i < formatString.length; i++) {
        const str = formatString[i];
        if(str.toLowerCase() == "mm") {
            finalString += convertMonth(month, monthOffset);
        } else if(str.toLowerCase() == "dd") {
            finalString += convertDay(day);
        } else if(str.toLowerCase() == "yyyy") {
            finalString += String(year);
        } else {
            return "";
        }
        if(i < 2) {
            finalString += seperator;
        }
    }
    
    return finalString;
}

export const formatDateTimeString = (date:Date) => {
    return convertMonth(date.getMonth(), 1) + '/' + convertDay(date.getDate()) + '/' + date.getFullYear() + ' ' + convertHour(date.getHours()) + ':' + convertMinute(date.getMinutes())
}