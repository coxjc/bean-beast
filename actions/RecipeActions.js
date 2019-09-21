import { showMessage, hideMessage } from "react-native-flash-message";
import * as types from '../constants/types';
import * as navRoutes from '../constants/NavRoutes';
import { throwError, generateRandomID } from "../helpers";
// import { NavigationActions, StackActions } from "react-navigation";

export const saveRecipe = (values) => {
  if(values.type === 'create'){
    return _createRecipe(values);
  }
  else if(values.type === 'edit'){
    return _updateRecipe(values);
  }
};

const _createRecipe = (values) => {
  const id = generateRandomID('recipe');
  return (dispatch) => {
    _creatingRecipe(dispatch, values, id)
      .then(() => {
        dispatch({
          type: types.RECIPE_CREATE_SUCCESS,
          payload: id,
        });
        values.navigation.goBack();
      })
      .catch(error => {
        dispatch({
          type: types.RECIPE_CREATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/RecipeActions.js', '_createRecipe');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error creating the recipe.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _creatingRecipe = (dispatch, values, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.RECIPE_CREATING,
    payload: {
      id,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

const _updateRecipe = (values) => {
  return (dispatch) => {
    _updatingRecipe(dispatch, values)
      .then(() => {
        dispatch({
          type: types.RECIPE_UPDATE_SUCCESS,
        });
        values.navigation.goBack();
      })
      .catch(error => {
        dispatch({
          type: types.RECIPE_UPDATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/RecipeActions.js', '_updateRecipe');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error updating the recipe.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _updatingRecipe = (dispatch, values) => new Promise((resolve, reject) => {
  dispatch({
    type: types.RECIPE_UPDATING,
    payload: {
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

//* I got this working by calling `navigation.dispatch(resetAction)` in the deleteRecipe function below, but I don't currently need it.
// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({
//       routeName: 'Main',
//       action: NavigationActions.navigate({ routeName: navRoutes.RECIPE_LIST }),
//     }),
//   ],
// });

export const deleteRecipe = (id, navigation) => {
  return (dispatch) => {
    _deletingRecipe(dispatch, id)
      .then(() => {
        dispatch({
          type: types.RECIPE_DELETE_SUCCESS,
        });
        navigation.navigate({
          routeName: navRoutes.RECIPE_LIST
        });
      })
      .catch(error => {
        dispatch({
          type: types.RECIPE_DELETE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/RecipeActions.js', 'deleteRecipe');
        navigation.navigate({
          routeName: navRoutes.RECIPE_LIST
        });
        showMessage({
          message: "Error",
          description: "There was an error deleting the recipe.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _deletingRecipe = (dispatch, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.RECIPE_DELETING,
    payload: id
  });
  resolve();
});

export const createRecipe = () => {
  return {
    type: types.RECIPE_CREATE
  };
};

export const editRecipe = (recipeData) => {
  return {
    type: types.RECIPE_EDIT,
    payload: recipeData
  };
};