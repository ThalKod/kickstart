import React from "react";
import Layout from "../../../components/Layout";
import { Link }  from "../../../routes";
import { Button, Table } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";
import { request } from "http";

class RequestIndex extends React.Component{

    static async getInitialProps(props){

        const { address } = props.query;

        const campaign = Campaign(address);
        const requestsCount = await campaign.methods.getRequestCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        async function fetchRequest(index) {
            const aRequest = await campaign.methods.requests(index).call();
            requests.push(aRequest);
        };

        const requests = [];

        for(let i =0; i < requestsCount; i++){
            await fetchRequest(i);
        }

        // const requests = await Promise.all(
        //     // Array(requestsCount).fill().map((Element, index)=>{
        //     //     console.log(index);
        //     //     return campaign.methods.requests(index).call();
        //     // })
        // );

        return { address, requests, requestsCount, approversCount };
    }

    renderRow(){
        return this.props.requests.map((request, index)=>{
            return <RequestRow request={request} key={index} id={index} address={this.props.address} approversCount={this.props.approversCount} />;
        });
    };

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
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>
            </Layout>
        );
    }
};

export default RequestIndex;