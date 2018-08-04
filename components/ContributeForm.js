import React from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends React.Component{

    state = {
        value: "",
        error: "",
        loading: false,
        success: false
    };

    onChange = (e)=>{
        this.setState({ value: e.target.value });
    }

    onSubmit = async (e)=>{
        e.preventDefault();

        const campaign = Campaign(this.props.address);

        this.setState({ loading: true, error: "", success: false });

        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, "ether")
            });

            Router.replaceRoute(`/campaigns/${this.props.address}`);

            this.setState({ success: true });
        }catch(e){
            this.setState({ error: e.message });
        }

        this.setState({ loading: false, value: ""});
    }

    render(){
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.error}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input value={this.state.value} onChange={this.onChange} label="ether" labelPosition="right"/>
                </Form.Field>
                <Button loading={this.state.loading} primary> Contribute </Button>
                <Message error header="Error" content={this.state.error} />
                {this.state.success && <Message positive  header="Success" content={`Succefully contributed to ${this.props.address} `} />}
            </Form>
        )
    }
};

export default ContributeForm;