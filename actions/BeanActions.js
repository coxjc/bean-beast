import { showMessage } from "react-native-flash-message";
import * as types from '../constants/types';
import { generateRandomID, throwError } from "../helpers";
import * as navRoutes from "../constants/NavRoutes";

export const createBean = () => {
  return {
    type: types.BEAN_CREATE
  };
};

export const editBean = (beanData) => {
  return {
    type: types.BEAN_EDIT,
    payload: beanData
  };
};

export const saveBean = (values) => {
  if(values.type === 'create'){
    return _createBean(values);
  }
  else if(values.type === 'edit'){
    return _updateBean(values);
  }
  throwError('values.type did not match either "create" or "edit"', 'actions/BeanActions', 'saveBean', { extra: values });
  return {
    type: 'unknown error'
  };
};

const _createBean = (values) => {
  const id = generateRandomID('bean');
  return (dispatch) => {
    _creatingBean(dispatch, values, id)
      .then(() => {
        dispatch({
          type: types.BEAN_CREATE_SUCCESS,
          payload: id,
        });
        if(id){
          values.navigation.navigate(navRoutes.VIEW_BEAN, {
            id
          });
        }
        else {
          values.navigation.navigate({
            routeName: navRoutes.BEANS_LIST
          });
        }
      })
      .catch(error => {
        dispatch({
          type: types.BEAN_CREATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/BeanActions.js', '_createBean');
        // values.navigation.goBack();
        values.navigation.navigate({
          routeName: navRoutes.BEANS_LIST
        });
        showMessage({
          message: "Error",
          description: "There was an error creating the bean.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _creatingBean = (dispatch, values, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.BEAN_CREATING,
    payload: {
      id,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

const _updateBean = (values) => {
  return (dispatch) => {
    _updatingBean(dispatch, values)
      .then(() => {
        dispatch({
          type: types.BEAN_UPDATE_SUCCESS,
        });
        if(values.id){
          values.navigation.navigate(navRoutes.VIEW_BEAN, {
            id: values.id
          });
        }
        else {
          values.navigation.navigate({
            routeName: navRoutes.BEANS_LIST
          });
        }
      })
      .catch(error => {
        dispatch({
          type: types.BEAN_UPDATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/BeanActions.js', '_updateBean');
        values.navigation.navigate({
          routeName: navRoutes.BEANS_LIST
        });
        showMessage({
          message: "Error",
          description: "There was an error updating the bean.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _updatingBean = (dispatch, values) => new Promise((resolve, reject) => {
  // console.log('updating bean with values: ', values);
  dispatch({
    type: types.BEAN_UPDATING,
    payload: {
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});


export const deleteBean = (id, navigation) => {
  return (dispatch) => {
    _deletingBean(dispatch, id)
      .then(() => {
        dispatch({
          type: types.BEAN_DELETE_SUCCESS,
        });
        navigation.goBack();
        // navigation.navigate({
        //   routeName: navRoutes.BEANS_LIST
        // });
      })
      .catch(error => {
        dispatch({
          type: types.BEAN_DELETE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/BeanActions.js', 'deleteBean');
        navigation.goBack();
        // navigation.navigate({
        //   routeName: navRoutes.BEANS_LIST
        // });
        showMessage({
          message: "Error",
          description: "There was an error deleting the bean.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _deletingBean = (dispatch, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.BEAN_DELETING,
    payload: id
  });
  resolve();
});

export const clearBeanModalData = () => {
  return (dispatch) => {
    dispatch({
      type: types.BEAN_CLEAR_MODAL_DATA
    });
  };
};


/* Bean Rating
----------------------------------------------------------------------------------------------------------------------*/
export const rateBean = (values) => {
  return (dispatch) => {
    dispatch({
      type: types.BEAN_RATE,
      payload: values
    });
    values.navigation.goBack();
  };
};
