const getPeriod = (hour, min) => {
    const time = parseInt(`${hour}${min.toString().length === 1 ? `0${min}` : min}`)
    let period = null

    if (time >= 830 && time < 930) {
        return period = "p1"
    }
    else if (time >= 930 && time < 1030) {
        return period = "p2"
    }
    else if (time >= 1030 && time < 1130) {
        return period = "p3"
    }
    else if (time >= 1130 && time < 1230) {
        return period = "p4"
    }
    else if (time >= 1230 && time < 1330) {
        return period = "p5"
    }
    else if (time >= 1330 && time < 1430) {
        return period = "p6"
    }
    else if (time >= 1430 && time < 1530) {
        return period = "p7"
    }
    else if (time >= 1530 && time < 1630) {
        return period = "p8"
    } else {
        return period = 0
    }

}

export default getPeriod