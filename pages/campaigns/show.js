import React from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card, Grid } from "../../node_modules/semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";

class CampaignShow extends React.Component {

    static async getInitialProps(props){
        
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummarry().call();
        
        return { 
            minimumContribution: summary["0"],
            balance: summary["1"],
            requestCount: summary["2"],
            approversCount: summary["3"],
            manager: summary["4"]
         };
    }

    renderCards(){

        const { balance, manager, minimumContribution, approversCount, requestCount } = this.props;

        const items = [
            {
                header: manager,
                meta: "Address of Manager",
                description: "The Manager created this campaign and can create requests to withdraw money",
                style: { overflowWrap: "break-word" }
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution(wei)",
                description: "You must contribute at least this much wei to be a approver "
            },
            {
                header: requestCount,
                meta: "Number of Requests",
                description: " A requests tries to withdraw money from the contract. Request must be approved by approver."
            },
            {
                header: approversCount,
                meta: "Number of Approvers",
                description: "Number of people who already donate to the campaign "
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign Balance (ETH)",
                description: "The Balance is how much money this campaign has left to spend "
            }
        ];

        return <Card.Group items={items} />
    }

    render(){
        return (
            <Layout>
                <h3>Campaign Details</h3>
                <Grid>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <ContributeForm />
                    </Grid.Column>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;