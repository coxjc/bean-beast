import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from "prop-types";
import { textLink, marginBottom, cardGray } from '../../common/Styles';
import colors from '../../../constants/Colors';
import {FieldArray} from "redux-form";
import * as styles from "../../common/reduxForm/Styles";

export default class RecipeSteps extends Component {
  render() {
    return (
      <View style={cardGray}>
        <Text style={{ marginBottom: 15 }}>Recipe Steps:</Text>
        <FieldArray name="recipe_steps" component={this.renderRecipes} parentProps={this.props} />
      </View>
    );
  }

  renderRecipes = ({ fields, meta: { touched, error, submitFailed }, parentProps }) => {
    // const { recipeSteps } = parentProps.recipeSteps;
    // const recipeStepsArray = _.toArray(recipeSteps);
    return (
      <View>
        {touched &&
        ((error && <Text style={styles.errorText}>{error}</Text>) ||
          (warning && <Text style={styles.warningText}>{warning}</Text>))}

        {fields.map((recipe, index) => {
          const thisRecipeValues = parentProps.formValues.EditRecipeForm.values.recipe_steps[index];
          return this._renderItem(recipe, index, fields, thisRecipeValues, parentProps);
        })}
      </View>
    );
  };

  _renderItem = (item, index, fields, itemValues, parentProps) => {
    const id = itemValues.field_id;
    const { recipeSteps } = parentProps.recipeSteps;
    const thisRecipeStepField = _.size(recipeSteps) && recipeSteps[id] ? recipeSteps[id] : null;
    if(thisRecipeStepField) {
      return (
        <View key={index} style={{...marginBottom, padding: 10, backgroundColor: '#eee'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{padding: 5, marginRight: 10}} onPress={() => {
            }}>
              <Icon name="arrows" size={16}/>
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Text>{thisRecipeStepField.name}</Text>
              {/*{this._beanName(itemValues, index)}*/}
              {/*{this._beanSubtitle(itemValues)}*/}
            </View>
            <TouchableOpacity style={{padding: 5, marginRight: 10}} onPress={() => this.props.editStep(thisRecipeStepField, index)}>
              <Text style={textLink}><Icon name="pencil" size={16}/> Edit</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity style={{ padding: 5, paddingRight: 10 }} onPress={() => this.props.array.remove('beans', null, 0 )}>*/}
            <TouchableOpacity style={{padding: 5, paddingRight: 10}} onPress={() => fields.remove(index)}>
              <Icon name="close" size={18} style={{color: colors.colorDanger}}/>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };
}

RecipeSteps.propTypes = {
  editStep: PropTypes.func.isRequired
};
