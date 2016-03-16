export function hasClass(ele,cls) {
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
 
export function addClass(ele,cls) {
  if (!hasClass(ele,cls)) ele.className += " "+cls;
}
 
export function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
  }
}

export function preNextMonth(year, month) {
          var pre = {
              year: preDay(year, month).year,
              month: preDay(year, month).month
          };
          var next = {
              year: nextDay(year, month).year,
              month: nextDay(year, month).month
          };
          var current = {
              year: year,
              month: month
          };
          return {
              pre: pre,
              next: next,
              current: current
          }

          function preDay(year, month) {
              if (month === 1) {
                  year = year - 1;
                  month = 12;
              } else {
                  month = month - 1;
              }
              return {
                  year: year,
                  month: month
              }
          }

          function nextDay(year, month) {
              if (month === 12) {
                  year = year + 1;
                  month = 1;
              } else {
                  month = month + 1;
              }
              return {
                  year: year,
                  month: month
              }
          }
}

export  function getDayWeek(year, month) {
              if (month < 10) {
                month = '0' + month;
              }
              if(month == '00' ) {
                  return new Date(year, 0,1).getDay();
              }
              else {
                var currentMonthFirstDay = year + '-' + month + '-01';
                return new Date(currentMonthFirstDay).getDay();
              }
}
export function getMonthDay(year, month) {
                            var days;
                            // 当月份为二月时， 根据闰年还是非闰年判断天数
                            if (month == 2) {

                                days = year % 4 == 0 ? 29 : 28;
                            } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                                //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
                                days = 31;
                            } else {
                                //其他月份，天数为：30.
                                days = 30;

                            }
                            return days;
}      
    