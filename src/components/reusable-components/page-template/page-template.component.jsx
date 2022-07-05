import { PageContainer } from "./page-template.styles"

const Page = ({children}) => {
    return (
        <PageContainer >
            {children}
        </PageContainer>
    )
}

export default Page