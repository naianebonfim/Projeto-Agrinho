let cx, cy; // Coordenadas centrais do relógio
let radius; // Raio do relógio

let selectedHour = -1; // -1 significa nenhuma hora selecionada
let displayMessage = ""; // Mensagem a ser exibida

// Mapeamento de horas para mensagens sobre Campo e Cidade
const dailyConnections = {
  // Manhã (0h - 5h)
  0: { hora: "0h (Meia-noite)", campo: "O campo descansa profundamente. É o período de renovação da terra e dos animais. Alguns produtores rurais podem monitorar sistemas de irrigação automatizados, mas a maioria dorme, preparando-se para o amanhecer.", cidade: "Na cidade, centros logísticos e armazéns recebem e organizam as cargas de produtos agrícolas frescas que chegam, garantindo o reabastecimento de mercados e restaurantes para o novo dia. Equipes de segurança e limpeza trabalham durante a madrugada." },
  1: { hora: "1h da manhã", campo: "Silêncio profundo no campo. Animais de hábitos noturnos estão mais ativos, mas a atividade humana é mínima. É um tempo crucial para o ciclo natural de descanso e crescimento.", cidade: "Caminhões de longa distância, carregados com produtos do campo, continuam a chegar nos grandes centros de distribuição. Alguns serviços essenciais e transportes noturnos operam, mantendo a cidade minimamente ativa." },
  2: { hora: "2h da manhã", campo: "O campo permanece em repouso. A qualidade do sono rural é vital para a energia e produtividade do dia seguinte. A umidade da madrugada pode beneficiar algumas culturas.", cidade: "A cidade está em seu ponto mais calmo. Poucos comércios abertos, mas a infraestrutura de abastecimento (supermercados, distribuidores) já prepara as entregas do dia. A rede de saneamento e serviços de emergência permanecem vigilantes." },
  3: { hora: "3h da manhã", campo: "A noite ainda domina o campo. Alguns animais começam a se agitar levemente, pressentindo o amanhecer, mas a quietude é a característica principal. É um período de mínima intervenção humana.", cidade: "O trabalho noturno nas indústrias e serviços essenciais continua. Os primeiros funcionários de padarias e cozinhas de restaurantes começam a chegar, recebendo os primeiros insumos frescos para iniciar a produção." },
  4: { hora: "4h da manhã", campo: "Os primeiros sinais de luz podem aparecer no horizonte rural. Produtores de leite e alguns agricultores podem começar a se levantar, preparando-se para as tarefas iniciais do dia. O ar é fresco e úmido.", cidade: "O transporte público começa a ter maior frequência. Entregas de leite e pães frescos, originários de matérias-primas do campo, são feitas nas portas dos estabelecimentos. A demanda por energia e água começa a crescer lentamente." },
  5: { hora: "5h da manhã", campo: "O amanhecer. No campo, o movimento é mais intenso: ordenha, preparação de equipamentos, alimentação de animais. O cheiro da terra molhada e da vegetação é forte. É o início da jornada produtiva.", cidade: "As ruas da cidade começam a ganhar movimento. Padarias e cafeterias abrem, servindo produtos feitos com farinha, leite e ovos do campo. Muitos se deslocam para o trabalho, e o consumo de recursos urbanos inicia seu ciclo diário." },

  // Manhã (6h - 11h)
  6: { hora: "6h da manhã", campo: "Tratores e trabalhadores estão em plena atividade, iniciando a colheita ou o plantio. Os produtos frescos estão sendo coletados e preparados para o transporte. O campo está vibrante de vida e trabalho.", cidade: "Feiras livres e mercados recebem os primeiros caminhões do campo, com frutas, verduras e legumes frescos. A cidade se enche de pessoas indo ao trabalho e à escola, e o consumo de alimentos se intensifica." },
  7: { hora: "7h da manhã", campo: "A logística rural está a todo vapor: produtos são embalados, conferidos e carregados em veículos que seguirão para os centros de distribuição. É um período crucial para a cadeia de abastecimento.", cidade: "O trânsito e o transporte público atingem seu pico. Cafés e lanchonetes estão cheios, servindo produtos derivados do campo. A demanda por energia elétrica e água é alta para o início das atividades urbanas." },
  8: { hora: "8h da manhã", campo: "Com a luz do sol forte, a irrigação e o cuidado com as plantações são prioridade. Novas tecnologias e equipamentos (muitas vezes vindos da cidade) são utilizados para otimizar a produção e o uso de recursos.", cidade: "Comércios, escritórios e escolas abrem plenamente. O fluxo de pessoas nas ruas é intenso. As indústrias começam suas operações, demandando matéria-prima que vem do campo para a produção de bens." },
  9: { hora: "9h da manhã", campo: "A pesquisa agrícola pode estar em andamento, testando novas sementes ou técnicas de cultivo. Produtores podem estar em contato com cooperativas e mercados na cidade para fechar negócios.", cidade: "As bolsas de valores e o setor financeiro operam, influenciando o preço de commodities agrícolas. Universidades e centros de pesquisa desenvolvem inovações que beneficiarão a produção rural. O sistema de saúde e educação funcionam a todo vapor." },
  10: { hora: "10h da manhã", campo: "O transporte de animais e a preparação para a próxima fase de cultivo são realizados. A manutenção de cercas e estruturas rurais, muitas vezes feitas com materiais urbanos, é comum.", cidade: "O consumo de água e energia elétrica atinge um dos seus maiores picos. O comércio está em pleno funcionamento, e os serviços de entrega circulam pela cidade, levando produtos, incluindo os do campo, aos consumidores." },
  11: { hora: "11h da manhã", campo: "As últimas cargas de produtos frescos podem estar saindo do campo para os mercados. A comunicação entre campo e cidade se intensifica para garantir que a demanda seja atendida.", cidade: "Restaurantes e serviços de alimentação se preparam para o horário de pico do almoço, recebendo as últimas entregas de insumos frescos. A cidade se organiza para o breve período de descanso." },

  // Tarde (12h - 17h)
  12: { hora: "12h (Meio-dia)", campo: "Hora de almoço e um breve descanso para a maioria dos trabalhadores rurais. É um momento de recarregar as energias para as atividades da tarde, muitas vezes sob o sol forte.", cidade: "As ruas e estabelecimentos da cidade ficam lotados com a pausa para o almoço. A culinária urbana, baseada em ingredientes do campo, é onipresente. É um momento de grande movimentação e consumo." },
  13: { hora: "13h da tarde", campo: "Retorno às atividades. Manutenção de máquinas, irrigação de áreas específicas e controle de pragas são tarefas comuns. A gestão da propriedade rural demanda tecnologia e conhecimento.", cidade: "O comércio volta a ser movimentado. Muitos serviços urbanos, como bancos e repartições públicas, operam a pleno vapor. O fluxo de informações e serviços entre empresas e cidadãos é constante." },
  14: { hora: "14h da tarde", campo: "Monitoramento de lavouras e gado. Produtores rurais podem usar aplicativos e softwares desenvolvidos na cidade para gerenciar suas operações, controlar estoques e planejar a próxima safra.", cidade: "Indústrias de transformação continuam processando matéria-prima vinda do campo, transformando-a em produtos industrializados para consumo. O setor de serviços e o tráfego se mantêm em nível alto." },
  15: { hora: "15h da tarde", campo: "É o período em que se intensifica a troca de informações técnicas com agrônomos e veterinários, que podem ter vindo da cidade para dar suporte ao campo. A modernização agrícola é contínua.", cidade: "As universidades e centros técnicos oferecem cursos e pesquisas que formam profissionais para atuar tanto na cidade quanto no campo. Empresas de logística organizam as rotas para as próximas entregas." },
  16: { hora: "16h da tarde", campo: "A preparação para o final do dia começa. Animais são recolhidos, colheitas finalizadas e equipamentos guardados. A rotina rural se adapta à luz do sol que começa a diminuir.", cidade: "O trânsito começa a ficar mais pesado com a proximidade do fim do expediente. O comércio tem um último pico antes do encerramento de algumas lojas, e as atividades culturais da tarde se iniciam." },
  17: { hora: "17h da tarde", campo: "Últimas tarefas antes do pôr do sol. A organização para o próximo dia é fundamental, incluindo a separação de sementes e a limpeza de ferramentas. A natureza impõe seu ritmo.", cidade: "O fluxo de pessoas e veículos nas ruas se intensifica com a volta para casa. Supermercados e feiras recebem os últimos clientes, que buscam produtos frescos para suas refeições noturnas." },

  // Noite (18h - 23h)
  18: { hora: "18h da tarde", campo: "O campo se acalma. O pôr do sol marca o fim da jornada de trabalho. Famílias rurais se reúnem, desfrutando da tranquilidade e da alimentação produzida em sua terra.", cidade: "O horário de pico do trânsito. A cidade se ilumina e a vida noturna começa. Cinemas, teatros e restaurantes, abastecidos por insumos do campo, abrem suas portas para o entretenimento." },
  19: { hora: "19h da noite", campo: "O silêncio noturno do campo é profundo, pontuado apenas pelos sons da natureza. A maioria dos trabalhadores rurais descansa, essenciais para o ciclo de produção do dia seguinte. ", cidade: "Muitas famílias jantam, com alimentos provenientes do campo em seus pratos. A coleta de lixo e outros serviços de infraestrutura urbana podem começar em áreas menos movimentadas." },
  20: { hora: "20h da noite", campo: "O céu estrelado é mais visível no campo, longe da poluição luminosa. Alguns produtores podem monitorar câmeras de segurança ou sistemas automatizados à distância, com tecnologia da cidade.", cidade: "Centros de lazer, academias e shoppings continuam movimentados. O consumo de energia elétrica é alto devido à iluminação pública e privada e ao uso de eletrodomésticos." },
  21: { hora: "21h da noite", campo: "A maioria das famílias rurais está em casa, desfrutando de momentos de lazer ou se preparando para dormir. A paz do campo contribui para o bem-estar e a recuperação física.", cidade: "Alguns restaurantes começam a encerrar suas atividades. Eventos noturnos continuam, enquanto o transporte público começa a ter sua frequência reduzida. Há uma diminuição gradual do movimento geral." },
  22: { hora: "22h da noite", campo: "O campo está imerso na escuridão e no silêncio. É um momento de repouso vital para a biodiversidade e para o equilíbrio ambiental. Pouca atividade, salvo emergências.", cidade: "O movimento nas ruas diminui consideravelmente. Bares e casas de shows ainda funcionam, mas a maioria das pessoas se recolhe. A cidade se prepara para o descanso noturno, mas a rede de serviços essenciais permanece ativa." },
  23: { hora: "23h da noite", campo: "Com a noite avançada, a vida no campo se torna quase imperceptível. É a garantia de que a terra e seus recursos estarão renovados para mais um ciclo produtivo com o próximo nascer do sol.", cidade: "A cidade entra em modo de 'economia'. A demanda por energia e água diminui. A segurança pública e os serviços de emergência atuam para manter a ordem e a proteção da população, esperando o amanhecer para o reinício do ciclo." }
};


// =================================SETUP=================================
function setup() {
  createCanvas(900, 700); // Canvas maior para acomodar todas as mensagens
  angleMode(DEGREES); // Usa graus para ângulos (mais intuitivo para relógios)

  cx = width / 2; // Centro X do relógio
  cy = height / 2 - 120; // Centro Y do relógio (mais para cima para o texto)
  radius = 200; // Raio do relógio
}

// =================================DRAW=================================
function draw() {
  background(240); // Fundo claro

  // Desenha o círculo do relógio
  stroke(180);
  strokeWeight(4);
  fill(255);
  ellipse(cx, cy, radius * 2, radius * 2);

  // Desenha os marcadores das horas e a hora atual
  drawHourMarkers();
  drawCurrentTimePointer();

  // Exibe a mensagem se uma hora foi selecionada
  displayConnectionMessage();

  // Exibe instruções
  displayInstructions();
}

// =================================FUNÇÕES DE DESENHO DO RELÓGIO=================================
function drawHourMarkers() {
  push();
  translate(cx, cy); // Move a origem para o centro do relógio

  textSize(18);
  textAlign(CENTER, CENTER);
  noStroke();

  // Desenha os marcadores para as 12 horas principais
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, 360) - 90; // -90 para que 12h esteja no topo
    let x = radius * 0.8 * cos(angle);
    let y = radius * 0.8 * sin(angle);

    let hourDisplay = (i === 0) ? 12 : i; // 0h como 12h

    // Para detecção de clique e visualização de hora selecionada
    let currentClockHour = (hourDisplay === 12) ? 0 : hourDisplay;
    if (selectedHour === currentClockHour || selectedHour === (currentClockHour + 12)) {
      fill(255, 0, 0); // Vermelho para a hora selecionada
    } else {
      fill(50); // Cinza escuro
    }
    text(hourDisplay, x, y);

    // Verifica clique no número da hora (para horas 1-12)
    if (dist(mouseX - cx, mouseY - cy, x, y) < 20 && mouseIsPressed) {
      selectedHour = currentClockHour; // Armazena a hora (0-11)
      updateDisplayMessage(selectedHour);
    }
  }

  // Desenha os marcadores para as "meias horas" que representam as horas ímpares/entre
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, 360) - 90 + 15; // +15 graus para estar entre os números
    let x = radius * 0.9 * cos(angle); // Um pouco mais para fora
    let y = radius * 0.9 * sin(angle);

    fill(150); // Cor mais suave para as metades
    ellipse(x, y, 8, 8); // Pequenos círculos como marcadores

    // Verifica clique nos marcadores pequenos
    if (dist(mouseX - cx, mouseY - cy, x, y) < 8 && mouseIsPressed) {
      let hourClick = round(map(angle + 90, 0, 360, 0, 12));
      // Transforma para as 24 horas. Ex: 15 graus (entre 12h e 1h) é 0h, 45 graus é 1h
      // Precisamos mapear o ângulo para a hora inteira mais próxima.
      // Simplificação: apenas as horas 0, 1, 2, ..., 23 são clicáveis.
      // Vamos assumir que clicar no "meio" aponta para a hora seguinte à do número principal.
      // Ex: Clicar entre 12 e 1h (pelo ângulo) pode ser 0h ou 13h (dependendo do quadrante)
      
      // Para este cenário, vamos associar cada marcador principal (0-11 ou 12) a duas horas
      // uma no ciclo AM/PM para os números, e uma para a 'meia hora' para o próximo número 
      // para cobrir todas as 24h.
      // Simplificando o clique: usaremos o `selectedHour` para mapear para 0-23
      // e vamos permitir que as 24 horas sejam selecionadas via o clique principal.
      // A detecção acima já está OK, basta garantir que `updateDisplayMessage` saiba lidar com 24h.
      // A funcionalidade de clique é pelos números 1-12/0h apenas.
      // O 'dailyConnections' tem chaves de 0 a 23. Precisamos converter o `selectedHour` para isso.
    }
  }
  pop();
}


function drawCurrentTimePointer() {
  let h = hour();
  let m = minute();
  let s = second();

  // Ponteiro das horas
  push();
  stroke(0, 0, 255); // Azul
  strokeWeight(6);
  translate(cx, cy);
  // Mapeia 24 horas para 360 graus
  let hrAngle = map(h, 0, 24, 0, 360 * 2) - 90; // Gira 2 vezes em 24h
  // Ajuste fino da hora pelos minutos e segundos
  hrAngle += map(m, 0, 60, 0, 15); // Cada minuto move o ponteiro da hora um pouco
  hrAngle += map(s, 0, 60, 0, 0.25); // Cada segundo move o ponteiro da hora um pouquinho
  rotate(hrAngle);
  line(0, 0, radius * 0.5, 0); // Comprimento do ponteiro da hora
  pop();

  // Ponteiro dos minutos
  push();
  stroke(0, 200, 0); // Verde
  strokeWeight(4);
  translate(cx, cy);
  let minAngle = map(m, 0, 60, 0, 360) - 90;
  minAngle += map(s, 0, 60, 0, 6); // Ajuste fino do minuto pelos segundos
  rotate(minAngle);
  line(0, 0, radius * 0.7, 0); // Comprimento do ponteiro do minuto
  pop();

  // Ponteiro dos segundos
  push();
  stroke(255, 0, 0); // Vermelho
  strokeWeight(2);
  translate(cx, cy);
  let secAngle = map(s, 0, 60, 0, 360) - 90;
  rotate(secAngle);
  line(0, 0, radius * 0.8, 0); // Comprimento do ponteiro do segundo
  pop();

  // Ponto central do relógio
  fill(0);
  noStroke();
  ellipse(cx, cy, 10, 10);
}

// =================================MENSAGENS E INTERAÇÃO=================================
function updateDisplayMessage(hourClicked) {
  let actualHour = hourClicked; // Vai de 0 a 11 (ou 12 para 0h)
  let currentSystemHour = hour(); // Hora atual do sistema (0-23)

  // Determina se é AM ou PM para definir a hora correta no objeto dailyConnections
  // Se a hora clicada (1-11) for menor ou igual à hora do sistema (1-11), assumimos que é AM
  // Se a hora clicada (1-11) for maior que a hora do sistema (1-11), assumimos que é PM
  // Exemplo: se o sistema é 14h, e clico no 2, é o 2h da tarde (14h)
  // Mas se o sistema é 9h, e clico no 2, é o 2h da manhã (2h)
  // Esta lógica simples pode ser imprecisa em algumas transições.
  // Uma forma mais robusta é ter 24 "áreas" clicáveis no círculo ou um seletor AM/PM.
  // Para este relógio simples de 12 marcadores, vamos mapear para a hora mais provável
  // ou assumir um ciclo de 24 horas na hora do clique baseada na hora atual do sistema.

  // Simplesmente mapear o número do marcador para a hora real de 0-23.
  // A hora 12 no relógio representa 0h ou 12h.
  // Se o ponteiro de hora atual está na parte superior (AM) ou inferior (PM) pode ajudar.
  
  // Vamos usar uma abordagem que tenta adivinhar se é AM ou PM
  // baseando-se na hora atual do sistema.
  let mappedHour = hourClicked; // Horas do relógio (1-12)

  // Ajusta para 0-23h
  if (mappedHour === 12) { // 12h no relógio pode ser 0h ou 12h
    if (currentSystemHour >= 0 && currentSystemHour < 12) { // Se o sistema está no ciclo AM
      actualHour = 0; // Significa meia-noite
    } else { // Se o sistema está no ciclo PM
      actualHour = 12; // Significa meio-dia
    }
  } else { // Horas 1 a 11
    if (currentSystemHour >= mappedHour && currentSystemHour < (mappedHour + 12)) {
      // Se a hora do sistema está no mesmo ciclo AM/PM do clique
      actualHour = mappedHour;
    } else {
      // Se a hora do sistema está no ciclo oposto (ex: sistema é 14h, clicou 2h -> 14h)
      actualHour = mappedHour + 12;
    }
  }

  // Verifica se a hora clicada (0-23) existe em dailyConnections
  if (dailyConnections[actualHour]) {
    const data = dailyConnections[actualHour];
    displayMessage = `
    ---
    Hora Selecionada: ${data.hora}

    No Campo:
    ${data.campo}

    Na Cidade:
    ${data.cidade}
    `;
  } else {
    displayMessage = `
    ---
    Informações para ${actualHour}h não disponíveis.
    Tente clicar nas horas marcadas no relógio.
    `;
  }
}

function displayConnectionMessage() {
  if (displayMessage.length > 0) {
    fill(50);
    textSize(16); // Tamanho da fonte menor para caber mais texto
    textAlign(LEFT, TOP);
    textLeading(22); // Espaçamento entre as linhas
    // Posição e tamanho da caixa de texto, mais para baixo
    text(displayMessage, 50, height - 280, width - 100, 250);
  }
}

function displayInstructions() {
  fill(100);
  textSize(15);
  textAlign(CENTER, TOP);
  text("Clique nos números das horas no relógio para explorar a conexão campo-cidade!", width / 2, height - 30);
  text("A hora atual do sistema é exibida pelos ponteiros.", width / 2, height - 10);
}

