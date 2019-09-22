import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField } from "../../../common/reduxForm";
import RecipeSteps from "../../recipeSteps/RecipeSteps";
import PropTypes from "prop-types";

class PreInfusionField extends Component {
  render() {
    return (
      <View>
        <Text>You are currently looking at the Pre-Infusion field.</Text>
        <TextField
          // name="recipe_steps[0].values.length"
          name={`recipe_steps[${this.props.stepFieldIndex}].values.length`}
          label="Pre-Infusion Length"
          // validate={[required]}
        />
        <TextField
          // name="recipe_steps[0].values.pressure"
          name={`recipe_steps[${this.props.stepFieldIndex}].values.pressure`}
          label="Pressure (in bar)"
          // validate={[required]}
        />
      </View>
    );
  }
}

export default PreInfusionField;

PreInfusionField.propTypes = {
  stepFieldIndex: PropTypes.number.isRequired
};