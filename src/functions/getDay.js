const getDay = () => {
    const date = new Date();
    let day = date.getDay()
    let dayString;
    switch (day) {
        case 2:
            dayString = "tues";
            break;
        case 3:
            dayString = "wed";
            break;
        case 4:
            dayString = "thurs";
            break;
        case 5:
            dayString = "fri";
            break;
        default:
            dayString = "mon";
            day = 1
            break;
    }

    return { dayCode: day, day: dayString }

}

export default getDay