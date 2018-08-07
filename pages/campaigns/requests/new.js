import React from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

class RequestNew extends React.Component {

    state = {
        value: "",
        description: "",
        recipient: "",
        loading: false,
        error: ""
    };


    static async getInitialProps(props){
        const { address } = props.query;

        return { address };
    }

    onSubmit =   async (e)=>{
        e.preventDefault();
        
        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;
        
        this.setState({ loading: true, error: "" });

        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description, web3.utils.toWei(value, "ether"), recipient).send({ from: accounts[0] });

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        }catch(e){
            this.setState({ error: e.message });
        };

        this.setState({ loading: false });
    };

    render(){
        return(
            <Layout>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.error}>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={this.state.description} 
                            onChange={e => this.setState({ description: e.target.value })} 
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value</label>
                        <Input 
                            value={this.state.value}
                            onChange={e => this.setState({ value: e.target.value })} 
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input 
                            value={this.state.recipient}
                            onChange={e => this.setState({ recipient: e.target.value })} 
                        />
                    </Form.Field>

                    <Button primary loading={this.state.loading}>Create</Button>
                    <Message error header="Error" content={this.state.error} />
                </Form>
            </Layout>

        );
    }
};

export default RequestNew;