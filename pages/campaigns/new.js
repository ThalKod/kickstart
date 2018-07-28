import React from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class CampaignNew extends React.Component {
    state = {
        minimumContribution: "",
        error: "",
        loading: false
    };

    onContributionChange = (e)=>{
        const contribution = e.target.value;

        this.setState(()=>{
            return {
                minimumContribution: contribution
            }
        });
    }

    onFormSubmit = async (e)=>{
        e.preventDefault();

        this.setState({ loading: true, error: "" });

        try{
            const accounts = await web3.eth.getAccounts();    
            await factory.methods
                    .createCampaign(this.state.minimumContribution)
                    .send({
                        from: accounts[0]
                    });
        }catch(err){
            this.setState({ error: err.message });
        }

        this.setState({ loading: false });
    };


    render(){
        return (
            <Layout>
                <h3>Create a Campaign</h3>

                <Form onSubmit={this.onFormSubmit} error={!!this.state.error}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input  
                            label="wei" 
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={this.onContributionChange}
                        />
                    </Form.Field>

                    <Button loading={this.state.loading} primary>Create !</Button>
                
                    <Message error header="Oops !" content={this.state.error}  /> 
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;