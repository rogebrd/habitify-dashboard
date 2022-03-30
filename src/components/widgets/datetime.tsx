import { FunctionComponent } from "react"
import { Card } from "../common/card"

type DatetimeWidgetProps = {

}

export const DatetimeWidget: FunctionComponent<DatetimeWidgetProps> = ({}) => {

    const getDate = () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const currentDate = new Date(Date.now());
        return `${days[currentDate.getDay()]}, ${months[currentDate.getMonth()]} ${currentDate.getDate()}`;
    }
    
    const getTime = () => {
        const currentDate = new Date(Date.now());
        return `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    }
    
    return (
        <Card>
            {getDate()}
            {getTime()}
        </Card>
    )
}