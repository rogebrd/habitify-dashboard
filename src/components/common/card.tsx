import { Container } from "@material-ui/core"
import { FunctionComponent } from "react"

export const Card: FunctionComponent = ({ children }) => {
    return (
        <Container className="card">
            <div className="card--holder">
                {children}
            </div>
        </Container>
    )
}