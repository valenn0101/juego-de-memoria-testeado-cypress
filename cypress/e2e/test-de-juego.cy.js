const NUMERO_CUADROS_ESPERADOS = 12;
const PATRON_ORIGINAL = [
  "rojo","rojo","violeta","violeta","naranja","naranja","azul","azul","blanco","blanco","verde","verde",
];
const URL = 'http://127.0.0.1:8080';

describe('Evaluando mi app',()=>{
  before('Visitando el memo test', ()=>{
    cy.visit(URL);
  });

  it('Se asegura que exista un tablero con cuadros', ()=>{
    cy.get('#tablero').find('.cuadro').should('have.length', NUMERO_CUADROS_ESPERADOS);
  });

  it('Se asegura que los cuadros sean aleatorios',()=>{
    cy.visit(URL);
    cy.window().then((win) => {
      cy.wrap(win.colores).should('not.deep.equal', PATRON_ORIGINAL);    
    });
  });
})

describe('Resolviendo el juego', ()=>{
  let mapaDePares, listaDePares;
  beforeEach(() => {
    cy.visit(URL, { failOnStatusCode: false });
    cy.reload(false);
  });

  it('Elige una combinacion erronea',()=>{
    cy.get('.cuadro').then(cuadros=> {
      mapaDePares = obtenerParesDeCuadros(cuadros);
      listaDePares = Object.values(mapaDePares);
      listaDePares[0][0].click();
      listaDePares[1][0].click();

      cy.get('.cuadro').should('have.length', NUMERO_CUADROS_ESPERADOS);
    });
  });

  it('Elige todas las combinaciones correctas',()=>{
    cy.get('.cuadro').then(cuadros=> {
      mapaDePares = obtenerParesDeCuadros(cuadros);
      listaDePares = Object.values(mapaDePares);
      for (let i = 0; i < listaDePares.length; i++) {
        const parCorrecto = listaDePares[i];
        if (parCorrecto[0].textContent === parCorrecto[1].textContent) {
          parCorrecto[0].click();
          parCorrecto[1].click();
        }
      }
    });
  });
});


function obtenerParesDeCuadros(cuadros){
  const pares = {};

  cuadros.each((i, cuadro)=>{
    const claseColor = cuadro.className.replace('inicio-juego cuadro ', '');
    if(pares[claseColor]){
      pares[claseColor].push(cuadro);
    } else{
      pares[claseColor] = [cuadro];
    }
  });
  console.log(pares);
  return pares;
}