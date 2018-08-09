import React from "react";
import Layout from "../../../components/Layout";
import { Link }  from "../../../routes";
import { Button, Table } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";

class RequestIndex extends React.Component{

    static async getInitialProps(props){
        console.log("hey");

        const { address } = props.query;

        const campaign = Campaign(address);
        const requestsCount = await campaign.methods.getRequestCount().call();

        const requests = await Promise.all(
            Array(requestsCount).fill().map((Element, index)=>{
                return campaign.methods.requests(index).call();
            })
        );

        return { address, requests, requestsCount };
    }

    render(){
        const { Header, Row, HeaderCell, Body } = Table;

        return(
            <Layout>
                <h3>Request List</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Requests</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>ApprovalCount</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                </Table>
            </Layout>
        );
    }
};

export default RequestIndex;