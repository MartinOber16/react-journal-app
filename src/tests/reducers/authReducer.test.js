import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {
    
    test('debe realizar el login', () => {
        
        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid: 'abc123',
                displayName: 'Martin',
            }
        }
            
        const state = authReducer( initState, action );

        expect( state ).toEqual( {
            uid: 'abc123',
            name: 'Martin',
        })
    })
    
    test('debe realizar el logout', () => {
        
        const initState = {
            uid: 'abc123',
            name: 'Martin',
        };

        const action = {
            type: types.logout,
        }
            
        const state = authReducer( initState, action );

        expect( state ).toEqual( {} )
    })

    test('no debe hacer cambios en el state', () => {
        
        const initState = {
            uid: 'abc123',
            name: 'Martin',
        };

        const action = {
            type: 'Cualquiera',
        }
            
        const state = authReducer( initState, action );

        expect( state ).toEqual( initState );
    })
})
