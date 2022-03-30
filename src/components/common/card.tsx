import { Container } from "@material-ui/core"
import { FunctionComponent } from "react"

type CardProps = {
    className?: string;
}

export const Card: FunctionComponent<CardProps> = ({ className, children }) => {
    return (
        <Container className="card">
            <div className={`card--holder ${className ? className : ''}`}>
                {children}
            </div>
        </Container>
    )
}