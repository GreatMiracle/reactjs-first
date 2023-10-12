import moment from "moment";

const getDateInRegualarFormat = (date) => {
    let result = "";

    //if date is today  => return today
    if (moment(date).isSame(moment(), "day")) {
        result = `Today ${moment(date).format("hh:mm A")}`;
    }
    else if (moment(date).isSame(moment().subtract(1, "day"), "day")) {
        result = `Yesterday ${moment(date).format("hh:mm A")}`;
    }
    else if (moment(date).isSame(moment(), "year")) {
        result = moment(date).format("MMM DD hh:mm A");
    }

    return result;

}

export default getDateInRegualarFormat;