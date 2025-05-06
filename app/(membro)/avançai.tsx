// src/screens/AulasScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  useWindowDimensions,
  Alert
} from 'react-native';
import { WebView } from 'react-native-webview';
import HTMLView from 'react-native-htmlview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
import AuthGuard from '../../hooks/AuthGuard';
import { router } from 'expo-router';

type Aula = {
  modulo: string;
  numero: string;
  titulo: string;
  videoUrl: string;
  descricao: string;
  imagem: any;
};

const reset: Aula[] = [
  {
    modulo: 'reset',
    numero: '1',
    titulo: 'Lição 1 - Reconhecendo a Cristo como Senhor',
    videoUrl: 'https://www.youtube.com/embed/fuh3jtveqD4?si=1oVPbPYH3tYsPuPZ',
    descricao:
      `
      INTRODUÇÃO
		A experiência mais importante de sua vida é conhecer Jesus Cristo pessoalmente e relacionar- se com Ele. Jesus veio ao mundo para nos mostrar quem é Deus e como podemos conhecê-lo. Se você quer que o seu relacionamento com Cristo cresça, você precisa conhecê-lo melhor. Para isso é preciso compreender melhor quem Ele é, porquê Ele veio e o que Ele deseja fazer em sua vida.


		QUEM É JESUS?
		Muitas pessoas tem uma visão distorcida ou limitada sobre Jesus. De acordo com as passagens abaixo, quem é Jesus?
		√ Mateus 16:16
		√ Colossenses 1:15-17


		POR QUE JESUS VEIO?
		Nas passagens abaixo, quais são as razões da vinda de Cristo?
		√ Lucas 4:16-19
		√ 1 Timóteo 2:5-6
		
		Por que precisamos nos reconciliar com Deus?
		√ Isaías 59:2
		√ Romanos 3:23

		Pecado significa rebelião pessoal contra Deus e afastamento dos propósitos que ele tem para nossas vidas.

		Qual foi a solução de Jesus para o pecado?
		√ Romanos 5:8-9
		√ 1 Pedro 3:18
		√ Atos 4:12

		Qual o resultado de sua morte?
		√ ll Coríntios 5:19-21
		√ Romanos 5:1-2

		Que prova temos nós da sua ressurreição?
		√ 1 Coríntios 15:3-8
		√ Atos 10:40-41

		Quais são as razões da importância de sua ressurreição?
		√ 1 Coríntios 15:13-18

		SEU CONVITE
		Todos os que ouvem falar de Jesus devem tomar uma decisão a respeito dEle e do que Ele fez por nós. Ninguém pode ficar neutro! Aceitamos a Cristo ou o rejeitamos. Ele nos chama para si.

		NOSSA RESPOSTA
Para respondermos ao convite de Jesus e deixá-lo ser nosso Salvador e Senhor, é necessário que tomemos certas atitudes.
Embora Jesus tenha morrido pelos pecados de todo mundo, é preciso que haja uma resposta pessoal, individual para com Ele. Para nos relacionamentos com Ele, precisamos deixar nosso antigo modo de vida (arrependimento), precisamos confiar totalmente em Jesus para nossa salvação (fé) e convidá-lo para fazer parte das nossas vidas.
Ao invés de um mero acordo intelectual repleto de ensinamentos sobre Jesus, isto significa um compromisso total de vida com Ele como Senhor. Este é o verdadeiro significado de tornar-se crente.
Como já vimos, receber a Cristo é o começo de um relacionamento com Ele. Isto quer dizer que deve haver continuidade, deve haver crescimento para que haja significado real e satisfatório. Os capítulos seguintes deste estudo vão tratar do desenvolvimento de seu relacionamento com Cristo.
CONCLUSÃO

Lembre-se dos passos básicos para se tornar em crente:

	Crer que Jesus morreu por seus pecados e ressuscitou para justificá-lo diante de Deus
	Arrepender-se de seus pecados (admitindo a Deus que você é pecador) e afastar-se deles.
	Receber o perdão de seus pecados a aceitar a Cristo como Salvador e Senhor de sua vida.
	Confessar publicamente que Jesus é o Senhor (dono) de sua vida.
      `,
    imagem: require('@/assets/images/reset1.png'),
  },
  {
    modulo: 'reset',
    numero: '2',
    titulo: 'Lição 2 - Conhecendo Jesus Cristo',
    videoUrl: 'https://www.youtube.com/embed/_xtmwkQtx6w?si=wob4bSq7fvzHLO0S',
    descricao:
      `
      INTRODUÇÃO
Aceitar a Cristo é o começo de um novo relacionamento. O desejo de Deus é que cresçamos neste relacionamento e que o conheçamos melhor. Para que possamos crescer nós precisamos ter a certeza e segurança de que o relacionamento é real e duradouro. Deus providenciou um meio para que tivéssemos esta certeza e segurança sem precisarmos depender de sentimentos ou circunstâncias. Ele providenciou sua palavra escrita e sua presença conosco.
Quando começamos a conhecer a Cristo melhor, todo poder que era evidente em sua vida está à nossa disposição. Pense nisso! Todo poder de Jesus Cristo está disponível para transformar nossas vidas completamente.

AMÁ-LO COMPLETAMENTE
 
O amor é a chave para desenvolvimento de uma relação. Deus quer que o amemos de todo o nosso ser? (Dt. 6:5). Jesus repetiu este desejo e mandamento em Marcos 12:29-31.

A OBRA DO ESPÍRITO SANTO
Jesus está presente na vida dos crentes de um modo especial: através do Espírito Santo. O Espírito Santo concede o milagre do novo nascimento. Ele faz com que seja possível conhecer a Cristo pessoalmente, e completa a obra de Cristo em nossas vidas.
A palavra grega para Espírito Santo é paracletos. O seu significado é “aquele que vai ao lado”. Ela traduzida como ajudante, conselheiro, confortador, animador. Seu ministério em nossas vidas é absolutamente essencial.
Ser cheio do Espírito Santo significa que Cristo tem o controle absoluto em todas as áreas de nossa vida (Romanos 8:5-6). Ser cheio do Espírito Santo deve significar uma experiência contínua, evidenciada por qualidades interiores e não necessariamente por sentimentos e experiências extasiantes.

Deus pode nos ensinar muitas coisas, mesmo quando estamos cheios de dúvidas. Habacuque tinha sérias dúvidas sobre a validade da presença de Deus. Ele queria saber qual a posição de Deus num mundo tão cheio de maldades. Deus se revelou a ele e Habacuque mudou sua maneira de encarar a presença de Deus.

      `,
    imagem: require('@/assets/images/reset2.png'),
  },
  {
    modulo: 'reset',
    numero: '3',
    titulo: 'Lição 3 - Graça e Justificação',
    videoUrl: 'https://www.youtube.com/embed/thLa8h6v5pI?si=sfeiM59AyJ9vTAAj',
    descricao:
      `
      INTRODUÇÃO
Na história da criação compreendemos que Deus criou o homem para ser livre, feliz e abençoado. Porém, já refletimos que o pecado interrompeu este ciclo gerando aos homens consequências desastrosas.
Porém, o mesmo amor que moveu Deus em criar o homem, é o mesmo que através de Jesus Cristo justifica esse mesmo homem do pecado manifestando a sua maravilhosa graça.

A GRAÇA E SUA MANIFESTAÇÃO
A última palavra de Deus ao homem não é o pecado, mas a graça divina (Gn 3-21, 4.15) (Tito 2.11/ Rm 5.20b / ll Pe 1.2). Esta mesma graça menciona que a resposta de Deus ao pecado foi o perdão e o direito do homem em se libertar dos males do pecado.
Este processo se inicia quando analisamos que a principal ação de Deus em não deixar o homem na miséria do pecado foi seu amor (1 Jo 4.16 / 1 Jo 4-19), e a maior prova desse amor foi enviar seu filho amado Jesus Cristo para morrer por nós na cruz (Jo 3.16), nos redimindo, justificando e salvando na figura de Jesus Cristo que deixou sua glória para nos purificar do pecado (Hb 1.3
/ Tito 2.14 / Col 1.14) e que através da fé Nele recebemos o maior presente que poderíamos ter de Deus, a certeza da vida eterna (Rm 3.24).
Para entendermos um pouco da imensidão do significado da palavra graça, é importante dividi- la em duas partes:

Graça proveniente
Esta graça é a ação de Deus, antes da nossa decisão em nos render a Ele. O texto de 1 Jo 4.19, expressa que nós amamos porque Ele nos amou primeiro, sendo assim, já entendemos que a nossa decisão é uma resposta da graça divina que já opera em nós mostrando que Deus sempre dá o primeiro passo em nossa direção através do seu infinito amor. Porém, devemos sintetizar que a Bíblia também nos ensina que mesmo com esta ação, muitos homens por sua dureza de coração ignoram esta graça (Ef 4.18) seguindo suas próprias convicções e valores.
Graça justificadora
 
Esta graça também é uma ação de Deus (Rm 3.24), mas depende de nós aceitarmos ou não. Se a nossa resposta for positiva e cumprirmos princípios da Bíblia Sagrada. Nosso Pai nos considerará justificados por meio de Jesus Cristo, e isto, é o que chamamos de justificação.

A JUSTIFICAÇÃO E O SER HUMANO
A justificação pode ser definida de múltiplas formas, porém a que mais se assemelha ao benefício que ela nos traz é a liberdade da culpa e do castigo do pecado. Tal manifestação é evidenciada no sacrifício de Jesus Cristo por nós na cruz, trazendo a evidencia de que não pode haver remissão e aplicação de Justiça de Deus sem o sangue de Cristo (Hb 9.22 e Rm 3.26.
Este direito de Justificação foi resgatado por Cristo, trazendo a idéia de que Deus criou o homem bom (Gn 1.27) porém sua desobediência o levou ao pecado, violando a lei de Deus, comprometendo toda sua descendência (Ec 7.29). Jesus Cristo veio na figura de um segundo Adão para resgatar tudo o que Deus criou de bom e justificar o pecado pela sua graça (Rm 3.24), em resumo, por um homem o pecado entrou no mundo (Adão) e por um só homem a salvação veio ao mundo (Jesus Cristo) (Rm 5.12-19 / ll Co 5.21).

O FRUTO DA JUSTIFICAÇÃO
A justificação é adquirida pela fé em Jesus Cristo e não pelas obras que a pessoa realiza antes da conversão. Quando somos justificados por meio de Jesus Cristo (Gl 2.16), um fruto é desenvolvido em nós, o qual Deus se agrada, é o fruto da santificação. Esse fruto opera em nós pelo Espírito Santo de Deus mudando nosso interior e manifestando o desejo de pensar e de tomar ações que agradam o coração de Deus!

CONCLUSÃO

Através de Jesus Cristo, o amor de Deus foi enraizado novamente na criação. A desobediência que um dia gerou desgraça à humanidade através de Adão, foi resgatada através de Jesus Cristo. Anunciemos esta graça para que a salvação, justificação e santificação cheguem a todos de nossa família, amigos, bairro, cidade, país e mundo.
      `,
    imagem: require('@/assets/images/reset3.png'),
  },
    {
      modulo: 'reset',
      numero: '4',
    titulo: 'Lição 4 - O Pecado e o Arrependimento',
    videoUrl: 'https://www.youtube.com/embed/ARZyyOPEGAQ?si=pnOBMeIpOlpMJWhR',
    descricao:
      `
      INTRODUÇÃO

Deus criou o homem a sua imagem e semelhança (Gn 2.7-17) (Gn 1.26-27) e harmonizou o mundo para que ele visse em plena felicidade. Deus deu liberdade, autoridade e estabeleceu limites para que o homem obedecesse. Porém esse homem transgrediu este limite (Gn 3.1-6), ferindo sua relação com a natureza, com o seu próximo, consigo mesmo e principalmente com Deus.

O PECADO E SUA NATUREZA
O pecado é qualquer ato, palavra ou intenção que transgrida a vontade de Deus (Tg 4.16-17). Cometer um pecado é ir contra a santa e boa lei de Deus (1 Jo 3.4).
Algumas definições não esgotam o sentido do pecado, porém entendemos melhor quando analisamos o livro bíblico de Gênesis no capítulo 3, onde Adão e Eva foram criados em estado de inocência, porém pecaram quando desobedeceram a Deus e comeram do fruto da árvore do conhecimento do bem e do mal (Gn 3.5). Em resumo, o pecado se caracterizou quando o ser humano quis ser igual a Deus. E é óbvio que foi um insucesso, manifestando ganância, rebeldia, desobediência, angústia, mentira, idolatria, etc.
Devido ao ato de desobediência praticado por Adão e Eva, toda humanidade foi afetada pelo pecado (Rm 5.19), e a Morte Eterna (Rm 5.12-21). Tal afirmação é conhecida pelos teólogos como Pecado Original.
Em Romanos 3.23, o apóstolo Paulo descreve o estado dos homens, após o Pecado Original, fomos destituídos da Glória de Deus. Porém Deus oferece graça à todos, e por meio da fé em Jesus Cristo os pecados podem ser perdoados. Tal fé opera no coração do ser humano, a ponto dele nascer de novo em Cristo, transformando sua maneira de ver o mundo, ou seja, em Jesus Cristo todos podem ser uma nova criatura!

COMPREENSÃO DO ARREPENDIMENTO

A Bíblia relata sobre a vida de um homem que antecedeu o ministério de Jesus, seu nome é João Batista. Ele proclamava às pessoas o arrependimento dos seus pecados (Mc 1.1-4). Após
 
este anúncio Jesus estabeleceu seu ministério na terra oferecendo não apenas a busca pelo arrependimento, mas na certeza que esse arrependimento salvarias as pessoas através do Seu nome (1 Jo 3.7) (2 Co 7.9 / Atos 5.31) e devolveria a pureza de coração aos homens (1 Jo 3.3)
O arrependimento o ponto de partida para a pratica de vida cristã onde os primeiros passos são guiados por Jesus Cristo através de Sua palavra (Gl 4.3) (Gl 2.20), andando em rumo a maturidade cristã (1 Pe 2.2).
O sentimento de arrependimento genuíno é caracterizado quando a tristeza por causa do pecado (2 Co 7.9) (2 Co 7.9-10) nos dá a sensação de estarmos distante de Deus. O arrependimento é uma mudança de coração consequentemente de vida. Devemos entender que a decisão de usufruir deste benefício (arrependimento) é pessoal (Rm 6.1-4). A graça de Deus em Cristo precisa ser aceita por nós a cada dia por meio de um genuíno arrependimento. Temos o livre arbítrio, isto é, a liberdade de escolher e aceitar essa graça, e vivermos novamente a comunhão e a harmonia com o Criador.)

CONCLUSÃO
A trajetória de pecado tem sido uma prática da humanidade. Mesmo Jesus Cristo se manifestando ao mundo, o homem continua sendo incrédulo quanto a Deus e seu amor. Porém, nossa missão é dar continuidade na missão de Jesus Cristo, pregando e vivendo o verdadeiro evangelho para estabelecer o Reino dos céus na terra.

      `,
    imagem: require('@/assets/images/reset4.png'),
  },
  {
    modulo: 'reset',
    numero: '5',
    titulo: 'Lição 5 - Princípíos da Oração',
    videoUrl: 'https://www.youtube.com/embed/ENu07d8zIZA?si=qQewKnMmX8U7oZUB',
    descricao:
      `
      INTRODUÇÃO
Muitas coisas são importantes na vida de um cristão, porém outras são mais que importantes, são vitais. Dentre essas coisas vitais, encontramos a oração.
Segue abaixo algumas frases ditas a respeito da oração ao longo da história:
-	“Satanás ri de nosso zelo no serviço, zomba de nossa sabedoria, mas treme quando oramos.”
-	“Muita oração secreta resulta em muito poder em público.”
-	“A oração do crente fiel tem pé e anda, tem asas e voa até chegar no céu.”
-	“Nunca ocupamos posição tão elevada como quando estamos de joelho.”


O QUE É A ORAÇÃO

Oração é a comunicação e o fruto consciente do relacionamento com Deus durante a qual a pessoa louva, agradece, intercede pela vida de outro, pede bênçãos para ele ou a outrem, e através dela pode desfrutar da presença de Deus. As orações são dirigidas à Deus, por mediação única de Jesus Cristo, e podem ser feitas em voz alta, falada, em canção ou em silêncio. O propósito da oração (Mt 6.5-13) não seria o de alterar a vontade de Deus, mas de obter para si mesmo e/ou para os outros bênçãos e graça que Deus já estaria disposto a conceder. Oração é a comunicação e o fruto consciente do relacionamento com Deus durante a qual a pessoa louva, agradece, intercede pela vida de outro, pede bênçãos para ele ou a outrem, e através dela pode desfrutar da presença de Deus. As orações são dirigidas à Deus, por mediação única de Jesus Cristo, e podem ser feitas em voz alta, falada, em canção ou em silêncio. O propósito da oração (Mt 6.5-13) não seria o de alterar a vontade de Deus, mas de obter para si mesmo e/ou para os outros bênçãos e graça que Deus já estaria disposto a conceder.
NECESSIDADE DA ORAÇÃO
 
Em diversas passagens dos evangelhos, encontramos relatos que Jesus constantemente orava ao Pai. Ele orava pela manhã (Marcos 1.35), à tarde (Mateus 14.23) e passava noites inteiras em comunhão com Deus (Lucas 6.12). Se Jesus, que era o próprio Filho de Deus tinha essa prática, é óbvio que devemos estabelecer essa rotina no nosso dia-a-dia. Quanto mais conversarmos com alguém, mais nos aproximamos dessa pessoa e temos mais intimidade com ela, da mesma forma é com o Senhor. Além de poderosa (Tiago 5.16), através da oração estabelecemos um diálogo com Deus, aprofundando a nossa comunhão e intimidade através do Espírito Santo (Romanos 8.26-27). Também apresentamos a Ele as nossas ansiedades, desejos e necessidades, “e Deus nos concederá a paz que excede todo o entendimento e guardará em Cristo Jesus os nossos corações e mentes”. (Fp 4.6-7).


FRUTOS DE UMA VIDA DE ORAÇÃO

a)	Conseguimos sabedoria
Tiago 1.5
“... Se algum de vocês tem falta de sabedoria, peça-a a Deus, que a todos dá livremente, de boa vontade; e lhe será concedida...”

b)	Movemos a mão de Deus;
Mateus 7.7-8
“... Peçam, e lhes será dado; busquem, e encontrarão; batam, e a porta lhes será aberta. Pois tudo o que pede, recebe; o que busca, encontrará; e àquele que bate, a porta será aberta...”


c)	Nos tornamos intercessores;

Éfésios 6. 18-20

“... Orem no Espírito em todas as ocasiões, com toda oração e súplica; tendo isso em mente, estejam atentos e perseverem na oração por todos os santos. Orem também por mim, para que, quando eu falar, seja-me dada a mensagem a fim de que, destemidamente, torne conhecido o mistério do evangelho, pelo qual sou embaixador preso em correntes. Orem para que, permanecendo nele, eu fale com coragem, como me cumpre fazer...”


d)	Caminhamos em rumo a santidade;
 
1 Timóteo 4.4

“... Pois tudo o que Deus criou é bom, e nada deve ser rejeitado, se for recebido com ação de graças, pois é santificado pela palavra de Deus e pela oração...”
e)	Deus estabelece o seu avivamento;

Atos 4.31

“...Depois de orarem, tremeu o lugar em que estavam reunidos; todos ficaram cheios do Espírito Santo e anunciavam corajosamente a palavra de Deus...”


COMO E QUANDO DEVEMOS ORAR?

a)	Nossas	orações	devem	ser	feitas	em	nome	de	Jesus.	(João	14.13-14)
b)	A nossa oração deve ser feta segundo a vontade de Deus (Mateus 6.10), a sua vontade será sempre boa, agradável e perfeita (Rm 12.2b).
c)	Precisamos estar em comunhão com Deus para que nossas oração sejam atendidas (Jo 15.7 / l Jo 3.22).
d)	Devemos orar sem cessar ( l Ts 5.17 / Cl 4.2 / Sl 40.1 / Ef 6.18 / Lc 18.1-8).

      `,
    imagem: require('@/assets/images/reset5.png'),
  },
  {
    modulo: 'reset',
    numero: '6',
    titulo: 'Lição 6 - Batismo',
    videoUrl: 'https://www.youtube.com/embed/mzPPMX60c4g?si=g4Dbbn4OMfXjMVQD',
    descricao:
      `
     INTRODUÇÃO
Há duas cerimônias ordenadas por Cristo para que os cristãos pratiquem: O Batismo em água e a Ceia do Senhor.
A palavra batismo tem muitos significados, dentre eles:

1.	Imerso, mergulho, lavado, limpo com água (W. C. Taylor).
2.	Cerimônia em que se usa água por meio da qual uma pessoa se torna membro de uma igreja cristã (Dicionário João Ferreira de Almeida).
3.	Uma ordenança cristã; banho com água simbolizando a limpeza dos pecados, unido ao arrependimento e admissão na comunidade dos fiéis (Dicionário Dake).

De todos os significados mais conhecidos, o grande consenso que existe nas igrejas cristãs evangélicas é que o batismo em água é um ato ou confissão pública de arrependimento e fé em Jesus Cristo, em que a pessoa declara publicamente que morreu para o mundo (sistema mundano) e ressuscitou para Deus.


REQUISITOS PARA O BATISMO
	Crer em Jesus (Marcos 16.16)
	Arrependimento (Atos 2.38)
	Confessar os seus pecados (Marcos 1.5 / Mateus 3.6)
	Desejo de ser batizado (Atos 2.37-41)
	Responsabilidade pelos seus atos em consciência do batismo (Atos 2.41 / Hebreus 10.22)


O PORQUÊ DO BATISMO
	Porque é uma demonstração de obediência ao Senhor (Mateus 28.19)
	Porque o próprio Jesus se batizou (Mateus 3.16)
	Porque precisamos dar testemunho público perante a igreja e o mundo da mudança de caráter que conquistamos através de Bíblia Sagrada (ll Coríntios 5.17 / Gálatas 3.27)
 
	Porque nos livros do Novo Testamento encontramos cerca de 70 referências à pratica do batismo


MÉTODOS
Imersão: Lavagem de todo o corpo
Aspersão: Lavagem de partes do corpo
Embora não tenhamos nenhuma referência bíblica clara sobre o método que devemos usar, a CRIEP tem como regra o batismo por imersão, simbolizando a morte da velha criatura e o renascimento de uma nova criatura. (ll Coríntios 5.17; Mateus 3.16).

Observação: Quando não é possível a imersão por algum motivo de saúde, a liderança da igreja opta pela aspersão.


MOMENTO CERTO PARA O BATISMO DE ALGUÉM
Na época do Antigo Testamento as crianças eram apresentadas ao Senhor (Lucas 2.22), e aos 12 anos (idade em que se considera iniciar-se o processo de consciência) eram entregues ao Templo para aprender os ensinos e tradições judaicas.
Por esse motivo, que muitos pais cristãos aconselham a seus filhos serem batizados a partir dos 12 anos, pois entendem que é necessário terem responsabilidade pelos seus atos e consciência dos mesmos. Por isso que nós da CRIEP não batizamos crianças, visto que elas ainda não são responsáveis pelos seus atos e decisões.


PORQUE NÃO PODEMOS DEIXAR DE NOS BATIZAR?
Porque o batismo nos identifica com Cristo:

1.	Na morte “Fomos batizados na sua morte.” (Romanos 6.3)
2.	No sepultamento: “ Tendo sido sepultados juntamente com Ele no batismo...” (CL 2.12/ RM 6.4)
3.	Na resurreição: “ Portanto, se fostes ressuscitados juntamente com Cristo...” (Colossenses 3.1) “...também seremos semelhantes na sua ressurreição” (Romanos 6.5).


QUEM PODE REALIZAR A CERIMÔNIA DO BATISMO?
Na RARA, cremos no sacerdócio de todos os crentes (l Pedro 2.9), ou seja, todos aqueles que já fazem parte da família de Deus por meio do batismo, podem realizar a cerimônia. Porém, como forma organizacional, estabelecemos essa responsabilidade aos presbíteros, evangelistas e pastores da nossa comunidade, ou alguém nomeado pelo corpo ministerial.
 
CONCLUSÃO

Através do batismo a pessoa dá um testemunho público de sua identificação com Cristo. É o sinal exterior que representa a morte para o mundo e a ressurreição para Deus. Cada um de nós repete de modo espiritual, o que aconteceu com Cristo. Ele morreu e ressuscitou. Assim, pelo batismo, nós provamos que somos vitoriosos por meio de Jesus Cristo.
Se você está realizando esse curso, sinta-se privilegiado por essas informações que você acabou de receber. Pense bem, e se você desejar tome a decisão de se batizar, e acredite uma vida abundante você terá em Jesus Cristo.

      `,
    imagem: require('@/assets/images/reset6.png'),
  },
  {
    modulo: 'reset',
    numero: '7',
    titulo: 'Lição 7 - Santificação',
    videoUrl: 'https://www.youtube.com/embed/6BoZ8MQh_P8?si=7yWKmlks8-geWSuI',
    descricao:
      `
      INTRODUÇÃO
A santificação é o estágio posterior ao da justificação e contínuo, sua prática diária é fundamental para estruturar nosso relacionamento com Deus, estabelecendo assim, o Reino de Deus em nossa vida e na vida de outras pessoas.


CONCEITO
O conceito da palavra santificação significa a separação das práticas mundanas em todos os sentidos da vida. Este processo caracteriza-se em levar o cristão a ser mais dedicado e comprometido com os padrões bíblicos espirituais, morais e comportamentais.
O texto de Hebreus 12.14 nos evidencia que o primeiro estágio da santificação é a sensação de paz, a qual precisamos ter para vermos a Deus. A Bíblia em sua rica instrução nos ensina que os principais objetivos em se santificar, implicam em agradar a Deus em nossas práticas diárias, estando sempre preparadas a servir a Deus de maneira íntegra e sólida.
Para que o Reino de Deus seja estabelecido na vida de uma pessoa, a santificação se torna um pré - requisito. Isso implica uma renúncia diária do nosso “eu” deixando aquilo que não agrada a Deus e buscando sua vontade. O texto de 1 Ts 4.7m nos revela que a santificação é mais do que uma decisão pessoal e intransferível de viver a sua palavra, mas é também um chamado de Deus. Após a escolha do Senhor em nos amar (Ef 1.4), Ele mesmo tem o interesse de nos moldar para sermos vasos úteis e santificados, sendo eficientes para a boa obra (2 Tm 2.21).


FONTES DE SANTIFICAÇÃO
Muitos usam seus gostos e ideologias pessoais para oferecer padrões de santidade. Porém a CRIEP acredita em três padrões fundamentais:


1.	Jesus Cristo
 
“Em Cristo Jesus, o qual se tornou, da parte de Deus, sabedoria, e justiça, e santificação e redenção” (l Coríntios 1.30).
“Nessa vontade é que temos sido santificados, mediante a oferta do corpo de Jesus Cristo, uma vez por todas” (Hebreus 10.10).

2.	Espírito Santo

“Para que eu seja ministro de Cristo Jesus entre os gentios “... uma vez santificado pelo Espírito Santo” (Romanos 15.16).
“Tais fostes alguns de vós vos lavastes, mas fostes santificados, mas fostes justificados em nome do Senhor Jesus e no Espírito do nosso Deus” (l Coríntios 6.11).
“Deus vos escolheu desde o princípio para a salvação, pela santificação do Espírito e fé na verdade” (ll Tessaloniceses 2.13).

3.	Bíblia Sagrada
“Santifica-vos na verdade, a tua palavra é a verdade” (João 17.17).
“Por que a Palavra de Deus é viva, e eficaz, e mais cortante do que qualquer espada de dois gumes, e penetra até o ponto alma e espírito...” (Hebreus 4.12).
“Guardo no coração as tuas palavras para não pecar contra ti” (Salmo 119.11).


ÁREAS DA SANTIFICAÇÃO
O ser humano é constituído de corpo, alma e espírito (l Tessalonicenses 5.23). E essas três áreas devem ser submetidas ao processo de santificação.
1.	Corpo
Devemos santificar e glorificar a Deus com todos os membros do nosso corpo, pois ele é a morada do Espírito de Deus (l Coríntios 3.16-17 e l Coríntios 6.20).

2.	Alma
Devemos não apenas santificar o nosso corpo, mas também nossos pensamentos, sentimentos, vontades, motivações e desejos (Atos 24.16 / ll Coríntios 1.12).

3.	Espírito
O espírito é a herança divina que Deus soprou em nós, porém com o Pecado Original, esse espírito foi enfraquecido. Não é à toa que Deus através de Jesus Cristo soprou sobre sua Igreja o Espírito Santo, para fortalecer o seu elo com o ser humano. (l Pedro 1.2)



CONCLUSÃO
 
Que em todo tempo possamos estar comprometidos em nos tornar pessoas mais santas. Não uma santificação aparente e demagógica, mas uma santificação que venha ser gerada no íntimo do nosso coração e frutificada em todas as nossas palavras e atitudes.

      `,
    imagem: require('@/assets/images/reset7.png'),
  },
  {
    modulo: 'reset',
    numero: '8',
    titulo: 'Lição 8 - Ceia do Senhor',
    videoUrl: 'https://www.youtube.com/embed/x3fofsEiiyw?si=FIftDDd3vgLngjsP',
    descricao:
      `
      INTRODUÇÃO
Há duas ordenanças estabelecidas por Jesus Cristo O Batismo em água, que vimos na aula passada, e a Ceia do Senhor (Eucaristia).
O termo “eucaristia” a partir dos relatos das comunidades cristãs dando início no primeiro século significativa “o partir do pão”. Ou seja, o oferecimento de ação de graças a Deus sobre o pão e o vinho na refeição cerimonial da igreja.


O QUE É A CEIA DO SENHOR OU EUCARISTIA?
É a celebração mais solene da Igreja, que tem por finalidade um duplo anúncio (l Coríntios 11.26):
1.	Anúncio da morte de Jesus para nos livrar da morte eterna.
2.	Anúncio da sua volta gloriosa.
A Ceia é constituída por dois elementos: o pão e o vinho. O pão simboliza o corpo de Cristo. “Tomai, comei, isto é o meu corpo” ( l Co 11.24). O vinho simboliza o sangue de Cristo. “Isto é o meu sangue” ( l Co 11.25).
Existem nas igrejas cristãs três tipo de ensino:
1.	Transubstanciação
É a ideia prevalecente na igreja católica, de que, ao serem consagrados, os elementos se tornam verdadeiramente corpo e sangue de Cristo. Crê-se que a hóstia nas mãos do sacerdote (padre se transforma integralmente no corpo e sangue de Jesus.

2.	Consubstanciação
Os adeptos da consubstanciação ensinam que a partir do momento que o sacerdote (pastor) faz a oração de consagração, além de permanecerem pão e vinho, também se transformam no corpo e sangue de Jesus.

3.	Ato memorial – No que acreditamos
 
Em muitas igrejas evangélicas, inclusive na RARA, entendemos pela Palavra de Deus, que a Ceia é um memorial, pois ao instituir essa ordenança Jesus disse: “Fazei isto em memória de mim” (l Co 11.24,25).

A CEIA EM RELAÇÃO À IGREJA
Quando participamos da Ceia significa que a Igreja vive num só corpo, num só espírito, numa só fé, num só pensamento (Efésios 4.4-6).


CONCLUSÃO
Na CRIEP, todo mês há pelo menos um culto da Ceia. Esse culto não foi ideia de um homem ou mulher, mas como vimos, foi instituído por Jesus. Esta é uma cerimônia espiritual, na qual os crentes devem participar em atitude solene, meditativa e reverente. Não apenas com aparência de santidade, mas como um pecador arrependido, anunciando que Ele morreu, ressuscitou e em breve voltará.

      `,
    imagem: require('@/assets/images/reset8.png'),
  },
  {
    modulo: 'reset',
    numero: '9',
    titulo: 'Lição 9 - Vícios',
    videoUrl: 'https://www.youtube.com/embed/1w0_5drOyKM?si=kWgpvMpfRa1hFkIh',
    descricao:
      `
      INTRODUÇÃO
Romanos 8:5-6
“Porque os que se inclinam para a carne, cogitam das coisas da carne, mas os que se inclinam para o Espírito, das coisas do Espírito. Porque o pendor da carne dá para a morte, mas o do Espírito, para a vida e paz.”
Efésios 5.18
“Não vos embriagueis com o vinho, em que há devassidão, mas enchei-vos com o Espírito Santo.”


O QUE É VÍCIO
Conceito: Disposição habitual para certo mal; mau costume. (Aurélio)
O vício nada mais é do que tentações que geram atos repetitivos, causando dependência sejam de que natureza for.


DE ONDE VÊM AS TENTAÇÕES?
I Coríntios 10.13
“Não vos sobreveio tentação que não fosse humana; mas Deus é fiel e não permitirá que sejais tentadas além das vossas forças; pelo contrário, juntamente com a tentação, vos proverá livramento, de sorte que a possais suportar”.

Os impulsos da carne têm a tendência de consumir o que gera prazer momentâneo e satisfação dos nossos desejos.
 
VENCENDO O VÍCIO
Nosso dia-a-dia deve ser guiado pelo Espírito Santo de Deus, isto é, viver segundo uma Palavra que me convence a não usufruir de coisas que podem gerar uma mal para meu corpo, alma e espírito.
Como podemos lutar contra os vícios?
“Sujeita-vos, pois, a Deus, resisti ao diabo, e ele fugirá de vós” (Tiago 4.7). Em Deus está a nossa força! Quando nos submetemos à sua vontade abrindo o coração para receber o Seu poder, o Espírito Santo obtém o controle de nossa vida. Isso não significa que nunca mais seremos tentados, mas que Ele nos dará força e graça para resistimos as tentações através do Seu poder.
l Coríntios 7.22
“Porque o que é chamado pelo Senhor, sendo servo, é liberto do Senhor; e da mesma maneira também o que é chamado sendo livre, servo é de Cristo.”
Alguma vez você já lutou contra hábitos que julgou ser impossíveis de vencer?
Há algum pecado que você tenha cometido várias vezes na vida ou que ainda cometa? Você já quis se libertar de algo que o escravizava?
Existe esperança?


CONCLUSÃO
Temos que analisar que para termos uma vida protegida das coisas que podem nos fazer mal, temos que ter a atitude de priorizar o que o Senhor nos ensina mediante a sua palavra.
Somente através da graça redentora de Cristo é que se pode viver sem droga ou qualquer tipo de vício, pois Ele é a verdade que liberta (João 8.32), o caminho a ser seguido para a vida eterna (João 14.6).
Colossenses 2.14
“Havendo riscado a cédula que era contra nós nas suas ordenanças, a qual de alguma maneira nos era contrária, e a tirou do meio de nós, cravando-a na cruz”.

      `,
    imagem: require('@/assets/images/reset9.png'),
  },
  {
    modulo: 'reset',
    numero: '10',
    titulo: 'Lição 10 - Jugo Desigual',
    videoUrl: 'https://www.youtube.com/embed/sWrRxP7sbJs?si=8nwuY1mRfT26HpM2',
    descricao:
      `
      INTRODUÇÃO
2 Coríntios 6.14-18
“Não vos prendais a um jugo desigual com os infiéis; porque, que sociedade tem a justiça com a injustiça? E que comunhão tem a luz com as trevas? E que consenso tem o templo de Deus vivente, como Deus disse: Neles habitarei, e entre eles andarei; e eu serei o seu Deus e eles serão o meu povo. Por isso sai do meio deles, e apartai-vos, diz o Senhor; E não toqueis nada imundo, E eu vos receberei; E eu serei para vós Pai, E vós sereis para mim filhos e filhas, Diz o Senhor Todo-Poderoso.”.


O QUE É JUGO DESIGUAL?
Salmos 1.1
“Bem-aventurado o homem que não anda segundo o conselho dos ímpios, nem se detém no caminho dos pecadores, nem se assenta na roda dos escarnecedores.”
Mediante a Palavra de Deus, se refere a uma aliança formada entre um cristão e um ímpio. Porém isso não significa que devemos abrir mão dos nossos amigos ímpios, mas através da ajuda do Espírito Santo, sermos instrumentos da graça de Deus para Alcança-los da mesma forma que um dia fomos alcançados.


CONVIVENDO COM JUGO DESIGUAL
1 Coríntios 7.14
“Pois o marido incrédulo é santificado pela mulher, e a mulher incrédula é santificada pelo marido crente. Doutra sorte os vossos filhos seriam impuros, mas agora são santificados.”
Quando vivemos uma situação a qual o conjugue ou os familiares não servem a Deus, temos a responsabilidade de levar um bom testemunho para que a casa seja santificada, e com jejum e oração esta pessoa será transformada em Cristo.
 
CONCLUSÃO
Temos que ficar atentos em relação a este assunto para não servos influenciados e deixarmos o objetivo principal que é viver uma vida na presença de Deus fazendo e falando coisas boas.
Que possamos com toda a força do nosso ser e com a ajuda do Espírito Santo, ser sal e luz dentro de um mundo tão sem sabor e tão obscuro. Que não venhamos nos amoldar ao sistema mundano, mas que por onde passarmos possamos transformar pela renovação da nossa mente, que agora é propriedade exclusiva do nosso Senhor e Salvador Jesus Cristo.

      `,
    imagem: require('@/assets/images/reset10.png'),
  },
  {
    modulo: 'reset',
    numero: '11',
    titulo: 'Lição 11 - SERVO',
    videoUrl: 'https://www.youtube.com/embed/sWrRxP7sbJs?si=8nwuY1mRfT26HpM2',
    descricao:
      `
      INTRODUÇÃO
Há uma grande diferença entre ser voluntário, empregado e servo na obra do Senhor. Vamos ver abaixo algumas características de cada um desses três tipos de pessoas.


VOLUNTÁRIO
Levítico 10.1-2
“Nadabe e Abiú, filhos de Arão, tomaram cada um o seu incensário, e puseram neles fogo, e sobre este, incenso, e trouxeram fogo estranho perante a face do Senhor, o que não lhes ordenara.”
Características desse tipo de pessoa:
	Escolhe como e quando servir;
	Faz somente o que lhe agrada;
	Não tem comprometimento;
	Não depende de Deus, mas da força própria;
	Não aceita cobrança;
	Nunca de dispõe ao sacrifício;

Paul Hoff escreveu: “As boas intenções não substituem a obediência.” Exemplo: Uzá morre ao tocar a Arca da Aliança (ll Samuel 6.6)

EMPREGADO
2 Reis 5:20
 
“Então Geazi, servo de Eliseu, homem de Deus, disse: Eis que meu Senhor poupou a este sírio Naamã, não recebendo da sua mão alguma coisa do que trazia; porém, vive o SENHOR que hei de correr atrás dele, e receber dele alguma coisa.”
Características desse tipo de pessoa:
	Faz as coisas pensando em receber algo em troca;
	Encara o trabalho na casa de Deus como um fardo;
	Se faz o que lhe é pedido e faz por obrigação;
	Se sente explorado se lhe é pedido algo a mais;
	Adora cargos, títulos e posição;
	Escolhe a quem servir (pastor ou líder possa ver seu trabalho e “recompensá-lo”);
	Sempre procura uma posição melhor (como um plano de carreira);


SERVO
Filipenses 2.7
“Antes a si mesmo se esvaziou, assumindo a forma de servo, tornando-se em semelhança de homens, e reconhecido em figura humana, a si mesmo se humilhou, tornando-se obediente até a morte, e morte de cruz.”
Marcos 10.45
“Porque o Filho do homem também não veio para ser servido, mas para servir e dar a sua vida em resgate de muitos”
Características desse tipo de pessoa:
	Faz o que o Senhor manda;
	Não tem direito;
	Tem um Senhor e dono;
	Toma a sua cruz;
	Não espera pagamento, gratidão e mordomia;
	Quer ser um mordomo na obra de Cristo;
	Faz o que é necessário para a obra;
	Tem alegria em contribuir para o Reino;


CONCLUSÃO
Servos são aqueles que realmente frutificam e multiplicam. A igreja só pode ser edificada com servos que agem por amor e renunciam o seu “eu” para que Cristo viva através de sua
 
vida. Tomar a cruz de Cristo não é um fardo e sim obediência a vontade de Deus, mesmo que ela seja contrária ao nosso próprio desejo. O servo se sacrifica pelo reino de Deus por amor a Sua Palavra.

      `,
    imagem: require('@/assets/images/reset11.png'),
  },

];

const start: Aula[] = [
  {
    modulo: 'start',
    numero: '1',
    titulo: 'Lição 1 - Conhecendo a bíblia',
    videoUrl: 'https://www.youtube.com/embed/q-w0MYaLKS8?si=NODP5_RzTWoyvNJc',
    descricao:
      `
      INTRODUÇÃO
Você já tem em suas mãos a Bíblia Sagrada. Só nela você encontra tudo o que Deus fez para dar a salvação e a vida eterna às pessoas. Por isso, a Bíblia é também conhecida como a Palavra de Deus.


l. A BÍBLIA EM SUAS MÃOS
O que significa a palavra “Bíblia”?
Para você descobrir a resposta, primeiro, tem de entender que esta palavra quer dizer “livros”, isto é, vários livros em um só. É provável que em sua Bíblia logo nas primeiras folhas, haja um índice, onde estão escritos os nomes de todos os livros que compõem a Bíblia. Procure-o e dê uma lida neles. Você concluirá que não se pode ser crente sem a Palavra de Deus em sua totalidade. Por isso, os autênticos cristãos devem carregar, ler, estudar e meditar constantemente nessa	suprema	verdade,	a	Bíblia	Sagrada.

A Bíblia, é a palavra de Deus porque através dela o Senhor se dá a conhecer aos homens e mulheres. Isto se chama revelação divina. Deus fala conosco através da Bíblia. Lendo-a, você começa a conhecer o Senhor, a entendê-lo e a obedecer suas orientações na sua vida particular e na participação da igreja na qual você faz parte.
A revelação de Deus que se encontra na Bíblia foi escrita por cerca de 40 pessoas em dois idiomas, o hebraico e o grego, que são bem diferentes do português. Isto aconteceu há muitos anos. Os autores foram profetas, reis, sacerdotes, pescadores, criadores de gado etc. Deus escolheu estas pessoas e as usou apesar das suas imperfeições e seus diferentes conhecimentos da vida humana. Este é o lado maravilhoso da Bíblia. Apesar dos livros serem escritos por pessoas diferentes, em épocas bem distantes, e depois reunidos num livro só, a Bíblia é completa e perfeita em unidade e harmonia. Deus inspirou estas pessoas para escreverem, capacitando- as a receber e transmitir o ensino sem mistura ou erro. A inspiração divina é também a garantia de que as pessoas escolhidas escreveram apenas o que Deus queria, sem os sinais da fraqueza humana. Leia a seguir o que disse Paulo, um dos escritores: “Toda a escritura é divinamente inspirada...” (2 Timóteo 3.16ª).
 

ll. COMO USAR A BÍBLIA NA IGREJA
A primeira parte da Bíblia, que começa com o livro de Gênesis e termina com o livro de Malaquias, chama-se: Antigo Testamento ou, abreviando-se, AT. São ao todo 39 livros. Depois de Malaquias, o ultimo livro do Antigo Testamento, inicia-se o Novo Testamento, conhecido pelas letras iniciais NT e tem 27 livros. Juntos, AT e NT somam 66 livros. Um detalhe interessante é que os 66 livros não estão organizados pela ordem de data em que foram escritos. A preocupação de Deus não foi contar uma história cronológica, mas sim, revelar o seu plano para salvar todos os homens e mulheres.
Para que se encontre facilmente um texto, cada livro da bíblia é dividido em capítulos ou números e versículos ou versos. O número em tamanho grande ao lado esquerdo das palavras impressas indica o Capítulo ou número, e o menor, o
versículo ou verso. Antes do início de cada capítulo, ou de alguns grupos de versículos, você encontra o título do assunto. É bom você saber que os escritores da Bíblia não escreveram os títulos, capítulos, versículos, etc. Todos estes recursos foram adotados muitos anos depois para facilitar a leitura e o estudo da bíblia.
Existem diversas versões de tradução da Bíblia. As versões são resultantes de atualizações de uma tradução. A tradução significa que tudo o que estava
escrito em hebraico (AT) e grego (NT) foi traduzido para o português. A tradução principal utilizada no Brasil é a de João Ferreira de Almeida. Desta tradução, existem as versões que apresentam diferenças, não nas mensagens, mas nas palavras.
Veja um exemplo: numa versão, você lê em 1 Coríntios 13: “Caridade” e em outra, publicada mais recentemente, “amor”. A questão é que com o passar do tempo a palavra “caridade” tomou outro sentido e não é tão forte como o termo “amor”. Por causa das diferentes versões, você escuta as pessoas lerem o mesmo versículo de maneiras diferentes.



lll. COMO USAR A BÍBLIA NO DIA-A-DIA
Você não deve usar a Bíblia apenas em alguns momentos, pois se limitar o uso dela o seu crescimento espiritual acontecerá lentamente. Um passo que você deve dar para crescer espiritualmente é estudar profundamente a Palavra de Deus. Devem acompanhar você num estudo mais aprofundado da Bíblia os seguintes materiais:



a)	A Bíblia
Se possível, use várias versões existentes em português para consulta comparativa;
 
b)	Uma concordância Bíblica
Ajuda a localizar palavras, assuntos e suas referências bíblicas, livro por livro;

c)	Chaves Bíblicas
Traz esboços dos livros da Bíblia e também introdução dos autores, história e datas;

d)	Dicionário Bíblico
Para a explicação de palavras e assuntos bíblicos;

e)	Dicionário de Português
Para saber o significado das palavras pouco conhecidas por você;

f)	Um caderno
Para anotações das observações e correlações do seu estudo.

      `,
    imagem: require('@/assets/images/start1.png'),
  },
  {
    modulo: 'start',
    numero: '2',
    titulo: 'Lição 2 - Conhecendo a Deus',
    videoUrl: 'https://www.youtube.com/embed/w4KbJsqNDC4?si=XN_Zz_gUgpULRD00',
    descricao:
      `
      INTRODUÇÃO
Deus tem múltiplos nomes que legitimam sua grandeza e excelência dando respaldo ao ser humano sobre sua existência e convicção. Seguem algumas informações que podem te ajudar a conhecer um pouco do muito que é o nosso Deus.


l. CONHECENDO DEUS ATRAVÉS DE SUAS QUALIDADES
Deus tem muitas qualidades através das quais Ele se identifica com o ser humano e, ao mesmo tempo, torna-se diferente de todos os outros seres espirituais. Uma das formas de você descobrir algumas dessas qualidades é conhecendo alguns dos seus variados nomes. O nome de Deus é muito mais do que um conjunto de letras do português ou de qualquer outro idioma. Na bíblia, os nomes de Deus mais comuns são: Senhor, Jeová, Pai, terno, Altíssimo etc. Independente da nomenclatura escolhida, seguem algumas referências importantes de como devemos tratar o Seu nome:


a)	O seu nome deve ser invocado na adoração (leia Gênesis 12.8);
b)	O seu nome deve ser temido (leia Deuteronômio 28.58);
c)	O seu nome deve ser louvado (leia 2 Samuel 22.50);
d)	O seu nome não pode ser tomado em vão (leia Êxodo 20.7);
e)	O seu nome não pode ser profanado, nem blasfemado (leia Levítico 18.21;24.16);
f)	O seu nome deve ser santificado e bendito (leia Mateus 6.9


ll. CONHECENDO DEUS ATRAVÉS DOS ASPECTOS DO SEU CARÁTER
Seguem algumas características EXCLUSIVAS de Deus:
 
a)	Soberania: Para você, pode ser encorajador porque te fornece a segurança de que nada está fora do controle do Senhor e os Seus planos são, de fato, realizados. Leia Sl 29.10,71.16.f
b)	Eternidade: Nunca houve um tempo em que Deus não existisse. Ele não teve princípio e jamais terá fim. Não se limita ao tempo. Sendo eterno, Ele vê o passado e o futuro de modo tão claro como contempla o presente. Nesta perspectiva, Ele sabe o que é melhor para a vida do cristão. Leia Isaías 44.6
c)	Onisciência: Deus possui todo o conhecimento que existe. Nada o pega de surpresa. A onisciência do Senhor permite que Ele tenha conhecimento de tudo antes e depois. Leia Hebreus 4.13.
d)	Onipresença: Significa que Deus está presente em todo o tempo e espaço. Ninguém pode se esconder de sua face. Mas a presença do Senhor deve ser experimentada em todo o tempo de maneira bem real. Leia Jeremias 23.24.
e)	Onipotente: Deus tem mais do que o poder necessário para realizar todas as coisas. O crente tem certeza de sua salvação porque o Senhor é Todo-Poderoso. Esta força se manifesta no Evangelho de Cristo para salvação dos homens. Leia Romanos 1.16.
f)	Imutável: Jamais muda em Sua natureza e postura. Será sempre bom, justo e verdadeiro. Leia Números 23.19.
Existem também os aspectos partilhados de Deus para com o ser humano. São características que Deus espera que nós, Seus filhos, também possamos ter. Estes aspectos se manifestam de forma limitada.
a)	Retidão: É impossível Deus fazer algo errado. Por causa de sua retidão, Ele espera o mesmo de todos os que desejam estar em Sua presença. É um estilo de vida para ser vivido pela graça de Deus, pois é humanamente impossível ao homem e à mulher terem a retidão total de Deus. Leia Mateus 5-48.
b)	Justiça: Deus jamais age com desonestidade. A justiça divina é manifestada no livramento do inocente. Leia 2 Timóteo 4-8.
c)	Amor: É um outro aspecto divino. Na verdade, Deus é amor. Esta virtude do Senhor é perfeita e infinita. A maior demonstração do amor de Deus foi a de conceder o seu próprio filho para morrer em nosso lugar através do Seu sacrifício na cruz do Calvário. Leia João 3.16.
d)	Verdade: Deus é a verdade absoluta. O homem e a mulher desejam ardentemente encontrá-la. Porém, muitos a procuram em outras fontes. Como você é de Jesus, sua busca terminou, pois Cristo é a verdade. Por esse motivo, viver distante da mentira deve ser um dos grandes objetivos em nossa vida cristã. Leia João 8.32.


lll. CONHECENDO DEUS, JESUS E O ESPÍRITO SANTO
O Pai, Jesus Cristo e o Espírito Santo existem em unidade são três pessoas reais e distintas. Elas trabalham juntas em favor do ser humano. Em João 15.26 existe uma afirmação de Jesus: “Mas quando vier o Consolador, que eu da parte do Pai vos hei de enviar, aquele Espírito de verdade, que procede do Pai, ele testificará de mim”. Isso significa que há unidade entre o Pai, Jesus Cristo e o Espírito Santo de tal forma que os três são um, ou seja, um só Deus. Leia 2 Coríntios 13.14.

      `,
    imagem: require('@/assets/images/start2.png'),
  },
  {
    modulo: 'start',
    numero: '3',
    titulo: 'Lição 3 - A Salvação',
    videoUrl: 'https://www.youtube.com/embed/nctL4jP0bHY?si=E3G6gwLGiiv9-SLq',
    descricao:
      `
      INTRODUÇÃO
A salvação é a maior benção que o ser humano pode receber, e ao mesmo tempo é a maior responsabilidade. A salvação é o tema central da Bíblia. Todo cristão deve conhece-la bem e falar dela aos que ainda não aceitaram a Cristo para que também sejam salvos.


l. O QUE É A SALVAÇÃO?
A princípio, pode-se afirmar que ela é o resultado da morte de Jesus Cristo na cruz do Calvário, que livra a humanidade da condenação eterna causada pelo pecado. Leia Efésios 1.7; 2,1. Podemos dividir o conceito da palavra salvação em dois atos:
1.	Um ato da soberana vontade de Deus
A salvação é um ato da soberana vontade de Deus, sob a qual seu filho nos reconciliou consigo mesmo. Está relatado em 2 Coríntios 5-18.19: “ E tudo isto provém de Deus, que nos reconciliou consigo mesmo por Jesus Cristo, e nos deu o ministério da reconciliação: isto é, Deus estava em Cristo reconciliando consigo o mundo, não lhes imputando os seus pecados...”. Observe que a salvação é a demonstração do grande amor de Deus em favor da humanidade, condenada pelo pecado. Leia Romanos 5.8. Ela é oferecida a todos, sem exceção. Em Cristo, todos podem ser salvos, libertos do pecado, tornando-se, assim, filhos de Deus. Leia João 1.12.
2.	Um ato da infinita misericórdia de Deus
A salvação vem graciosamente mediante a fé e não através dos nossos próprios méritos ou boas obras. O próprio criador tomou a decisão de reconciliar consigo o homem e a mulher, que pela desobediência, haviam se afastado dEle, tornando-se escravos do pecado e inimigos de quem os criara. Você também precisa saber que a sua salvação custou um alto preço, o sangue de Jesus Cristo, o Cordeiro de Deus (João 1.29), imolado pelos nossos pecados na cruz do Calvário conforme a profecia de Isaías 53.4-7. Leia também Efésios 2.8,9.



ll. A NECESSIDADE DA SALVAÇÃO
 
Todos precisa arrepender-se dos seus pecados, confessá-los a Deus e abandoná-los definitivamente aceitando o dom gratuito de Deus. Leia Romanos 6.23.
1.	A origem do pecado
Como o pecado entrou no mundo, como isto aconteceu?
Em Genesis 1.26,27 lemos que Deus criou o homem e a mulher à sua imagem e semelhança e o colocou no Jardim do Éden. Disse-lhes que de todos os frutos podiam comer, porém, daquele da árvore do conhecimento do bem e do mal, o Senhor lhes proibiu que provassem. Feitos à imagem e semelhança de Deus, o homem e a mulher possuíam o livre-arbítrio. Estavam capacitados a discernirem o bem e o mal, o certo e o errado. Enquanto obedecessem viveriam. Todavia, apesar de usufruir das delícias do Éden e conviverem em perfeita harmonia com o Criador, o homem e a mulher, tentados, pecaram e foram destituídos da glória com que foram criados perdendo, assim, a comunhão com Deus. Como representantes da raça humana, eles transmitiram o pecado e a condenação à sua descendência. A desobediência de Adão afetou toda criação, a qual geme e chora sob o peso da maldição. Leia Genesis 3.6,17-19 e Romanos 8.22.
2.	A herança do pecado
A salvação é a vida eterna em Cristo Jesus, visto que só Ele pode salvar o homem da condenação da morte eterna, causada pelo pecado do primeiro homem. Veja o que relata a Bíblia: “Porque todos pecaram e destituídos estão da glória de Deus” (Romanos 3.23). “Pelo que, como por um homem entrou o pecado no mundo, e pelo pecado a morte, assim também a morte passou a todos os homens; por isso, que todos pecaram” (Romanos 5.12). Esta é uma revelação terrível: “a morte passou a todos os homens...”. Deste modo, o pecado foi a herança maldita deixada a humanidade.
Como escapar desta condenação?
Veja a importância da salvação: você estava morto em delitos e pecados e nada podia fazer para escapar do juízo divino. Porém, Deus, em Seu filho, o libertou da condenação da morte eterna. Leia João 5.24. Você, agora, não precisa temer o juízo final, pois Jesus, mediante a Sua morte na cruz do calvário, condenou o pecado e concedeu a vida eterna a todos que nEle crerem. Cristo anulou por Sua morte e ressurreição os efeitos do pecado, que são a morte eterna e suas consequências.	Leia	Romanos	8.1.

lll. ASPECTOS DA SALVAÇÃO
São dois:
1.	Justificação
Como se justificaria o homem para com Deus?
A humanidade, morta em seus delitos e pecados, não tinha como justificar-se perante o Todo- Poderoso. Porém, mediante Sua morte expiatória e substitutiva, Jesus tornou possível a justificação do transgressor.


Como é possível isto?
 
Justificação é um termo judicial que lembra um tribunal, em que Deus (o supremo juiz) absolve o pecador das suas transgressões e o declara justo, isto é, justificado. Desta forma, Deus (o ofendido) reconcilia consigo mesmo a humanidade (o ofensor). O que a humanidade não pôde fazer Deus o fez por ela. A justiça de Cristo (o justo) é concedida ao ser humano mediante a graça divina. Agora, feito justo pela de justiça de Cristo que lhe foi concedida, ele se torna membro da família divina e adotado como filho de Deus mediante o batismo nas águas. Leia Romanos 5.17-19.
2.	A santificação
Uma vez restaurada a comunhão com Deus, a humanidade abandona as práticas pecaminosas do passado e separa-se (santifica-se) para serviço do Senhor. A santificação é um ato do Espírito Santo no interior do cristão, que se reflete nos seus atos exteriores. Portanto, justificação e santificação são os dois aspectos da salvação plena em Cristo Jesus. Ao subir ao céu, o Senhor Jesus ordenou aos Seus discípulos que realizassem a obra que ele iniciara em seu ministério terreno. Desde então, todos os que realmente aceitam a Cristo como o seu Senhor e Salvador cumprem o “Ide”, a fim de ganharem vidas para o Reino de Deus.


IV. JORNADA DA VIDA CRISTÃ
A.	Confissão de fé em Jesus Cristo
1 Joaõ 4.15: “Qualquer que confessar que Jesus é o Filho de Deus, Deus está nele, e ele em Deus.”
B.	Justificação pela fé em Jesus Cristo
Romanos 5.1: “Tendo sido, pois, justificados pela fé, temos paz com Deus, por nosso Senhor Jesus.”
C.	Batismo nas águas
Atos 8.9: “ E Felipe mandou parar o carro, e descerem ambos à água, tanto Felipe como o eunuco, e o batizou.” (At. 8.38).
D.	Santificação
Romanos 6.19(b): “Assim apresentai agora os vossos membros à justiça para a santificação.”

      `,
    imagem: require('@/assets/images/start3.png'),
  },
    {
      modulo: 'start',
      numero: '4',
    titulo: 'Lição 4 - Conhecendo a Igreja',
    videoUrl: 'https://www.youtube.com/embed/5WUd_c4cQxA?si=iHzaeD69ctGbyu0e',
    descricao:
      `
      INTRODUÇÃO
Você faz parte da Igreja, pois não apenas recebeu a salvação oferecida por Cristo, mas também foi incluído em Sua família. A palavra “Igreja”, nesta lição não está restrita a CRIEP (Igreja Evangélica Pentecostal Comunhão Rara da Fé) ou a qualquer outra denominação, nem ao local onde você frequenta os cultos. Depois do plano idealizado por Deus para salvar a humanidade, a igreja é uma das mais lindas criações da divindade. Aqueles que são salvos formam um corpo, que é a porta-voz da salvação para outras pessoas. A igreja é um organismo que tem a própria vida em Cristo, o qual estabeleceu sua missão. Quem faz parte desta igreja dá continuidade ao trabalho de Cristo na terra, isto é ser uma benção para o mundo. Ninguém recebeu a salvação simplesmente para ser salvo, mas sim para integrar-se à igreja. Por isso, é preciso que você compreenda bem o que ela significa, conheça quais são os seus objetivos e a suas ordenanças.


l. OQUE É A IGREJA?
A palavra “Igreja” significa “uma reunião de pessoas chamadas para fora” ou seja, um grupo de pessoas que saíram do mundo (espiritualmente falando) para seguirem a Cristo. Todos os cristãos espalhados pelo mundo formam a igreja. Ela não está restrita à uma área geográfica e nem a um único povo da terra, antes é invisível e universal.
Existem dois símbolos que representam a Igreja:
1.	Corpo
Jesus não está mais presente de forma física, mas em cada pessoa que o recebe, em qualquer parte do mundo, ele introduz a Sua vida para conectá-la ao corpo. Por ter a vida em Cristo, a Igreja não é um simples ajuntamento de pessoas, uma associação ou clube. É um organismo, algo que têm existência tal como o corpo humano. É um composto de muitos membros e órgãos que funcionam em prol de uma vida comum. Da mesma forma que o ser humano é um, mas tem milhões de células vivas, assim também é a igreja. Um corpo, mas constituídos por milhões
 
de pessoas nascidas de novo por intermédio do Evangelho de Jesus. Possui também um cabeça, o próprio Cristo. Ele é o líder, o guia, o principal da Igreja. Leia Efésios 2.19-22 e Colossenses 1.18.
2.	Casa de Oração
Embora Deus habite em toda parte, é saudável nos reunirmos como Igreja local para juntos adorarmos e louvarmos ao Senhor. Leia Hebreus 10.24-25.
Infelizmente, por conta de uma série de acontecimentos tristes dentro de algumas igrejas, muitos estão adotando uma ideologia chamada de: “Cristãos sem igreja”.
Por mais que respeitamos as pessoas que pensam assim, de forma algumas, essa ideologia fará parte do nosso DNA. Sabemos sim, das tristezas geradas por líderes irresponsáveis, mas também sabemos do quão é apaixonante servirmos numa igreja Local.
Uma vez Bill Hybels escreveu: “A Igreja Local é a esperança do mundo quando funciona corretamente.”


ll. OS OBJETIVOS DA IGREJA
Através da Bíblia, você descobre que a Igreja foi fundada por Cristo para cumprir as seguintes finalidades:
1.	Evangelizar o mundo
A principal atividade dos cristãos é levar a salvação para os não cristãos. Cristo, depois de completar a Sua missão na Terra, declarou: “É me dado todo o poder no Céu e na Terra. “E, em seguida, estabeleceu uma missão aos Seus seguidores.
Leia Mateus 28.19 e 20. É através da Igreja que o Evangelho é pregado a todas as pessoas do mundo. Esta missão não foi dada aos anjos e nem a outro ser espiritual, mas aos cristãos que formam a Igreja.
2.	Lugar para o cristão cultuar a Deus e aprender da Sua Palavra
O culto é o momento de oração, louvor, adoração e edificação dos cristãos. No culto, todos os cristãos podem se unir em oração, petição, ação de graças e intercessão. O culto também é uma oportunidade para os cristãos estudarem a Biblia. A pessoa aumenta o seu crescimento espiritual quando a palavra é compreendida com sabedoria em um culto ou estudo bíblico. Quando os cristãos se reúnem para cultuar a Deus, existe a oportunidade para que venham praticar a comunhão muito mais do que uma simples amizade. A comunhão é resultante de uma experiência comum. Todas as diferenças são eliminadas, e os homens e as mulheres se tornam irmãos em Cristo. Na igreja, você é aperfeiçoado para o desempenho do serviço e edificação/construção do corpo de Cristo. Leia Hebreus 10.25, 1João 1.6-7 e Colossenses 3.16.
3.	Lugar para o crente praticar a mordomia (serviço) cristã
Tudo o que você possui não lhe pertence (Leia salmos 24.1). Por isso, não tem o direito de fazer o que quer. Deus está em primeiro lugar em sua existência. Isso inclui sua vida, seu tempo, seus talentos e suas finanças. Você deve buscar o Reino de Deus e a Sua justiça e ter a certeza que as demais coisas serão acrescentadas. Leia Mateus 6.33.
 
Exemplo:
	Passar boa parte do seu tempo cultuando a Deus e o servindo na evangelização;
	Empregar todos os seus talentos na igreja, para torná-lo forte e vibrante;
	Investir financeiramente através dos dízimos e ofertas;
	Dedicar os seus bens ao Senhor, pois você prestará conta a Ele de tudo o que administrou nessa vida.


lll. AS DUAS ORDENANÇAS DA IGREJA
Há duas cerimônias ordenadas por Cristo para que os Cristãos as pratiquem: o batismo em água e a Ceia do Senhor (Eucaristia).
1.	O Batismo
Através do batismo, a pessoa dá um testemunho público de sua identificação com Cristo, É o sinal exterior que representa a morte para o mundo e a ressurreição para Deus.
Cada um de nós repete, de modo espiritual, o que aconteceu com Cristo. Ele morreu e ressuscitou. Assim, pelo batismo você prova que é vitorioso. O batismo em águas não salva, porque em si, não tem poder para tal. As igrejas locais estabelecem esta pratica para que o novo crente se torne membro dela. A maioria das denominações evangélicas não batiza crianças, porque entendem que essa decisão precisa ser muito bem avaliada pela própria pessoa. Mateus
3.11 e 28.19, Marcos 1.9, João 1.32-33 e Atos 2.38.
A CRIEP, como a maioria das denominações evangélicas, não batizam crianças com menos de 12 anos de idade, pois entendemos que essa decisão precisa ser muito bem avaliada.
2.	Ceia do Senhor (Eucaristia)
Na CRIEP, todo mês há pelo menos um culto de ceia. Esse culto não foi ideia de um homem ou mulher, mas foi instituído por Jesus na véspera da Sua crucificação, para os cristãos relembrarem da Sua morte através do pão e do vinho. O primeiro simboliza o seu Corpo, e o segundo, o Seu sangue. Não somente para relembra a Sua morte vitoriosa, mas os cristãos tomam a Ceia do Senhor para anunciar a Cristo, até que Ele volte. Para participar da Ceia, cada um deve examinar-se a si mesmo e remover qualquer impedimento. Não apenas com aparência de santidade, mas como um pecador arrependido e um instrumento para ser usado no testemunho de Cristo aos homens e mulheres perdidos. Leia Mateus 26.26-29, 1 Coríntios 10.16 e 11.26-31.


lll. AS DUAS ORDENANÇAS DA IGREJA
Há duas cerimônias ordenadas por Cristo para que os Cristãos as pratiquem: o batismo em água e a Ceia do Senhor (Eucaristia).

      `,
    imagem: require('@/assets/images/start4.png'),
  },
  {
    modulo: 'start',
    numero: '5',
    titulo: 'Lição 5 - Princípios da Oração',
    videoUrl: 'https://www.youtube.com/embed/8XFZ2DwA3V0?si=pSTtmmRS3hR2LRcm',
    descricao:
      `
      INTRODUÇÃO
Nesta lição, você vai conhecer o quanto é bom orar, e vai aprender que tudo quanto se pede ao Senhor, com fé, mediante Sua vontade, se recebe.


l. O QUE SIGNIFICA ORAR?
Conversar com Deus: É o diálogo que devemos manter com o Pai celestial.
É ter comunhão com Deus: Ela faz com que as pessoas sintam a comunhão real com seu criador. Seria impossível para os cristãos, no decorrer da historia da Igreja enfrentar os tribunais, as arenas, as fogueiras, os pelotões de fuzilamento, as prisões, a fome e a sede, a perseguição, a incompreensão, e tantos outros males, não fosse com a certeza de que não estavam sozinhos, mas sentiam uma “mão” que lhes segurava e uma “voz” suave a lhes dizer: “Coragem, meus amigos, pois estou aqui para lhes conceder a vitória e, logo mais, vocês estarão comigo!”
Orar não é rezar: Como já foi dito anteriormente, orar é conversar com Deus, é dialogar com Ele. Deve fluir normal e espontaneamente. O Espírito Santo nos inspira as palavras que devem ser ditas nas orações que fazemos. Não é errado reproduzirmos orações feitas por outras pessoas, mas na maioria das vezes é importante usarmos as nossas próprias palavras, fugindo, assim, das vãs repetições.
Os discípulos pediram a Jesus que lhe ensinasse a orar. O Mestre, de pronto, lhe respondeu:
“Pai nosso que estás nos céus! Santificado seja o teu nome. Venha o teu Reino; seja feita a tua vontade, assim na terra como no céu. Dá-nos hoje o nosso pão de cada dia. Perdoa as nossas dívidas, assim como perdoamos aos nossos devedores. E não nos deixe cair em tentação, mas livra-nos do mal, porque teu é o Reino, o poder e a glória para sempre. Amém”. Mateus 6.9-13 (NVI).
Esta é uma oração ensinada por Jesus e utilizada pela maioria das igrejas evangélicas nos dias atuais.
 
ll. COMO ORAR?
De joelhos: Muitos consideram esta a melhor maneira de se conversar com Deus, pois é uma demonstração de submissão, reverência e humildade. Leia Efésios 3.14.
De pé: Este modo refere-se a Josafá, rei de Judá, que em pé, diante do povo, orou a Deus, e recebeu a resposta imediatamente. Os cristãos costumam orar em pé, no início, durante e no fim dos cultos. Leia 2 Crônicas 20.5-6.
Deitado: Esta passagem registra a enfermidade de Ezequias, rei de Judá. Acamado, recebeu a visita do profeta Isaías que lhe transmitiu o recado de Deus a respeito de sua morte iminente: “Morrerás, e não viverás”. Deitado, Ezequias virou o rosto para a parede e orou. O Senhor o ouviu e concedeu mais 15 anos de vida. Leia 2 Reus 20.2-3.


lll. ONDE ORAR?
Na Casa de Oração: Biblicamente, todas as igrejas evangélicas dedicadas a Deus, tornam-se uma Casa de Oração. Nela, os Cristãos se reúnem para buscar a presença de Deus e receber Suas bênçãos. Consagrações, Reuniões de Oração e Vigílias são encontros já tradicionais em nossas igrejas. Ocasiões em que adoramos a Deus, Ele nos enche com o Espírito Santo, cura nossas enfermidades e nos ajuda em orientação para resolvermos os nossos problemas. Leia Mateus 21.13.
Em particular: Jesus, em seu Sermão da montanha, enfatizou que a oração feita em particular é ouvida pelo Senhor, que vê secretamente. Leia Mateus 6.6.
Em família: Aqueles primeiros cristãos ainda não tinham um templo-sede para se reunirem, utilizavam as casas dos irmãos em Cristo para cultuar ao Senhor. Oravam exatamente na residência de Maria, mãe do evangelista Marcos (escritor do segundo evangelho), quando um anjo de Deus, em resposta às suas orações, visitou o cárcere onde estava preso o apóstolo Pedro, e o libertou. Leia Atos 12.12.


IV. QUANDO ORAR?
Ao deitar-se: Depois de um dia estafante, principalmente em uma cidade grande, onde se enfrenta perigos mil, é dever do crente orar ao deitar e agradecer a Deus pelos grandes livramentos, pela proteção a Deus pelos grandes livramentos, pela proteção dos assaltos, das batidas do carro no trânsito, dos atropelamentos; pela saúde e por tudo que lhe acontece, pois a Bíblia recomenda: “Dando sempre graças por tudo a nosso Deus e Pai em nome do nosso Senhor Jesus Cristo” – Efésios 5.20.
Ao levantar-se: Nossas vidas estão entregues nas mãos de Deus. Por isso, também o nosso dever, ao iniciarmos o novo dia, orar, para que o Senhor mande os seus anjos, a fim de nos livrar de todos os perigos; conforme lemos no Salmo 91.11; “Porque aos Seus anjos dará ordem a teu respeito, para te guardarem em todos os teus caminhos”.
Sempre: Quem vive em total dependência de Deus, através da oração, é sempre vitorioso. Orar sempre significa viver as 24 horas do dia em constante comunhão com Deus. No deitar,
 
levantar, trabalhar, viajar e com o pensamento sempre voltado para as coisas espirituais. Leia 1 Tessalonicenses 5.17.

V. ASSUNTOS PRESENTES NUMA ORAÇÃO ADORAÇÃO
João 4.24:” Deus é Espírito, e importa que os que o adoram em espírito e em verdade.”
CONFISSÃO
Daniel 9.20(a): “Estando eu ainda falando e orando, e confessando o meu pecado.”
AGRADECIMENTO
Salmos 100.4: “Entrai pelas portas dele com gratidão, e em seus átrios com louvor...”
PETIÇÃO
Filipenses 4.6: “Não estejais inquietos por coisa alguma, antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica...”

      `,
    imagem: require('@/assets/images/start5.png'),
  },
  {
    modulo: 'start',
    numero: '6',
    titulo: 'Lição 6 - O Discípulo Obediente',
    videoUrl: 'https://www.youtube.com/embed/QFN28g7PwZM?si=LHFCCQ5PHsJzTiat',
    descricao:
      `
      INTRODUÇÃO
A obediência, segundo definem os dicionaristas, é o ato de submeter-se à vontade de alguém. Nesta lição, porém, você vai aprender que se tratando do discípulo cristão, a obediência está profundamente ligada à fé, através da qual somos introduzidos à presença do Deus invisível, a quem voluntária e conscientemente nos submetemos. Por crermos na Sua soberania sobre todas as coisas, nos dispomos a viver em obediência à sua Palavra, à Igreja e àqueles que Ele estabeleceu para ministrar o Seu povo.


EXEMPLOS DE OBEDIÊNCIA
A obediência é uma virtude exemplificada em todos os livros da Bíblia. Porém, na mesma Bíblia, você também encontra registros sobre a desobediência e suas tristes consequências. Cabe-nos olhar para estes exemplos e tirarmos lições que podem nos ajudar a pôr em prática a obediência e não repetir os erros daqueles que não souberam honrar a Deus.
1.	A obediência de Abraão
Deus fez uma determinação ao patriarca Abraão baseada em algumas condições. Ele devia deixar sua terra, sua parentela, a casa de seus pais, e seguir para uma terra distante, a qual não conhecia. Estas condições implicavam basicamente em um princípio: obediência. Leia Gênesis 12.1.
É importante entendermos que a obediência não impõe apenas condições, mas traz também privilégios. Abraão seria pai de uma grande nação, abençoado, engrandecido e uma benção para todas as famílias da terra. E mais, aqueles que o abençoassem seriam abençoados; os que o amaldiçoassem, seriam amaldiçoados.
Vale lembrar, por conseguinte, que todas as vezes que Deus determinou alguma coisa a alguém, o intuito não era o obedecer por obedecer, ou simplesmente para fazer valer a Sua soberania. Havia um propósito pré-estabelecido. Neste caso, o propósito maior era formar uma nação pela qual o redentor, Jesus Cristo, viesse ao mundo, Se Abraão não obedecesse, ficaria privado de
 
ter o privilégio de constar em sua biografia o registro de progenitor da raça Judaica que trouxe o	Salvador	da	Humanidade. Não obstante Abraão ser um exemplo de obediência houve um momento em sua vida cuja precipitação trouxe consequências drásticas que repercutem até os dias de hoje. Foi quando Deus prometeu um filho em sua velhice. Induzido por Sara, sua mulher, que já não acreditava mais em sua capacidade de gerar nem mesmo por intervenção divina, Abraão acabou tendo um filho com sua escrava Agar, fora do plano de Deus. O resultado é que logo surgiram os conflitos, principalmente depois que nasceu Isaque, o filho da promessa. Para resumir, ainda hoje as consequências aí estão com as hostilidades entre árabes (descendentes de Ismael) e israelenses (descendentes de Isaque). Leia Gênesis 15.1-21 e 16.1-16.


ll. A QUEM DEVEMOS OBEDECER?
1.	Devemos obedecer a Deus através de Sua Palavra
Não obstante à Sua transcendência, ou seja, a Sua elevada posição como Criador de todas as coisas, que habita num alto e sublime trono, Deus se revelou a nós através da Sua Palavra e de Jesus Cristo, Seu filho. Portanto, ao estudarmos a Bíblia, descobrimos os princípios que Ele estabeleceu para reger a nossa vida como cristãos nesse mundo. A palavra de Deus é a nossa regra áurea de fé, o padrão de obediência para com Deus. O Espírito Santo, por sua vez, ilumina a nossa mente e nos ajuda a descobrir como pôr em prática em nosso cotidiano os mandamentos bíblicos. 2 Timóteo 3.16-17.
2.	Devemos obedecer à Igreja
A Igreja é o fiel instrumento comunicativo do plano de salvação na pessoa de Jesus Cristo. À ela, estamos ligados mediante o novo nascimento. Assim sendo, devemos obediência à Igreja. No primeiro concílio (reunião de líderes) da Igreja, em Jerusalém, para discutir a questão do legalismo, relatado em Atos 15.1-35, está claro que ela teve participação nas decisões sobre o que os gentios deviam ou não acatar.
É sempre bom lembrar que esta obediência é à luz da Palavra, e não ao contrário. Não é a igreja que estabelece o que a Bíblia ensina, mas a Bíblia que estabelece o que a Igreja deve fazer. Tudo quanto ela faz ou ensina não pode basear-se em textos isolados, mas nos princípios gerais da Bíblia. Um princípio só pode ser assim considerado, se tiver apoio em toda a Palavra de Deus. Se não, pode ser uma boa opinião, mas não um princípio bíblico. O grande erro da Igreja Romana, entre outros ao longo da História, foi que, para justificar suas heresias, inverteu o papel: a sua tradição passou a ser mais importante do que a Bíblia e a arbitrar o que ela ensina.
3.	Devemos obedecer aos nossos pastores
Se a Bíblia é o nosso padrão, ela determina que devemos também obedecer aos nossos pastores. Leia Hebreus 13.17. Não obstante a salvação ser individual, você descobriu que a responsabilidade de ministrar às nossas vidas é do pastor, de quem Deus vai cobrar a prestação de contas um dia. Cabe-lhe, portanto, expor a Palavra para o nosso ensino e crescimento espiritual. De nossa parte, como determina a Bíblia, cabe-nos atentar para os seus conselhos, ouvir-lhes as recomendações e obedecer-lhe, sempre consultando a Bíblia, pois este é um direito de todos os cristãos. O direito de ter acesso à Bíblia Sagrada para comparar o ensino que está recebendo com a Palavra de Deus. Aqui vale a seguinte cautela: se, por acaso, o seu pensamento
 
está divergindo do que fala a Palavra de Deus e do que pensa a unanimidade da igreja, acenda uma luz de advertência e procure um diálogo sadio com sua liderança.


lll. EFEITOS DA OBEDIÊNCIA
Para finalizar, veja na Bíblia os efeitos da obediência na vida dos que a praticam:
1.	Os que obedecem a Deus têm o Espírito Santo: “E nós somos testemunhas acerca destas palavras. Nós e também o Espírito Santo, que Deus deu àqueles que lhe obedecem.” (Atos 5.32)
2.	Os que obedecem a Deus são inabaláveis: “Todo aquele, pois, que escuta estas minhas palavras e as pratica, assemelhá-lo-ei ao homem prudente, que edificou a sua casa sobre a rocha.” (Mateus 7.24)
3.	Os que obedecem a Deus tem sua obediência reconhecida: “Quanto à vossa obediência é ela conhecidas de todos. Comprazo-me, pois, em vós, e quero que sejais sábios no bem, mas símplices no mal.” (Romanos 16.19)
4.	Os que obedecem a Deus glorificam-lhe: “ Visto como, na prova desta administração, glorificam a Deus pela submissão que confessais quanto ao evangelho de Cristo, e pela liberalidade de vossos dons para com eles, e para com todos.” (2 Coríntios 9.13)
5.	Quem obedece a Deus é irrepreensível: “De sorte que, meus amados, assim como sempre obedecestes, não só na minha presença, mas muito mais agora na minha ausência, assim também operai a vossa salvação com temor e tremor (...) para que sejais irrepreensíveis e sinceros, filhos de Deus inculpáveis no meio duma geração corrompida e perversa, entre a qual resplandeceis como astros no mundo.” (Filipenses 2.12-15)

      `,
    imagem: require('@/assets/images/start6.png'),
  },
  {
    modulo: 'start',
    numero: '7',
    titulo: 'Lição 7 - O Dizimista e Ofertante',
    videoUrl: 'https://www.youtube.com/embed/iWb4GuuPmg8?si=eDIevtRkunejqxKT',
    descricao:
      `
      INTRODUÇÃO
Dizimar e ofertar não é obrigação, mas um ato de fidelidade e gratidão. É tornar-se participante com Deus na obra de evangelização no mundo. É o privilégio de tirar uma porcentagem de toda a renda pessoal e investir nos negócios de Deus aqui na terra.


l. O DÍZIMO NO ANTIGO TESTAMENTO
Devolver o dízimo, no Antigo Testamento, constituía-se em separar a décima parte do produto da terra e dos rebanhos para o sustento do santuário de Deus e dos sacerdotes.
O dízimo nos dias de Abraão
A origem do ato de dizimar perde-se no tempo, sendo anterior a Moisés. No entanto, a primeira referência bíblica ao fato relaciona-se aos dias de Abraão. Em Genesis 14.20 está escrito que Abraão pagou a um rei de nome Melquisedeque o dizimo de tudo, sendo que, neste caso, não foi do produto da terra nem dos rebanhos, e sim do despojo da guerra, costume também observado nos tempos antigos. Leia Hebreus 7.2, Levítico 27.30-34 e Deuteronômio 12.5-6.
O dízimo nos dias de Moisés
Nos dias de Moisés, o dízimo passou a exercer importante papel na vida religiosa do povo israelita. Leia Deuteronômio 26.1-15. Desta forma, não só a casa de Deus era suprida, como também mantida a tribo de Levi, responsável pela organização de todas as outras tribos. Devolver o dízimo é, portanto, sinal de um coração que reconhece o senhorio de Deus sobre todas as coisas. Por isso, Malaquias chegou a chamar de roubadores de Deus àqueles que não pagavam os seus dízimos. Leia Malaquias 3.8-10.



ll. O DÍZIMO NO NOVO TESTAMENTO
 
O dízimo não ficou restrito aos tempos do Antigo Testamento. O escritor da Epístola aos Hebreus estabelece uma vinculação direta entre esta prática e o Novo Testamento quando menciona o fato de Abraão ter pago o dízimo de tudo a Melquisedeque. Vale lembrar, inclusive, que o mesmo autor afirma ser Cristo sumo Sacerdote segundo a ordem de Melquisedeque (Hebreus 5.10). Ora, isto quer dizer que, se a ordem é a mesma, os deveres e privilégios continuam também os mesmos, sem alteração, e isto inclui o dízimo. Pagar o dízimo, portanto, é dar sequência, em Cristo, ao sacerdócio de Melquisedeque. Leia Hebreus 7-3.
Jesus e o Dízimo
O próprio Cristo não passou ao largo do dízimo. Leia Mateus 23.23-24. A prática do dízimo entre os contemporâneos de Jesus tornou-se legalista e de falsa espiritualidade. Os escribas e fariseus cumpriam esta determinação para serem vistos e honrados pelos homens, e não como fruto sincero de corações agradecidos. Era apenas aparência, nada mais. Todo o texto de Mateus 23 enfatiza este lado da arrogância, da falsa religiosidade, onde a hipocrisia se reveste de justiça para tornar-se a glória de corações iníquos e apodrecidos.
O Dízimo nas Epístolas
Ainda que a palavra dízimo não apareça nos ensinos do apóstolo Paulo, ela está implícita todas as vezes em que ela admoesta sobre a contribuição. Leia 1 Coríntios 16.2. Duas coisas aparecem no texto: as contribuições eram feitas no primeiro dia da semana (domingo), proporcionalmente à prosperidade de cada um. O dízimo é exatamente isto. Quando se paga 10%, ele sempre será proporcional. Em outras palavras, quanto mais o crente prospera, mais contribui. O apóstolo também reitera o conceito de que a contribuição deve ser oriunda da motivação correta. Ele afirma: “Não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria”. (Leia 2 coríntios 9-7).


lll. AS BENÇÃOS QUE ACOMPANHAM OS DÍZIMOS
Bênçãos para a Igreja
Se todos os cristãos pagassem o dízimo não haveria necessidade da Igreja local lançar mão de campanhas financeiras para a execução de sua tarefa. Malaquias afirmou que o dízimo é para que haja “mantimento na casa do Senhor”. Aplicando-se ao contexto de hoje, é o meio que a Igreja tem aqui na terra para realizar a evangelização, enviar missionários, manter os seus funcionários, cuidar da assistência social, construir templos para abrigar o povo e suprir o dia- a-dia da administração.
Por exemplo: como a igreja poderá ser abençoada com o crescimento, se lhe faltam os recursos parar adquirir folhetos, enviar obreiros, dar suporte aos programas de evangelismo e ajudar no cuidado aos carentes da igreja e da comunidade? O dízimo é para isto. Não tem outra finalidade.
Benção para quem devolve o Dízimo
A promessa dada por Deus através de Malaquias impõe uma condição: primeiro trazer os dízimos, depois fazer prova do Senhor, que garante derramar benção tal, trazendo maior abastança. Porém, é preciso que fique claro: isto não anula as aflições da vida, onde podem aparecer os momentos de sequidão. Agora, com certeza, garante vitória aos que, com fidelidade em tudo, atravessam estas horas mais difíceis, pois a palavra de Deus jamais cai por terra.
 
Fazer prova aqui não é chantagear o Senhor, mas saber que ele é recíproco para conosco, se cumprirmos a nossa parte.
Veja algumas coisas que acontecem quando, motivado pela visão correta, o crente dizima:
a)	Sente-se recompensado por ser parte ativa na obra de Deus;
b)	Torna-se exemplo para os demais cristãos;
c)	Deus lhe é recíproco em proporções bem maiores

IV. A OBRA MISSIONÁRIA E A VISÃO DA CRIEP
Ide por todo mundo e pregai o evangelho
O texto de Marcos 16.15 indica que todo Cristão que desfruta da rica oportunidade de conhecer a Cristo deve anunciar este evangelho de uma maneira única em essência e múltipla ação. Tal inspiração em expandir esta boa nova recebida e anunciar esta paz, requer boa vontade dos membros da comunidade em servir. Esta sinergia é realizada quando a membresia da igreja está engajada juntamente com a comunidade em fazer diferença num mundo tão carente e sedento de Deus. A CRIEP busca em suas atividades, dar toda estrutura e suporte para que a obra de Deus seja realizada com excelência e prudência por todos que desejam realizar esta prática.
A visão missionária da CRIEP tem se amadurecido ao longo dos anos com o foco em investir em pessoas.
      `,
    imagem: require('@/assets/images/start7.png'),
  },
  {
    modulo: 'start',
    numero: '8',
    titulo: 'Lição 8 - O Discipulo e o Espírito Santo',
    videoUrl: 'https://www.youtube.com/embed/woaRLoYujx0?si=BWyOTmylSClQDIpj',
    descricao:
      `
      INTRODUÇÃO
É impossível escrever sobre qualquer dos temas destas lições sem fazer referência explícita ou implícita à pessoa aos atos do Espírito Santo. Não obstante, se faz necessário tratar deste assunto com clareza, a fim de tirar dúvidas que, porventura, existiam por parte do discípulo sobre a terceira pessoa da trindade. As escrituras dão muitas provas da personalidade do Espírito Santo. Ele não é apenas uma influência, força ativa ou energia cósmica, conforme ensinam algumas religiões; mas, sim, um com o Pai e com o Filho, ou seja, o Espírito Santo é Deus. Leia 1 João 5.6-7.


l. A NATUREZA DO ESPÍRITO SANTO
Provas bíblicas da Sua divindade
Em Gênesis 1.2 você encontra a primeira referência ao Espírito Santo, o qual participou ativamente da criação. O Espírito Santo é da mesma essência divina que o Pai e o Filho, pois possui os mesmos atributos destes. Vejamos:
a)	Onipotência: Pode todas as coisas. Jó 42.2;
b)	Onisciência: Seu saber é perfeito e infinito em relação ao passado, presente e futuro. Ele é eterno: não tem princípio e nem fim. Salmos 1.39 1-4, 1 Cr 28.9;
c)	Onipresença: Conhece e sonda todos os atos e pensamentos, pois está presente em todo lugar, de modo pleno. Salmo 139.
Provas de sua personalidade: O Espírito Santo é uma pessoa. Ele possui características e personalidade como: intelecto, vontade e sentimento. Onde se observa, claramente, a sua capacidade de examinar, conhecer e interceder. Leia Romanos 8.27 e 1 Coríntios 2.10,11,16.
 
Ele se entristece e também tem zelo de nós. Leia Tiago 4-5. Considere, ainda, algumas atividades que atesta a personalidade do Espírito Santo:
a)	Ele revela: A Bíblia, revelação de Deus à humanidade, foi escrita por homens e mulheres inspiradas pelo Espírito Santo. Leia 2 Pedro 1.21;
b)	Ele ensina: O Senhor Jesus afirmou aos discípulos que o Consolador os ensinaria todas as coisas, e os farias lembrar de tudo quanto Ele (Jesus) havia dito. Leia João 14.26;
c)	Ele intercede: O apóstolo Paulo disse que o Espírito Santo “intercede por nós com gemidos inexprimíveis”. Leia Romanos 8.26;
d)	Ordena: A igreja de Antioquia da Síria foi a primeira a enviar obreiros ao campo missionário. Porém, a ordem para isto foi dada pelo Espírito Santo. Leia Atos 13-2;
e)	Testifica: Se não fosse uma pessoa, seu testemunho a favor de Jesus Cristo seria nulo. Leia João 15-26; 1 João 5-6,7;
f)	Fala à igreja: Através dos ministros da Palavra e de várias outras maneira, Ele fala à igreja. Leia apocalipse 2.7-11, 17-29; 3.6-22;
g)	Convida à salvação: Convence o pecador a aceitar Cristo como Salvador. Leia Apocalipse 22.17.


ll. NOMES E SÍMBOLOS DO ESPÍRITO SANTO
Você aprendeu que o Espírito Santo é uma pessoa, pois possui personalidade. A ele são atribuídas às mesmas qualidades inerentes ao Pai e Filho, e também, é lhe dado, de acordo com as diversas funções, vários nomes e símbolos.
Seguem alguns de seus NOMES:
a)	O Espírito de Deus: Significa que ele é “executivo” da divindade. Em Lucas 11.20, Jesus afirma que expulsa os demônios pelo “dedo de Deus”;
b)	O Espírito de Cristo: Este nome, conferido à terceira pessoa da Trindade, indica que o Espírito é enviado por Cristo para o glorificar e habitar no salvo. Romanos 8;
c)	O Consolador: Perto de findar o Seu ministério terreno, o Senhor sabia que, brevemente, teria de deixar os Seus discípulos. Contudo, eles não ficariam sozinhos, pois enviaria o “outro Consolador”, a fim de ficar com eles para sempre. Leia 2 Coríntios 1.4;
d)	O Espírito de verdade: O Espírito do engano e do erro opera no mundo, por isso, o Senhor enviou o Espírito de verdade para preservar os Seus das ciladas de Satanás. 1 João 4.6;
e)	O Espírito de Graça: A graça é concedida aos cristãos a fim de viverem em santidade e vencerem as fraquezas, próprias da carne. Leia 2 Coríntios 12.9;
f)	O Espírito de vida: O poder do pecado e da morte não tem efeito sobre aqueles que receberam o Espírito de vida. Neste versículo, o apóstolo Paulo afirma: “Porque a lei do Espírito de vida, em Cristo Jesus, me livrou da lei do pecado e da morte”. Leia Romanos 8.2.
Seguem alguns SÍMBOLOS:
 
Eles indicam a ação divina da terceira pessoa da trindade, através dos vários ministérios que as pessoas recebem de Deus. Consideremos alguns:
a)	Fogo: Este símbolo fala da ação purificadora do Espírito Santo, na vida do crente. Ao mesmo tempo diminui a força do pecado dentro de nós; o fogo do Espírito assinala a presença de Deus na vida do crente ao iluminá-lo e aquecê-lo.
b)	Vento: No encontro com Nicodemos (João 3.8), o Senhor referiu-se à ação do vento para ilustrar a operação do Espírito Santo na obra de regeneração do Pecador. É ele que convence a pessoa da necessidade de arrepender-se dos seus pecados e receber, pela fé, mediante a graça divina, a salvação consumada no sacrifício do Calvário pelo Filho de Deus. O vento simboliza a obra regeneradora do Espírito Santo. Tal como o vento, assim é o Espírito Santo. Percebe-se a Sua real operação na vida do crente e da Igreja, embora não se possa vê-lo como é. Seus atos independem da vontade humana, pois Ele é Deus Soberano.
c)	Água: Em João 7.37, o Senhor Jesus identifica-se como a verdadeira fonte de água viva, isto é, a salvação consumada por Ele e conferida aos que O aceitarem pelo Espírito Santo. Ele afirmou: “Se alguém tem sede, venha a mim e beba. Quem crê em mim, como diz a escritura rios de água viva correrão do seu ventre.
d)	Azeite: É o mais conhecido dos símbolos atribuídos à terceira pessoa da trindade. No Antigo Testamento, era usado para consagrar os sacerdotes e os reis de Israel. Ser ungido com o azeite significa estar revestido da autoridade de Deus para determinada tarefa espiritual ou secular. A Igreja primitiva, através dos presbíteros, ungia os enfermos, que saravam, após a oração da fé. Leia Tiago 5.14-1;
e)	Pomba: Esta ave simboliza brandura, inocência, doçura, pureza, amabilidade e paz. Por ocasião do batismo de Jesus, o Espírito Santo desceu do Céu em forma corpórea de uma pomba e pousou sobre o Filho de Deus para indicar que aquele era o Messias. Isto não significa que a terceira pessoa da trindade tenha esta aparência, pois, como Espírito, não possui forma que se possa definir.
lll. AS OBRAS DO ESPÍRITO SANTO
a)	No pecador: O Espírito regenera a natureza pecaminosa do homem, convence-o dos seus delitos e pecados, leva-o ao arrependimento, à confissão e ao abandono dos mesmos, pela fé no sacrifício do Filho de Deus. Deste modo, regenerado pelo Espírito, o pecador torna-se uma nova criatura. Leia 2 Coríntios 5.17;
b)	No Cristão: Consola, conduz, ensina todas as coisas e lembra o que o Senhor ensinou, concede poder para testemunhar de Cristo, intercede pelos cristãos em suas orações e santifica.

      `,
    imagem: require('@/assets/images/start8.png'),
  },
  {
    modulo: 'start',
    numero: '9',
    titulo: 'Lição 9 - Vivendo Cheio do Espírito Santo',
    videoUrl: 'https://www.youtube.com/embed/1J4Gowxacow?si=-ut_UrvdJ9Vj6BwH',
    descricao:
      `
      INTRODUÇÃO
Viver cheio do Espírito Santo significa ser alegre, confiante, revestido do poder de Deus. Por intermédio desta virtude, muitos cristãos enfrentaram os perigos com muita coragem. Os que realmente são cheios do Espírito Santo, aceitaram o martírio, cientes de que eram bem- aventurados. Isto só foi possível porque experimentaram uma vida repleta no Espírito Santo.


l. TODO O CRENTE RECEBE O ESPÍRITO SANTO
No momento da conversão, quando você aceita a Jesus como Salvador, recebe o Espírito Santo. Foi Ele quem, na hora da sua conversão, atuou em seu ser para que se decidisse por Cristo. Ele lhe convenceu que era pecador e que necessitava do arrependimento para alcançar o perdão de Deus. No instante em que levantou as mãos, como sinal de aceitação, você sentiu uma alegria incontida. É o momento em que a terceira pessoa da trindade passa a habitar na vida do cristão, que se torna o templo do Deus Altíssimo. Leia 1 Coríntios 6.19.
Como promessa e garantia da salvação (2 Coríntios 1.22), dentre as muitas funções do Espírito Santo e de tudo o que a Bíblia diz a respeito de Sua pessoa, destaca-se o fato de ser Ele o penhor, ou seja, a garantia de nossa futura herança em Cristo:
“Em cristo também vós estais, depois que ouvistes a palavra da verdade, o evangelho da vossa salvação; e, tendo nele também crido, fostes selados com o Espírito Santo da promessa; o qual é o penhor da nossa herança, para redenção da promessa de Deus, para louvor da sua glória” (Efésios 1.13,14). É o Espírito Santo, que mediante a Palavra de Deus e por todos os meios da graça, nos capacita a atingir a glória eterna de Deus. Este selo é o penhor do futuro que nos aguarda aqui na terra e na eternidade.


ll. OQUE É O BATISMO NO ESPÍRITO SANTO?
1.	É uma promessa do Pai (Joel 2.28,29)
 
Deus fez muitas promessas ao homem, sendo o batismo no Espírito Santo uma delas. No passado, o Espírito Santo manifestava-se de uma forma específica. De acordo com a necessidade, ele operava na vida dos servos de Deus. Leia Exôdo 35.30-35. No entanto, Deus prometeu derramar o Seu Espírito sobre todos os homens e mulheres, para que se profetizassem, tivesse sonhos etc. O batismo no Espírito Santo é uma benção que está ao alcance de todos os que creem.
2.	É um revestimento do poder (Marcos 16.17,18)
Os discípulos, antes do batismo no Espírito Santo, eram tímidos e medrosos. Inclusive, no dia da prisão de Jesus, todos fugiram, com exceção de Pedro, que acompanhou até o local onde o Filho de Deus foi julgado. Na casa do sumo-sacerdote Caifás, o amigo de Cristo, que prometeu segui-lo até a morte, com medo de morrer, negou-o três vezes. No entanto, no dia de Pentecostes, revestido do Poder de Deus, quando os Judeus, atraídos pelo barulho das línguas estranhas que os discípulos falavam, declaravam que os seguidores de Jesus estavam embriagados, Pedro respondeu: “Varões judeus, e todos os que habitais em Jerusalém, seja-vos isto notório, e escutai as minhas palavras. Estes homens não estão embriagados, como vós pensais, sendo a terceira hora do dia. Mas isto é o que foi dito pelo profeta Joel” (Atos 2.14- 16).
No término de sua mensagem, quase três mil pessoas aceitaram a Jesus como salvador. Com certeza, todos os revestidos do poder de Deus são mais do que vencedores.


IV. EVIDÊNCIAS DO ESPÍRITO SANTO
1.	Os dons espirituais (1 Coríntios 12.8-10)
São os seguintes: a palavra da sabedoria, a palavra da ciência, a fé, os dons de curar, a operação de maravilhas, a profecia, o dom de discernir os espíritos, a variedade de línguas e a interpretação de línguas. Os dons espirituais são necessários para a edificação espiritual e o crescimento da Igreja. São concedidos gratuitamente e devem ser utilizados, também, de graça. Nós o recebemos mediante o nosso pedido a Deus. Se você deseja um ou mais destes dons, comece a buscá-los ainda hoje, com fé e o Senhor lhe concederá.
Obs: outras passagens bíblicas nos apresentam outros dons, porém você os conhecerá no CDV (Curso de Despertamento Vocacional).
2.	O fruto do Espírito (Gálatas 5.22)
No momento da regeneração, o novo homem passa a ter a mente de Cristo e a produzir o fruto do Espírito, que podemos comparar a uma mexerica com nove gomos, cujo nomes diferem um dos outros. São eles: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão e domínio próprio. Não são diversos frutos, mas um só, constituídos por nove virtudes diferentes. Jesus orou esta sublime oração: “porque pelo fruto se conhece a árvore” (Mateus 12.33). Isto significa dizer que se conhece a pessoa que realmente nasceu de novo, quando ela produz o fruto do Espírito, manifestado nas nove virtudes que lhe são peculiares.
Obs: Se a pessoa não souber canalizar os dons espirituais a favor da construção do fruto do Espírito, correrá o risco de perder a salvação. Leia Mateus 7.22
 
V. O ESPÍRITO SANTO COMO LÍDER
1.	Ensina todas as coisas (João 14.26)
Jesus declarou aos discípulos que eles seriam odiados e levados aos tribunais por causa de Seu nome, mas que eles não deviam se preocupar, pois o Espírito Santo lhes ensinaria tudo o que deveriam responder aos seus inimigos. Hoje também, o Espírito Santo nos ensina. Por nós mesmos, nada sabemos falar. Mas quando abrirmos a nossa boca, a terceira pessoa da trindade nos enche de sabedoria e graça, para pregarmos o evangelho de Cristo.
2.	Santifica-nos (2 Tessalonicenses 2.13)
O Espírito Santo é quem nos regenera. A partir do momento em que aceitamos a Jesus, ele inicia o processo de santificação. Logo após o novo nascimento, começamos a crescer espiritualmente até chegarmos a estatura de varões perfeitos (Efésios 4-13). Realmente, as três pessoas da trindade são responsáveis pela salvação da humanidade: o Pai enviou o Filho. Este, por sua morte, redimiu-nos, e o Espírito Santo tem a incumbência de nos santificar. Quando pecamos, sentimos, por intermédio dEle, a nossa culpa. Nos arrependemos as nossas faltas, e Ele purifica-nos de todo o pecado por intermédio do sangue de Jesus.
3.	Dirige a Igreja (João 16.13)
No dia de Pentecostes, o Espírito Santo assumiu a direção da Igreja. Com a sua infinita sabedoria, Ele dirige os passos da eleita de Cristo desde a sua fundação, e dirigirá até o dia do arrebatamento. No decorrer deste tempo, Satanás investe contra a Noiva do cordeiro, mas jamais foi ou será bem sucedido, muito pelo contrário, as portas do inferno não prevalecem e nunca    prevalecerão    contra    a    igreja.    Leia    Mateus    16.18

Por isso, viver cheio do Espírito Santo significa ser dirigido pela terceira pessoa da trindade, com a certeza de que o crente marcha para a glória, seguro e confiante que chegará ao céu, pois não é conduzido por simples seres humanos, mas por uma pessoas divina.
#Dicas
Nos dias atuais, viver cheio do Espírito Santo de Deus é mais do que uma necessidade. E a promessa do revestimento de poder está à disposição de todos os que creem. Frequente os cultos, as reuniões de orações, as vigílias, e quando você menos esperar, será cheio do Espírito Santo;
Após receber esta benção, uma promessa de Deus para todos os que aceitam a Jesus como salvador, você deve buscar diligentemente os dons espirituais, a fim de que seja um instrumento nas mãos de Deus para a edificação da Igreja;
Cultive também o fruto do Espírito para que seus atos venham provas a todos que você é uma nova criatura possuidora da natureza de Cristo.

      `,
    imagem: require('@/assets/images/start9.png'),
  },
  {
    modulo: 'start',
    numero: '10',
    titulo: 'Lição 10 - Os dons do Espírito Santo',
    videoUrl: 'https://www.youtube.com/embed/ygEdcGRtvdY?si=8Uu12szTbR4sVWv5',
    descricao:
      `
      INTRODUÇÃO
Os dons espirituais formam a base do crescimento espiritual e capacita o crente para o serviço na obra de Deus. Seu exercício é fundamental, tanto na adoração como na edificação da Igreja. São eles: Palavra de Sabedoria, Palavra de Ciência, Discernimento dos espíritos, Cura, Operação de Maravilhas, Fé, Variedades de Línguas, Interpretação de Línguas e Profecia.
Segue uma breve explicação de cada dom:
1.	Palavra da Sabedoria
Muitas pessoas no mundo são conhecedoras de muitos assuntos, porém poucas conseguem transformar conhecimento acumulado em falas e práticas sábias em sua vida e na vida dos outros.
A Palavra da Sabedoria é o dom dado pelo Espírito que capacita o crente a perceber, falar e agir de maneira que agrada a Deus e beneficia o próximo. Leia Tiago 3.17 e 1 Coríntios 2.6-8.
2.	Palavra de Ciência/ Conhecimento
Esse dom capacita o cristão a absorver conceitos profundos da Palavra de Deus. Conceitos esses que nem todos conseguem ao longo da caminhada cristã.
Observação: As Palavras de Ciência e de Sabedoria se completam.
3.	Discernimento dos espíritos
É uma capacitação sobrenatural que permite conhecermos o caráter dos espíritos. Ajuda o crente a separar o falso do verdadeiro, o puro do impuro, o santo do pecador. Leia 1 João 4.1.
No Novo Testamento, este dom se manifesta revelando os espíritos maus e enganadores dos últimos tempos. Em Atos 16.16-18, Paulo enfrentou uma situação na qual precisou discernir os espíritos. Ele conheceu a origem de uma bajulação e expulsou o demônio em nome de Jesus Cristo. Os Cristãos precisam exercer este dom na atualidade, pois a cada dia mais espíritos vindo de Satanás estão presentes na sociedade.
 
4.	Cura
Os Dons de Cura são concedidos como uma solução divina capaz de amenizar o sofrimento humano, através da fé em Jesus Cristo. Existe uma limitação por parte de alguns cristãos por acharem que esse dom está relacionado apenas quando uma cura física acontece. É necessário entendermos que Deus pode curar o físico, mas o desejo dele sobre a humanidade é também curar o interior.
5.	Operação de Maravilhas
Esse dom, também chamado de operação de milagres, prodígios e sinais, se constitui em manifestação especiais do poder de Deus que superam as limitações humanas. São superiores e inexplicáveis. Na operação dos poderosos sinais que envolvem os milagres, o supremo Senhor, apenas usa da forma que Ele quer as leis e forças por Ele mesmo criadas em socorro dos Seus filhos. Isso é milagre. Leia Atos 2.9-12.
6.	Fé
O dom da fé é uma capacitação especial que o Espírito Santo dá a alguns crentes para exercer a fé além dos limites naturais: Manifestam-se em grandes confianças, grandes petições que geralmente são respondidas quando são produto desse dom, sempre em benefício da Igreja de Jesus Cristo. Leia 1 Co. 12.7-10. Ela se difere da Fé Salvadora, que se manifesta como resposta da proclamação do evangelho, e também da Fé como Fruto do Espírito, que melhor traduzida seria “fidelidade”, pois esse fruto desenvolve a fidelidade e confiança que todos precisamos ter em Deus, como veremos na próxima aula.
7.	Variedades de Línguas
A Bíblia faz menção de Variedade de Línguas. Para esse dom edificar a igreja, é necessário haver interpretação; caso contrário, somente a pessoa que fala se edificará.
8.	Interpretação de Línguas
O Dom de Interpretação, portanto, complementa o Dom de Línguas para que toda a igreja venha ser edificada. Leia 1 Co 14.13, 18, 28, 39, 40.
9.	Profecia
Profetizar, como dom, é falar aos homens em nome de Deus, com a finalidade de edificar, exortar e consolar. Leia 1 Coríntios 14.3. O que fala em línguas, fala a Deus, a não ser que haja intérprete; o que profetiza fala da parte de Deus aos homens e mulheres. De todos os dons, a profecia é o único sujeito ao julgamento da igreja. Leia 1 Coríntios 14.29. O Dom de Profecia não é um método humano de adivinhar a sorte, de prever o futuro nem de tornar realidade os desejos dos cristãos. Leia 1 Crônicas 17.1-4 e 1 Coríntios 14.

Dicas!
1.	Ore a Deus, e peça dons a Ele;
2.	Peça a Deus para ser usado por Ele, mas lembre-se que o exercício dos dons espirituais não o torna um “super-crente”, nem mais santo do que os outros

      `,
    imagem: require('@/assets/images/start10.png'),
  },
  {
    modulo: 'start',
    numero: '11',
    titulo: 'Lição 11 - O Fruto do Espírito',
    videoUrl: 'https://www.youtube.com/embed/8DyAAH2Mv_k?si=tU_PrNElZudDek2-',
    descricao:
      `
      INTRODUÇÃO
O Fruto do Espírito possibilita o cristão autêntico a viver de modo íntegro diante de Deus e da humanidade. Naturalmente, a pessoa não consegue obter esta condição por esforço próprio. O “fruto” de Gálatas 5.22, conceituado como “expressões do caráter cristão”, está no singular provavelmente por tratar-se de uma única notável virtude implantada pelo Espírito Santo de uma só vez no crente. É através do Fruto do Espírito que o cristão participa em parte da natureza divina.

l. A NATUREZA DO FRUTO DO ESPÍRITO
O que representa e em que consiste o Fruto do Espírito na vida do Crente?
O Fruto do Espírito consiste nas nove virtudes ou qualidades da personalidade de Deus implantadas pelo Espírito da verdade no interior do crente com a finalidade de conduzi-lo à maturidade, ou seja, à imagem de Cristo. Em suma, o Fruto do Espírito representa os atributos de Deus; os traços do Seu caráter. O crente precisa absorvê-lo com a ajuda do Espírito Santo.
O caráter cristão verdadeiro expressa-se no Fruto do Espírito que é resumido no amor. Do amor, surgem todos os demais atributos de Deus que são desenvolvidos no crente pelo Espírito Santo que nele habita. É por isso que o amor aparece encabeçando a lista das virtudes cristãs geradas pelo Espírito de Deus, por ser a fonte originária de todas as demais virtudes.
O Espírito Santo produz o fruto do caráter cristão em nossa vida à medida que cooperamos com Ele. As línguas, a profecia, e até mesmo o conhecimento são úteis, e são dons maravilhosos do Espírito Santo, mas sua presença em nossa vida nem sempre é uma indicação de nossa maturidade cristã. A medida de nossa maturidade em Deus depende de quão bem temos permitido que o Espírito Santo produza os traços do caráter de Jesus em nossas vidas. A maturidade espiritual envolve melhor entendimento do Espírito de Deus e das necessidades das pessoas. O Fruto do Espírito é o resultado na vida dos que participam da natureza divina, ou seja, dos que estão ligados a Cristo, a Videira verdadeira. Leia João 15.1-5.

Baseado em João 15, a maturidade em Cristo envolve:
1.	União;
2.	Limpeza ou a poda;
3.	Frutificação.
 
ll. VIRTUDES OU QUALIDADES DO FRUTO DO ESPÍRITO

a)	Amor - A palavra “caridade ou “amor” neste trecho das Escrituras é a tradução da palavra grega ágape. Este é o amor que flui diretamente de Deus: “O amor de Deus está derramado em nossos corações pelo Espírito Santo que nos foi dado.” (Romanos 5.5). É um amor de tamanha profundidade que levou Deus a dar seu único Filho como sacrifício pelos nossos pecados (João 3.16). É o amor de Jesus por nós: “conhecemos o amor nisto: que Ele deu a Sua vida por nós, e nós devemos dar a nossa pelos irmãos.” Leia João 3.16; 15.11 -15. É muito fácil amar os seus entes queridos, como os pais, filhos, esposos, parentes, amigos etc. Mas somente pelo Espírito Santo você é capaz de dedicar o amor aos seus inimigos de tal forma que lhes deseje o bem e perdoe as suas ofensas de todo o coração.
b)	Gozo ou Alegria - Trata-se daquela qualidade resultante de um senso de bem-estar, sobretudo de um bem-estar espiritual, por causa de uma correta relação com Deus. Apesar das dificuldades financeiras, das enfermidades, das calúnias, pela atuação do Espírito Santo, o crente está cheio de gozo em sua alma, como os apóstolos Paulo e Silas, presos injustamente por causa do evangelho. Em vez de murmurarem, cantavam e oravam. Leia Atos 16.25.
c)	Paz – Trata-se de uma qualidade espiritual produzida pela reconciliação, pelo perdão dos pecados e pela conversão da alma transformada segundo a imagem de Cristo (Romanos 12.18). A queda do homem e da mulher no pecado destruiu a paz com Deus, com outros homens e mulheres, com o próprio ser, com a própria consciência. Foi por meio da instrumentalidade da cruz que Deus voltou a estabelecer a paz. Leia Colossenses 1.20 e Efésios 4.2-3.
d)	Longanimidade – Essa palavra significa ter a habilidade de ser paciente. Essa qualidade é atribuída a Deus. Ele tem tolerado pacientemente todas as iniquidades da humanidade. Não se deixando levar pela ira nem pelo furor; não usando sua justa indignação. De nós, os cristãos, é esperado que em nossas relações com os outros se caracterizem pela longanimidade do mesmo modo que Deus tem agido conosco. Leia 2 Co 6.6; Cl 1.11;
3.12. Tg 1.19-20.
e)	Benignidade - Benignidade no original grego significa ter “honestidade” ou, em outras traduções, ter a intenção de fazer o bem. Infelizmente muitos fazem o bem, porém não tem a intenção de fazê-lo. Deus é a fonte dessa qualidade e Cristo é o melhor exemplo. Ele foi uma pessoa imensamente bem-intencionada conforme o evangelho o retrata. Essa virtude torna o crente benigno, desejoso do bem a todos, principalmente para os seus inimigos. Pv. 25.21
f)	Bondade - Ser bondoso é faz o bem. É aquele que consegue canalizar toda intenção boa numa prática melhor ainda. Significa ser bom para todos, sem acepção de pessoas. Leia Tiago 4.17
g)	Fé – No original grego significa tanto “confiança” quanto “fidelidade”. A fé, aqui, indica a confiança em Jesus Cristo. Mediante esta qualidade do fruto, podemos alcançar a medida total da plenitude de Cristo (Efésios 4.13). À medida que esse fruto amadurece em nós, nossa confiança em Deus é fortalecida. É a certeza de que Deus existe e está sempre conosco para nos dar a vitória. Hb 11.6
h)	Mansidão – Trata-se de uma submissão do homem para com Deus e, em seguida, para com o próprio homem. A mansidão é o resultado da verdadeira humildade, que nos leva ao reconhecimento do valor alheio e a recusa de nos considerarmos superiores. Jesus
 
disse: “Bem aventurados os mansos, porque eles herdarão a terra” (Mateus 5.5). Essa virtude torna você manso e calmo, quando antes era agressivo e se irava por qualquer coisa que o contrariava.
i)	Temperança ou Domínio Próprio
l) Nas palavras- Há um ditado popular que afirma: “Não devemos falar o que sabemos, mas sim, saber o que falamos”. Isto é o que se pode chamar de temperança, domínio próprio. Leia Tiago 3.2
ll) Nas ações - Quatro jovens judeus, levados cativos para a babilônia, foram escolhidos por Nabucodonosor para realizarem um curso e depois servirem ao governo caldeu. O rei ordenou que os alimentasse com todas as iguarias da mesa real. Daniel e seus companheiros propuseram algo em seus corações (Leia Dan 1.8). Solicitaram, então, ao despenseiro que lhes fornecesse apenas legumes durante dez dias. Se após este período seus semblantes estivessem abatidos, aceitariam o manjar do rei. No entanto, se apresentassem bom estado de saúde, continuariam com a refeição escolhida por eles até o final daquele treinamento.
Após aquele período de dez dias, seus semblantes eram melhores do que os dos demais jovens. Por isso continuaram com aquela alimentação à base de legumes até o final do curso. Esta é uma demonstração de força de vontade, temperança e sobriedade dos quatro Judeus.
lll) Nos pensamentos – Por falta de domínio próprio, Davi cedeu à tentação que o naufragou no pecado e o fez pagar as consequências pelo resto da vida. Era a época em que os reis saíam para a guerra. No entanto, ele passeava no terraço de sua casa real. Seu pensamento vagava distante, em busca de algo que satisfizesse o seu ego. Repentinamente, deparou-se com uma cena que o devorou, como uma labareda de fogo a consumir algo inflamável: uma mulher banhava-se, nua, no quintal de sua casa. A chama da sensualidade acendeu o desejo incontido no coração do rei de Israel de possuí- la. Quando percebeu o que fizera, já era tarde demais: havia se deitado com ela e tinha ordenado a morte do seu marido. Tudo isso aconteceu por falta do autocontrole do pensamento que o levou a cometer aquela loucura. Leia 2 Samuel 11.1-4.
O crente deve sempre ocupar-se com coisas boas. E a melhor terapia é ler a Bíblia, cantar hinos de louvor ao Senhor, visitar os novos convertidos, desviados e enfermos. A palavra de Deus também nos recomenda que devemos fugir da aparência do mal (leia 1 Tassalonicenses 5.22). Só assim venceremos as tentações e manteremos a nossa vontade carnal. Onde você estiver, pense nas coisas celestiais e viva com Jesus, vitoriosamente.



DISCIPULADO
O fruto do Espírito não é produzido na vida de alguém que vive de qualquer maneira. O cristão precisa dedicar-se à oração, ao estudo da Palavra de Deus e passar por várias provas para alcançar o seu crescimento espiritual. Há um preço a ser pago para alcançá-lo, mas a alegria é imensurável e lhe sustenta até a sua partida, ao encontro de Cristo.

      `,
    imagem: require('@/assets/images/start11.png'),
  },
  {
    modulo: 'start',
    numero: '12',
    titulo: 'Lição 12 - Escatologia',
    videoUrl: 'https://www.youtube.com/embed/EHa57aT2WWE?si=Q8TnSbsSdVTNMYCB',
    descricao:
      `
      INTRODUÇÃO
A Escatologia é uma palavra de origem grega, formada pelos termos escato (último) logia (estudo), significando, portanto, estudo das últimas coisas, dos últimos acontecimentos. Assim, quando estudamos e falamos “NO POR VIR”, estamos estudando sobre Escatologia Bíblica. Desse modo, estamos falando e estudando sobre o fim das coisas que nos são compreendidas e percebidas, em especial a vida humana, corpo, alma e espírito, e até mesmo sobre a natureza e nosso planeta.


l. COMO E PORQUE CREMOS ASSIM
a)	ARREBETAMENTO – Cremos na vinda pessoal do Senhor Jesus Cristo, sendo esta vinda iminente para arrebatar a Sua Noiva (A Igreja) – (l Tessalonicenses 4.13-18, l Coríntios 15.51- 52), e, este acontecimento, denominamos de arrebatamento, que significa retirada à força algo ou alguém que está sob uma determinada condição ou posse para si (João 14.1-3).
b)	MOMENTO DO ARREBATAMENTO – Cremos que o momento não deve ser nossa preocupação maior, mas, sim estarmos preparados (Mateus 24.36-44). Contudo, cremos que devemos observar os sinais apontados pelo Senhor Jesus Cristo, que seriam os sinalizadores que indicariam que a sua volta estaria próxima (eventos climáticos, terremotos, maremotos, cataclismos; guerras e rumores de guerras entre nações “Mateus 24.6-7” – apostasias e proliferação de credos). Lucas 18.8, parte b, Mateus 24.10-12, l Timóteo 4.1.
c)	QUEM PARTICIPARÁ DO ARREBATAMENTO – Cremos que participará do arrebatamento todos os crentes fiéis ao Senhor, que esteja eles vivos ou mortos (l Tessalonicenses 4:16-17; l Coríntios 15:51-52; Mateus 10:32; Romanos 10:9-10).
d)	NOSSAS LEMBRANÇAS NO CÉU – Cremos que no céu, teremos consciência sim, porém, este estado de consciência não nos trará sentimentos corruptíveis (bons ou maus), pois seremos transformados fisiológica e psicologicamente (ll Coríntios 5:10; Mateus 17:1-6, 22:23- 32; l Coríntios 15:51-54). Este estado intermediário é temporário, pois o apogeu da esperança cristã não é o Céu, mas nos Novos Céus e Nova Terra em corpos ressurretos.
e)	ESTADO ATUAL DOS QUE MORRERAM NO SENHOR – Cremos que os que
morreram no Senhor Jesus Cristo, embora separados do corpo físico, estão presente com Ele,
 
desfrutando da glória eterna, (Lucas 23.43; ll Coríntios 5.8), estão aguardando a ressurreição, momento em que corpo físico, alma e espírito se unirão e, por conseguinte transformados pelo Seu poder e pelo resplendor da Sua glória (Filipenses 3.21, l Tessalonicenses 4.16-17, l Coríntios 15.51-52).
f)	TRIBUNAL DE CRISTO - Cremos que após o arrebatamento da Igreja pelo Senhor Jesus Cristo, aqueles que foram arrebatados estarão com Ele em um momento muito especial, e este momento é o Tribunal de Cristo (ll Coríntios 5.10). O Tribunal de Cristo será tão somente para prestação de contas quanto ao que recebemos do Senhor e realizamos em seu Nome pela fé, pelo Seu Reino, e posteriormente seremos galardoados/recompensados (l Coríntios 3.10-14), contudo, este Tribunal não terá o condão de condenação, pois, estes, já tem a garantia de que não sofrerão o dano da segunda morte (Apocalipse 2.11, 20.6).
g)	A GRANDE TRIBULAÇÃO (ANGÚSTIA DE JACÓ) – Cremos que haverá um período de grande sofrimento, chamado a grande tribulação, conforme (Jeremias 30.7-8; Daniel 9.27; Mateus 24.21; Apocalipse 12.6). Cremos que a “Grande Tribulação” será um período que a Bíblia diz ser temporal, e de 7(sete) anos (Daniel 9.29 e Apocalipse 13.5), e, em seu desenrolar muitas coisas haverão de acontecer (levante do Anticristo e marcação de seus adoradores “Apocalipse 13.11-18); retenção da morte “Apocalipse 9.6”; etc.), que sofrimento igual nunca houve e jamais haverá depois. (Apocalipse 3.10, l Tessalonicenses 4 e 5.1-11 e ll Tessalonicenses 2, l Coríntios 15.51-52).
h)	SOBRE O MILÊNIO – Cremos que o Milênio será o período em que o Senhor Jesus Cristo reinará sobre a terra restaurando-a completamente (Apocalipse 20.1-6 e Isaías 60). Cremos que durante o Milênio a Igreja e todos os que participaram do arrebatamento estarão reinando com Cristo por todo o período do Reino Milenar (Apocalipse 20.4). Cremos que durante o Milênio, Satanás estará preso sem nenhum poder de atuação e influência sobre a Humanidade (Apocalipse 20.1-3). Cremos que após o Milênio, Satanás será solto por pouco tempo e tentará mais uma vez a humanidade (Gogue e Magogue), porém, será derrotado e lançado no lago de fogo e enxofre com todos os que o seguiram (Apocalipse 20.7-10) para todo o sempre.
j)	SOBRE O JUÍZO FINAL (JULGAMENTO DOS ÍMPIOS) -  Cremos que todos os
mortos desde o momento da queda homem (Gênesis 3.1-19) serão julgados pelos escritos no livro das obras (Apocalipse 20.12-13), bem como aqueles que rejeitaram o perdão em nosso Senhor Jesus Cristo e não foram encontrados seus nomes no Livro da Vida (Apocalipse 20.15).
k)	SOBRE  A  ETERNIDADE,  O  “ESTADO  ETERNO”  –  Cremos  que  após  o
Arrebatamento, após a Grande Tribulação, após a Guerra de Armagedom, após o Reino Milenar, após a soltura e lançamento de Satanás no Lago de Fogo e Enxofre, haverá Novos Céus e Nova Terra, então ocorrerá o Estado Eterno. Cremos que no Estado Eterno não mais haverá qualquer tipo de corrupção, pois, para sempre e eternamente, a presença de Deus estará conosco, na Cidade Santa a Nova Jerusalém que foi Preparada por Deus para os seus filhos fiéis e a ali viveremos eternamente (Apocalipse 20-21).

      `,
    imagem: require('@/assets/images/start12.png'),
  },

];

const cdv: Aula[] = [
  {
    modulo: 'cdv',
    numero: '1',
    titulo: 'Lição 1 - CDV: Visão e Pilares',
    videoUrl: 'https://www.youtube.com/embed/MkRQqATogCU?si=k2y1mzA92MtZTIrc',
    descricao:
      `
      INTRODUÇÃO
Com o objetivo de auxiliar o povo de Deus na prática dos dons e ministérios, o C.D.V. (Centro de Despertamento Vocacional), se apresenta como uma estratégia para ajudar cada cristão a descobrir a missão da sua vida e como usar seus dons e talentos em sua igreja local.

I.	A IMPORTÂNCIA DO C.D.V. PARA A IGREJA LOCAL
Há pelos menos quatro razões que justificam a importância do C.D.V. como estratégia que nos leva a ser uma igreja de dons e ministérios que passamos a descrever abaixo:
1.	Ajuda na prática de mandamentos bíblicos em relação aos dons. A importância dos dons e ministérios é claramente observada na Bíblia através dos seguintes textos: Rm. 12.6-8, 1 Co. 12.4-7 e 1 Pe. 4.10-11.
2.	Atua com uma visão da igreja onde cada membro é um ministro, refletindo no entendimento de que:
a)	Todo Cristão é chamado por Deus; chamado para servir;
b)	Todo Cristão tem pelo menos um dom espiritual. Não há cristão sem dom;
c)	Todo Cristão é um ministro, um sacerdote;
d)	Todo Cristão precisa desenvolver seus dons e talentos, na área em que mais está motivado para servir;
e)	Todo Cristão precisa ser aprimorado continuamente no seu chamado e ministério.
3.	É um curso prático, com conteúdo didático e interativo que mobiliza a igreja local nos ministérios, gerando maior participação das pessoas em aula e encorajando-as a desenvolverem seus dons e talentos através de relacionamentos intra e interpessoais. Ao final do curso, após passarem pela Consultoria (avaliação dos resultados dos testes realizados durante as aulas – pág. 90 e 91) os alunos são encaminhados para os ministérios em que estão motivados a servir, sendo promovidos treinamentos especializados para a realização das atividades específicas de cada setor da Rede Ministerial.
 
4.	Promove uma nova cultura ministerial na igreja, em que ninguém mais fica ocioso, pois identifica recursos aliando-os às necessidades e direciona todos os serviços de acordo com os dons e talentos que foram concedidos por Deus, para serem exercidos a serviço do próximo.
Desta forma, há qualidade no crescimento de nossa igreja local, levando em consideração a unidade e bom funcionamento do corpo de Cristo.

II.	A IGREJA E SUA ESTRUTURA
1.	Supremo Concílio
2.	Diretoria Local
3.	Departamentos
4.	P.G.
Através do CDV, buscamos criar oportunidade de reflexão quanto aos talentos e dons espirituais para direcionamento dos irmãos ao serviço ministerial.

RESET	Para quem deseja se batizar
START	Para os batizados que vêm do Reset ou de outra denominação
evangélica
CDV	Para quem deseja entender o seu papel no Corpo de Cristo

Rede Ministerial: É constituída de 9 ministérios e suas subcategorias:

Pequenos Grupos (P.G.): São pequenos grupos com encontros que ocorrem semanalmente com a finalidade de aproximar as pessoas que moram no mesmo bairro ou cidade, gerando relacionamentos com qualidade para os que já são cristãos, e principalmente uma oportunidade de convidar uma pessoa que nunca entraria numa igreja evangélica.
Pastoral: Partindo do princípio que somos o Corpo de Cristo e cada pessoa tem a sua devida função e valor no Reino de Deus, procuramos ter uma pastoral coesa e eficiente para atender as mais diversas demandas de uma Igreja Local com respaldo bíblico e espiritualidade. Nos organizamos como: presbíteros, evangelistas, pastores ministeriais, missionários, pastores locais e pastores conselheiros.

III.	OS 5C´s
Para que haja e seja mantida esta estrutura e sustentabilidade, devemos compreender os 5 (cinco) C´s:

Caráter	Ser verdadeiro, coerente, ter honestidade
Competência	Possuir Habilidade, Conhecimento, Atividade
Comprometimento	Ser comprometido (Porco) e não somente estar envolvido (galinha)
Comunhão	Devocionais que geram sintonia, identificação e o bem comum
Cultura	Viver a cultura da Igreja Local

CONCLUSÃO – A VISÃO DA CRIEP
Nossa igreja local só poderá realizar a sua missão partindo do princípio que sua relação com Deus e sua sinergia com as pessoas estejam firmadas nestes princípios e na palavra de Deus.
Somos uma igreja que adora a Deus, crê em Jesus Cristo, a através do Espírito Santo está em missão para estabelecer o Reino dos céus na terra.

      `,
    imagem: require('@/assets/images/cdv1.png'),
  },
  {
    modulo: 'cdv',
    numero: '2',
    titulo: 'Lição 2 - A igreja e sua missão',
    videoUrl: 'https://www.youtube.com/live/DK2qWOSDGic?si=SYpuf35vD1I86Ewl',
    descricao:
      `
      INTRODUÇÃO
Após termos aprendido sobre as convicções da IPAF em relação ao Reino de Deus sobre a igreja como organismo e organização, devemos nos atentar ao posicionamento que o discípulo de Cristo deve assumir perante Deus para que possa relacionar-se intimamente com Ele e como parte integrante do Corpo de Cristo, possa cumprir a missão de propagar a mensagem de salvação e esperança.
Para que isso ocorra, aprenderemos no CDV a nos preparar para esta missão, identificando a partir do nosso cotidiano nossa vocação, talentos e dons, os quais possam qualificar nossa “mão de obra” para nos tornarmos relevantes para estabelecer o Reino dos Céus na Terra.

I.	RELAÇÃO	E	CONCEITOS	HISTÓRICOS	QUE	ANTECEDERAM	A FORMAÇÃO DA IGREJA
A concepção da palavra Igreja era utilizada anteriormente no grego para designar qualquer assembleia ou reunião, ganhando maior evidência a partir do NT ao ser aplicada a um contexto espiritual a fim de se entender com maior clareza a realidade da prática Cristã.
Estudamos através do AT a origem e a herança do pecado após a queda do homem no Éden (Gn 3.1-24). Por conta deste evento, Deus passou a guiar seu povo estabelecendo com o homem uma relação de confiança, integridade e obediência. Isto se comprova em Noé quando recebeu a ordenança para construir a arca para um novo mundo (Gn 2.32), quando Abraão recebe a ordenança de partir para a nova Terra (Gn 12.1) e Moisés quando recebe a ordenança para seguir para terra prometida (Ex 12.40-41), por exemplo.
Ao longo da história, Deus realiza muitos prodígios e estabelece uma relação intensa e instrutiva para com o homem. Vejamos o exemplo de Moisés nos seguintes contextos: Nas leis dos 10 mandamentos (Ex. 20.3-17), a presença de Deus no tabernáculo (Ex. 35.8 – 39:43), o sacerdote como responsável pelo templo e seus sacramentos (Ex. 28) e as festas judaicas, dentre elas, a páscoa fazendo alusão da libertação do Egito (Ex. 12.11,27,43,48).
Posteriormente, o grande acontecimento da histórica Judaica foi o anúncio messiânico que resgataria a esperança de Israel, a vinda do Salvador do mundo (Is. 53). Ao passar dos anos, a tradição oral manteve viva a memória dos grandes feitos e promessas de Deus para com a
 
humanidade. Porém, a vida religiosa do judeu e seus respectivos rituais e sacramentos foram se corrompendo pelo jugo pesado da lei judaica e influências culturais.
Embora no tempo de Jesus Cristo o templo de Jerusalém estivesse estabelecido, sua razão de ser e sua respectiva missão estavam longe de Deus, tanto que em Jo. 2, Jesus menciona que o templo seria destruído e reconstruído em três dias. A partir deste momento, Jesus dá um novo sentido à Igreja e através do Espírito Santo faz do coração do homem um templo, pelo qual deveria propagar o evangelho para toda humanidade.
De acordo com este contexto, Jesus Cristo reconfigura a relação do homem com Deus e cumpre as profecias de Isaías na história judaica tornando gratuita a salvação do jugo condenatório do pecado (Jo. 5.24 e Rm. 8.1) e nos possibilitando compreender a “profundidade da encarnação e de sua obra redentora”.
Nossa convicção, como igreja CRIEP, em relação a Jesus Cristo, é a mesma da igreja do primeiro século: 1) Foi Homem que amou, obedeceu e cumpriu integralmente a Lei (Lc. 24.44); 2) Cordeiro Pascal (2 Co. 5.17); 3) O perfeito Sumo Sacerdote (Hb. 4.14-16); 4) Mediador entre Deus e os homens (1 Tm. 2.5-6); 5) Deixou o Espírito Santo para nos ensinar e conduzir para o verdadeiro caminho (Jo. 14.26).
Em resumo, uma vez que reconhecemos esta nova relação de Deus para com homem confessando Cristo como nosso único e suficiente salvador, e decidimos estabelecer através do Espírito Santo o Reino de Deus na Terra, nosso testemunho responsável vai além da tradição oral, vai ao encontro de nossas ações e serviços do cotidiano.

II.	A IGREJA E SUA HISTÓRIA
A origem da palavra igreja vem do grego, do termo EK-KLESIA, que significa “reunião de pessoas chamadas para fora”, conceituando o corpo de Cristo (organismo) como casa de oração.
Temos por definição de Igreja: Povo redimido, santo, habitado por Cristo e submisso a Ele como discípulos, para adorá-lo em comunidade no mundo. (Isaías 62-12)
Compreendida a definição acima, aprofundamos a reflexão de Igreja denominando o Espírito Santo como o “gestor” da distribuição dos dons e talentos e conduzindo através da graça de Deus a sinergia entre as pessoas (discípulos) em prol da missão de propagar o Reino de Deus, desenvolvendo os seguintes aspectos:
	A Igreja fundamentada em Cristo - A perspectiva desta palavra “igreja” aparece claramente no evangelho de Mateus como perspectiva espiritual, universal (16.18) e local (18.17). Nestes textos bíblicos percebemos que igreja pertence a Cristo “Minha igreja”, nele a igreja está alicerçada “Sobre esta rocha”, edificada “Eu edificarei” e vitoriosa “As portas do inferno não vão prevalecer”.
	A Igreja no primeiro século - Estudar sobre a igreja do primeiro século é fascinante, sua forma de viver integralmente os ensinos e ordenanças de Jesus Cristo sem dúvida é motivo de inspiração para igreja de nosso tempo: Suas reuniões de pessoas celebravam a comunhão e partilha (At. 2.42-47; 4.32-35; 5.12-15); Grupos e Locais de discípulos se formavam gradativamente (At. 8.1; 11.22, 26; 13.1; 15.3-4) e alguns casos se tornavam
 
até Igrejas (Comunidades Paulinas, Petrinas e Joaninas por exemplo); Organismo espiritual como corpo místico de Cristo (Ef. 1.22-23; 4.15-16) são milhares de discípulos de Jesus que transcendem o tempo, local e espaço.
	Igreja Universal e Espiritual e Igreja Local (vide quadro abaixo):

1	
IGREJA UNIVERSAL	1.	É invisível - um organismo vivo e espiritual, formado pelos salvos de todos os lugares e épocas da história da salvação.
2.	Não tem limitações geográficas, não está sujeita a dias, meses e anos, nação ou clero.
3.	É a Igreja do arrebatamento, aquela que vai subir com o Senhor.	
1.	Se denomina como a missão da evangelização e as pessoas que dela fazem parte, tornando- se agentes do Reino de Deus que refletem a imagem de Cristo.
2.	Pode ser entendido como aquela que desperta no homem a “razão do ser”, e através de suas ações e serviços fazem Jesus Cristo conhecido.

2	
IGREJA LOCAL	1.	É visível - composta do povo de Deus de uma localidade, que se reúne sistematicamente para adorá-Lo
2.	É a forma organizacional onde as pessoas congregam, e pertencem a um rol de membros.
3.	Não podemos afirmar que todos seus membros são verdadeiramente salvos, que vão subir no arrebatamento.	1.	Tem a finalidade de organizar o “envio” dos seus membros e contribuir na luz da palavra Deus com a relação entre Igreja (Organização) x Pessoas x Sociedade.
2.	Na Igreja Local aprendemos através de nossos pastores, professores e voluntários meios que potencializam a missão do nosso cotidiano.0

III.	A IGREJA E SUA MISSÃO
A Igreja como organismo e organização só poderá realizar a sua missão de estabelecer o Reino de Deus na terra, partindo do princípio que sua relação com Deus e sua sinergia com as pessoas estejam firmadas e fundamentadas na palavra de Deus.
Na CRIEP, em nosso programa de integração, apresentamos os passos básicos da cdv); partilhamos nossas crenças (Start) e a Igreja que desejamos ser e direcionamos a mão de obra das pessoas para o serviço do Reino de Deus (CDV).
O processo de integração da CRIEP e seus respectivos pilares buscam desconstruir um evangelho guiado por propósitos e interesses pessoais, para um evangelho genuíno que está sensível à vontade de Deus, responsável e maduro, no que diz respeito à missão da Igreja.
Como organização e instituição, buscamos na luz da palavra de Deus o aperfeiçoamento para cumprir com excelência a missão e propagação do evangelho.
 
CONCLUSÃO
Se os discípulos que fazem parte desta missão não estiverem devidamente orientados em relação a “sua fé” e ao “seu lugar” na missão evangelizadora da Igreja, dificilmente poderão transmitir através dos seus talentos e dons, o amor de Deus, a riqueza da solidariedade e frutos do Espírito que refletem a imagem de Cristo.

      `,
    imagem: require('@/assets/images/cdv2.png'),
  },
  {
    modulo: 'cdv',
    numero: '3',
    titulo: 'Lição 3 - O discípulo, a igreja e a cultura',
    videoUrl: 'https://www.youtube.com/embed/-ns29AeYozg?si=sLRQ-wKboJPTggNo',
    descricao:
      `
      INTRODUÇÃO
A brilhante trajetória dos discípulos está condicionada ao processo de aprendizado, desenvolvimento e aplicação de acordo com sua vocação, talentos e dons. O CDV tem o papel vital de focar e direcionar o discípulo dentro do organismo vivo da Igreja, e através de métodos práticos, gerar no discípulo a confiança, satisfação e segurança necessárias para tornar suas ações e serviços mais efetivos na grande missão de evangelizar o mundo.
Conforme refletimos no Start, o corpo de Cristo possui muitos membros e cada um deles é essencial para o funcionamento pleno no corpo. Se um dos seus membros está doente, todos se ajudam mutuamente para curá-lo, se existem dificuldades, todos contribuem com seu esforço para superá-las, por fim, um corpo em constante movimento elimina a atrofia de qualquer membro de seu organismo.


I.	O DISCÍPULO E SUA MISSÃO
À medida que o discípulo se compromete a ter Cristo como modelo de vida e através do Espírito Santo busca descobrir seu dom e talento, ele atinge a plena maturidade para atender a demanda da missão da igreja (universal e local) de evangelizar o mundo. A plena maturidade é construída e aperfeiçoada através das seguintes etapas:
a)	Aprendizado
A palavra discípulo é de origem hebraica “Talmid” e seu conceito advêm da tradição educacional judaica, onde meninos e jovens eram aprendizes e estudavam aos pés dos doutores da Lei (Rabis). Os “Talmidin” seguiam e imitavam a seus mestres.
Neste contexto, compreendemos melhor o que diz o apóstolo Paulo em 1 Coríntios 1.11: “Sede meus imitadores, como também eu de Cristo”. Ser discípulo se resume em:
•	Refletir a imagem de Cristo (2 Co. 3.18 e Rm. 8.29);
•	Ser submisso e obediente à Sua palavra (2 Tm. 3.16-17);
•	Amar ao próximo como Ele nos amou (Jo. 13.34);
•	Propagar o evangelho com responsabilidade e ousadia (Mc.16.15).
 
b)	Desenvolvimento
O processo de desenvolvimento do discípulo parte de sua relação com Deus (oração, obediência e cumprimento de suas ordenanças) e da compreensão pessoal através de seu chamado, sendo condições imprescindíveis para a descoberta e aperfeiçoamento dos dons e talentos adquiridos.
Nesse contexto, a igreja local pode oferecer muitas oportunidades para o desenvolvimento pessoal, ministerial e social, dinamizando as relações humanas através da manifestação da vocação, talentos e dons de cada discípulo integrante do corpo de Cristo (1 Jo. 1.3).
Os dons são distribuídos pelo Espírito Santo ao cristão regenerado, que crê em sua atualidade, que se envolve na igreja e está disposto a desenvolvê-los a ponto de descobrir seu ministério.
Entendemos que a distribuição dos dons e talentos atende à demanda existente em nossa comunidade, pois faz com que cada discípulo funcione como deveria funcionar, ou seja, cada membro do Corpo torna-se o “discípulo certo para o serviço certo” (Mt. 28.19).
c)	Aplicação e Prática do Discípulo
Aprendemos que todos os discípulos são vocacionados através de suas ações em propagar o Reino de Deus e através da sua “mão de obra” contribuem para a edificação do corpo de Cristo no âmbito pessoal e da igreja local (1 Co. 14.26).
Conclui-se desta forma, que todo discípulo, além de representar a igreja universal e local como organismo vivo (1 Pe. 2.3-4), utiliza seus talentos e dons diretamente na promoção da união e adoração mútua da igreja e na construção de um ambiente saudável, promovendo através do Espírito Santo a vida e, na pessoa de Cristo, resgata a esperança da humanidade quanto ao futuro como verdadeira missão (Mc. 16.15).


II.	O DISCÍPULO E A IGREJA
A igreja como corpo de Cristo é um organismo vivo com uma intensa e dinâmica atividade espiritual. É na igreja como um corpo vivo que se explica melhor: relacionamento, vida e trabalho ao passo que há a convivência entre os irmãos.
Naturalmente, o corpo de Cristo ganha diversidade de seus membros ao mesmo tempo em que cria interdependência para mantê-lo unido e saudável. Em 1 Co. 12.14-30, o apóstolo Paulo menciona que esta diversidade não pode ser prejudicial ao corpo de Cristo (v. 15-16) e todos estão no mesmo patamar (v. 17), haja vista a busca pela unidade espiritual.
A sinergia do corpo, levando à diversidade de seus membros, está diretamente ligada à aceitação pessoal (1 Co 12.15-16) e coletiva do discípulo (1 Co. 12.17), que busca maturidade em assimilar a igreja no plural permitindo a diversidade do plano de Deus (1 Co. 12.18,28-30) e a diversidade da convivência com as pessoas (1 Co. 12.19-20).
 
Podemos afirmar que o discípulo, através do seu cuidado, amizade, humildade, gentileza e serviço, possui vital responsabilidade em contribuir com a construção de um ambiente equilibrado (1 Co. 12.21), valorizando e unindo as pessoas (1 Co. 12.22-24, 25-26).
Por fim, como IPAF, buscamos exercer o discipulado de interação e diálogo em prol do pleno funcionamento do corpo de Cristo e só assim, poderemos testemunhar o Reino de Deus sem exclusividade ou partidarismo.


III.	O DISCÍPULO E A CULTURA
Ser discípulo em nosso tempo não é somente estar entre as quatro paredes da igreja local, é mais do que isso, é estar ligado diretamente ao ciclo de nossas relações e consequentemente ir além dessas paredes.
Embora cada ser humano seja composto por sua “própria” cultura, ideologia e visão de mundo, a igreja local é o lugar ideal para desenvolver o relacionamento cristão com os irmãos, o que contribui para a criação de estratégias que facilitam compartilhar crenças, hábitos e um sentido para uma cultura tão carente e corrompida nos dias de hoje.
Nosso objetivo como igreja é explorar a vocação, os talentos e dons como ponto de partida para formular um novo modelo de evangelização, conduta e vida, independentemente das dificuldades interpessoais do nosso cotidiano, não se resumindo somente aos cultos de domingo e respectivos trabalhos na igreja local.


CONCLUSÃO
À luz da palavra de Deus, compreendemos que Cristo nos trouxe salvação e nos elegeu como discípulos que levam adiante seu evangelho. A manifestação de talentos e dons faz parte do processo de maturidade do discípulo, em outras palavras, faz com que possamos assimilar nossa missão acerca da legítima vocação de anunciar o reino de Deus e que o nosso “ministério” jamais será frustrado, pois nosso serviço estará sempre em movimento com a Igreja Local e Universal.

      `,
    imagem: require('@/assets/images/cdv3.png'),
  },
    {
      modulo: 'cdv',
      numero: '4',
    titulo: 'Lição 4 - Descobrindo os Dons Espirituais',
    videoUrl: 'https://www.youtube.com/embed/hHdynW5aNKU?si=zzO5XwjCZGM1LbKq',
    descricao:
      `
      INTRODUÇÃO
No CDV a descoberta do dom é tratada em duas fases, a primeira na compreensão do dom espiritual como a essência da atuação do Espírito Santo, e a segunda na correspondência do respectivo dom à demanda da igreja local, identificando em qual ministério pode se atuar. Não há cristão, nascido de novo, sem dom.
Partindo do momento que reconhecemos a Jesus Cristo como Salvador e decidimos nos comprometer com a missão da igreja universal em propagar o Reino de Deus, o fruto do Espírito se manifesta através do testemunho no nosso cotidiano e na nossa respectiva “mão de obra” que realizamos na igreja local.


I.	A DESCOBERTA DOS DONS E TALENTOS NATURAIS
Compreender o que é dom é fundamental, inclusive saber o que é talento também. Veja o quadro a seguir:

DOM	
1. Donativo; dádiva; benefício.
2. Prenda, dote natural.
Entendemos que dom é um presente de Deus; Vem na fase em que aceitamos a Jesus, e nos tornamos templo do Espírito Santo.	

TALENTO
1. Aptidão natural ou adquirida.
2. Engenho, disposição, habilidade;
Na repetição é a habilidade de executar a tendência que há em nós;

Cada ser humano está sujeito a um determinado ciclo de vida. Thomas Edison, por exemplo, diz que talento é “1% inspiração e 99% transpiração”. Desta maneira, se crescemos em uma casa com grande fluxo de pessoas, certamente teremos o talento de organizar, acomodar e alimentar a todos. Já o dom, se manifesta na habilidade de receber pessoas, independente do fluxo na casa.
 
Na CRIEP compreendemos que o “ide” de Jesus (Mc. 16.15) abrange a vocação universal de pregar o evangelho, e através da combinação de talentos e dons naturais dos discípulos, os dons espirituais são descobertos e desenvolvidos mediante o “desempenho do serviço” prestado em prol do Reino de Deus.
Devemos saber que os dons naturais vêm de Deus e os talentos se desenvolvem ao longo do ciclo da vida. Embora estes dons e talentos ganhem corpo através da estrutura pessoal de cada indivíduo e de suas respectivas relações familiares e sociais, o CDV traz o resgate da rota original dada por Deus para cada indivíduo e determina que seus talentos e dons naturais sejam parte da missão de Deus para com a humanidade.


II.	A DESCOBERTA DOS DONS ESPIRITUAIS
Embora a Bíblia não trate especificamente sobre a questão da descoberta dos dons espirituais (não há na Bíblia textos como: “E agora, irmãos, quero que sigais estes passos para poderdes descobrir os vossos dons espirituais”), não podemos esquecer que os dons são de grande importância para o desempenho dos ministérios na igreja local.
Para que isso ocorra, precisamos compreender a ação vinda de Deus através do Espírito Santo nos ciclos da vida, e através do CDV tem-se uma ótima ferramenta pra favorecer comunidades locais com a finalidade de novas descobertas e reorientação do discípulo quanto à prática do serviço cristão.
a)	A dinâmica de manifestação dos dons espirituais
Devemos saber que eles são direcionados a todos os discípulos de Cristo (nascidos de novo e que desejarem recebê-los) e são aperfeiçoados através do Espírito Santo de Deus, não por nossos próprios méritos. É nesta perspectiva que os dons espirituais são fundamentais para a edificação da igreja.


b)	Aspectos fundamentais dos dons espirituais
Em 1 Coríntios 12 encontramos cinco aspectos importantes acerca dos dons:
-	Diversidade (1 Co. 12.4-6) – Os dons visam suprir as necessidades da igreja, que é um corpo com muitos membros (discípulos de Jesus);
-	Utilidade (1 Co. 12.7) – Os dons existem não para nosso deleite particular, mas para proveito comum, para o crescimento da Igreja;
-	Origem (1 Co. 12.11) – Os dons vêm à igreja, procedendo de Deus, por meio do Espírito Santo (Jo. 14.12,26; 16.13);
-	Distribuição (1 Co. 12.11) – É Deus quem distribui generosamente e de inúmeros modos seus inesgotáveis dons ao ser humano;
-	Universalidade (1 Co. 12.8, 11, 28-30). Todos recebemos dons. Não há discípulos de Jesus sem dons.
c)	Condições prévias para descoberta dos dons espirituais
 
Destacamos quatro condições prévias fundamentais para que se possa operar a descoberta dos dons espirituais:
-	Ser cristão regenerado: Os dons espirituais são conferidos exclusivamente aos membros do Corpo de Cristo.
-	Crer na atualidade dos dons espirituais: A maior parte dos cristãos que não creem nos dons espirituais está nessa condição porque nunca recebeu instruções, de maneira séria, a respeito.
-	Estar disposto a se envolver na igreja: Há um trabalho que Deus quer que você cumpra no Corpo de Cristo, uma tarefa específica para a qual Ele tem equipado você.
-	Desenvolver seus dons: Busque a Deus sincera e intensamente, pedindo orientação, visto que Deus quer que você descubra e desenvolva seus dons espirituais. Certamente, Ele o ajudará.


III.	PASSOS PRÁTICOS PARA A DESCOBERTA DOS DONS ESPIRITUAIS
No CDV desenvolvemos um modelo prático e moderno para descobrirmos nossos dons e encontrarmos nosso lugar no corpo de Cristo, não se esquecendo da busca em oração com humildade e submissão a Deus.
Na medida em que as demandas da igreja local vão aparecendo, surgem oportunidades que nos possibilitam desenvolver os dons que possuímos e promover a descoberta de novos dons. Abaixo destacamos alguns passos (dicas) para que você possa “encontrar” seu dom:
1.	Procure conhecer mais a respeito dos seus dons.
a)	Leia a Bíblia com frequência e observe que cada ação tem um propósito de Deus.
b)	Leia livros sobre dons.
c)	Converse com pessoas que já identificaram o seu dom.

2.	Envolva-se no maior número possível de áreas de modo que possa exercer seus dons.
a)	Fique atento no que mais “te toca” quanto ao cotidiano da igreja local.
b)	Se envolva com as atividades da igreja, mesmo sendo apenas um ponto de apoio.
c)	Olhe à sua volta, identificando necessidades, e depois tente fazer algo para supri-las.

3.	Observe se você está se realizando ao desempenhar seus dons.
a)	Nas atividades da igreja local, identifique o que você faz com mais alegria e com bom desempenho (Sl. 37.4 e Fp. 2.13).
b)	Fazer o que Deus quer não é desagradável, mas é obediência. Às vezes, começamos uma atividade em nossa igreja local que pode nos parecer desagradável, mas logo adiante acaba se tornando apaixonante por descobrirmos aquilo que Deus quer de nós!

4.	Adote avaliação de resultados.
a)	Avalie os resultados da sua atividade.
b)	Bons resultados (continue!), maus resultados (atenção!). Ex: Se você tem o dom de evangelista, as pessoas aceitarão a Cristo regularmente por meio do seu ministério.
 
5.	Confirmação da Igreja – Observe os testemunhos.
a)	Cremos que, através da direção do Espírito Santo, cada discípulo possui pelo menos um dom. Assim, estar no banco pode ser uma oportunidade de exercer o dom da intercessão, dar um abraço pode representar dom de misericórdia, um cumprimento de bom dia de forma alegre pode representar o dom de hospitalidade;
b)	Observe a confirmação da igreja local quanto à atividade que você exerce e seus resultados positivos a fim de confirmar o dom que possui.


CONCLUSÃO
Concluímos nesta lição que conhecer o dom, distribuído através do Espírito Santo dá sentido à nossa prática diária cristã e à continuidade do processo de serviço e evangelização do mundo onde estamos inseridos.
Em outras palavras, como Christian A. Schwarz diz: “À medida que os cristãos vivem de acordo com seus dons espirituais, eles não trabalham por seus próprios dons, mas pelo Espírito de Deus que trabalha neles”. Nas próximas aulas trataremos especificamente sobre os dons espirituais e as respectivas ferramentas que auxiliarão em seu desenvolvimento.

      `,
    imagem: require('@/assets/images/cdv4.png'),
  },
  {
    modulo: 'cdv',
    numero: '5',
    titulo: 'Lição 5 - Os dons de serviço prático e a igreja',
    videoUrl: 'https://www.youtube.com/embed/0cNAqvWIqxQ?si=yb7fj2tCwGfUDpoI',
    descricao:
      `
      Cada ser humano está sujeito a um determinado ciclo de vida. Thomas Edison, por exemplo, diz que talento é “1% inspiração e 99% transpiração”. Desta maneira, se crescemos em uma casa com grande fluxo de pessoas, certamente teremos o talento de organizar, acomodar e alimentar a todos. Já o dom, se manifesta na habilidade de receber pessoas, independente do fluxo na casa.
 
Na CRIEP compreendemos que o “ide” de Jesus (Mc. 16.15) abrange a vocação universal de pregar o evangelho, e através da combinação de talentos e dons naturais dos discípulos, os dons espirituais são descobertos e desenvolvidos mediante o “desempenho do serviço” prestado em prol do Reino de Deus.
Devemos saber que os dons naturais vêm de Deus e os talentos se desenvolvem ao longo do ciclo da vida. Embora estes dons e talentos ganhem corpo através da estrutura pessoal de cada indivíduo e de suas respectivas relações familiares e sociais, o CDV traz o resgate da rota original dada por Deus para cada indivíduo e determina que seus talentos e dons naturais sejam parte da missão de Deus para com a humanidade.


II.	A DESCOBERTA DOS DONS ESPIRITUAIS
Embora a Bíblia não trate especificamente sobre a questão da descoberta dos dons espirituais (não há na Bíblia textos como: “E agora, irmãos, quero que sigais estes passos para poderdes descobrir os vossos dons espirituais”), não podemos esquecer que os dons são de grande importância para o desempenho dos ministérios na igreja local.
Para que isso ocorra, precisamos compreender a ação vinda de Deus através do Espírito Santo nos ciclos da vida, e através do CDV tem-se uma ótima ferramenta pra favorecer comunidades locais com a finalidade de novas descobertas e reorientação do discípulo quanto à prática do serviço cristão.
a)	A dinâmica de manifestação dos dons espirituais
Devemos saber que eles são direcionados a todos os discípulos de Cristo (nascidos de novo e que desejarem recebê-los) e são aperfeiçoados através do Espírito Santo de Deus, não por nossos próprios méritos. É nesta perspectiva que os dons espirituais são fundamentais para a edificação da igreja.


b)	Aspectos fundamentais dos dons espirituais
Em 1 Coríntios 12 encontramos cinco aspectos importantes acerca dos dons:
-	Diversidade (1 Co. 12.4-6) – Os dons visam suprir as necessidades da igreja, que é um corpo com muitos membros (discípulos de Jesus);
-	Utilidade (1 Co. 12.7) – Os dons existem não para nosso deleite particular, mas para proveito comum, para o crescimento da Igreja;
-	Origem (1 Co. 12.11) – Os dons vêm à igreja, procedendo de Deus, por meio do Espírito Santo (Jo. 14.12,26; 16.13);
-	Distribuição (1 Co. 12.11) – É Deus quem distribui generosamente e de inúmeros modos seus inesgotáveis dons ao ser humano;
-	Universalidade (1 Co. 12.8, 11, 28-30). Todos recebemos dons. Não há discípulos de Jesus sem dons.
c)	Condições prévias para descoberta dos dons espirituais
 
Destacamos quatro condições prévias fundamentais para que se possa operar a descoberta dos dons espirituais:
-	Ser cristão regenerado: Os dons espirituais são conferidos exclusivamente aos membros do Corpo de Cristo.
-	Crer na atualidade dos dons espirituais: A maior parte dos cristãos que não creem nos dons espirituais está nessa condição porque nunca recebeu instruções, de maneira séria, a respeito.
-	Estar disposto a se envolver na igreja: Há um trabalho que Deus quer que você cumpra no Corpo de Cristo, uma tarefa específica para a qual Ele tem equipado você.
-	Desenvolver seus dons: Busque a Deus sincera e intensamente, pedindo orientação, visto que Deus quer que você descubra e desenvolva seus dons espirituais. Certamente, Ele o ajudará.


III.	PASSOS PRÁTICOS PARA A DESCOBERTA DOS DONS ESPIRITUAIS
No CDV desenvolvemos um modelo prático e moderno para descobrirmos nossos dons e encontrarmos nosso lugar no corpo de Cristo, não se esquecendo da busca em oração com humildade e submissão a Deus.
Na medida em que as demandas da igreja local vão aparecendo, surgem oportunidades que nos possibilitam desenvolver os dons que possuímos e promover a descoberta de novos dons. Abaixo destacamos alguns passos (dicas) para que você possa “encontrar” seu dom:
1.	Procure conhecer mais a respeito dos seus dons.
a)	Leia a Bíblia com frequência e observe que cada ação tem um propósito de Deus.
b)	Leia livros sobre dons.
c)	Converse com pessoas que já identificaram o seu dom.

2.	Envolva-se no maior número possível de áreas de modo que possa exercer seus dons.
a)	Fique atento no que mais “te toca” quanto ao cotidiano da igreja local.
b)	Se envolva com as atividades da igreja, mesmo sendo apenas um ponto de apoio.
c)	Olhe à sua volta, identificando necessidades, e depois tente fazer algo para supri-las.

3.	Observe se você está se realizando ao desempenhar seus dons.
a)	Nas atividades da igreja local, identifique o que você faz com mais alegria e com bom desempenho (Sl. 37.4 e Fp. 2.13).
b)	Fazer o que Deus quer não é desagradável, mas é obediência. Às vezes, começamos uma atividade em nossa igreja local que pode nos parecer desagradável, mas logo adiante acaba se tornando apaixonante por descobrirmos aquilo que Deus quer de nós!

4.	Adote avaliação de resultados.
a)	Avalie os resultados da sua atividade.
b)	Bons resultados (continue!), maus resultados (atenção!). Ex: Se você tem o dom de evangelista, as pessoas aceitarão a Cristo regularmente por meio do seu ministério.
 
5.	Confirmação da Igreja – Observe os testemunhos.
a)	Cremos que, através da direção do Espírito Santo, cada discípulo possui pelo menos um dom. Assim, estar no banco pode ser uma oportunidade de exercer o dom da intercessão, dar um abraço pode representar dom de misericórdia, um cumprimento de bom dia de forma alegre pode representar o dom de hospitalidade;
b)	Observe a confirmação da igreja local quanto à atividade que você exerce e seus resultados positivos a fim de confirmar o dom que possui.


CONCLUSÃO
Concluímos nesta lição que conhecer o dom, distribuído através do Espírito Santo dá sentido à nossa prática diária cristã e à continuidade do processo de serviço e evangelização do mundo onde estamos inseridos.
Em outras palavras, como Christian A. Schwarz diz: “À medida que os cristãos vivem de acordo com seus dons espirituais, eles não trabalham por seus próprios dons, mas pelo Espírito de Deus que trabalha neles”. Nas próximas aulas trataremos especificamente sobre os dons espirituais e as respectivas ferramentas que auxiliarão em seu desenvolvimento.

1	
Profecia	Ouve a Deus e transmite uma mensagem pública que revela a justiça e/ou injustiça, através de uma revelação especial ou através da Bíblia.	Conduz as pessoas a verem Cristo e as realidades espirituais com mais clareza; Ajuda as pessoas a receberem as orientações de Deus, fortalecendo sua convicção na perspectiva bíblica para superar momentos difíceis.

2	
Serviço	Supre as necessidades da igreja através de realização de projetos e serviços na igreja.	Compreende as necessidades práticas e toma iniciativa para supri-las rapidamente. Fica frustrado quando isto não é possível; Assume a responsabilidade para fazer do seu jeito e se envolve em outras atividades por “não saber dizer
não”.

3	
Ensino	Procura sistematizar e explicar a verdade bíblica para as pessoas apreciá-las, entendê-
las e usá-las.	Cria alicerce e ajuda no crescimento e amadurecimento da fé cristã; Incentiva o discipulado entre as pessoas.




4	
Exortação	Estimula e encoraja as pessoas a seguirem os propósitos de Deus e a experimentar verdades divinas.	Dirige palavras de ânimo, consolo, conforto mediante às fragilidades emocional e espiritual estimulando à ação (1 Ts. 5. 11 e 2.12);
Participa de aconselhamentos com frequência, fortalece o novo convertido e tem otimismo mediante as tribulações que conduzem à maturidade.


5	
Contribuição	Doação e liberalidade para contribuir com recursos pessoais para ajudar a superar dificuldades e realizações ministeriais.	Partilha aquilo que tem com alegria e sua primeira reação sempre é de contribuir mediante a necessidade material; Percebe quando e onde Deus quer usar os bens que estão sob sua responsabilidade.


6	
Presidir (Liderança)	Liderança para ajudar a equipe a perceber seus propósitos e visão de Deus, e mobiliza-os para execução.	Assume sua liderança que é reconhecida pelos seus liderados; É uma pessoa de visão, que estrutura e esclarece para as pessoas e tem disposição para se responsabilizar por outras pessoas.


7	
Misericórdia	Identifica-se e Responde às carências de pessoas aflitas ou necessitadas.	Tem alegria de trabalhar com pessoas marginalizadas e/ou ignoradas pela maioria; Gosta de visitar hospitais ou lares de pessoas necessitadas se sentindo agente abençoado e abençoador.



8	
Administração (Governo)	Traça e executa planos eficazes para resolver problemas.	Tem facilidade para organizar ideias visando um serviço mais eficaz; Procura soluções práticas para os problemas enfrentados e interpreta ideias e objetivos do grupo, pensando em meios de colocá-los em prática.


9	
Socorro	Ajuda as pessoas investindo tempo, talento para o corpo de Cristo permanecer sadio e produtivo (1 Co 12.28).	Ajuda líderes sobrecarregados e fica à vontade em fazer tarefas auxiliares; Providencia certos trabalhos para a igreja atingir seus objetivos.




10	
Hospitalidade	Acolhe com alegria as pessoas calorosamente e providencia abrigo e alimentos.	Abre sua casa e faz a pessoa se sentir da família. Procura meios para acolher bem as pessoas até elas se sentirem a vontade; Preocupa-se com os visitantes da igreja e procura atender as necessidades daqueles que chegam à igreja ou em casa. (1 Pe. 4.9; Rm. 12.13).



11	
Intercessão	Oração e súplica por extensos períodos de tempo e recebem respostas às orações	Desejo de orar frequentemente, seja em casa ou “informalmente” durante o dia; Separa um tempo a sós com Deus e intercede pelas pessoas.

      `,
    imagem: require('@/assets/images/cdv5.png'),
  },
  {
    modulo: 'cdv',
    numero: '6',
    titulo: 'Lição 6 - Os dons de ministério e a prática excelente',
    videoUrl: 'https://www.youtube.com/embed/UGEjmcza0aI?si=IJ0UdOHPU5A9sVyl',
    descricao:
      `
      INTRODUÇÃO
A igreja é composta por pessoas que se reúnem na luz da palavra de Deus para definir local, espaço e estrutura organizacional e eclesial e como comunidade de discípulos de Jesus Cristo, caminha rumo à perfeição.
Mas para que isso aconteça, torna-se necessário que alguns discípulos sejam formadores espirituais para desenvolver serviços com excelência, gerando através dos ministérios um ambiente acolhedor, agradável e saudável.


I.	CONHECENDO OS CINCO DONS NA ÁREA DE MINISTÉRIO
Em Efésios 4.11 são apresentadas as cinco áreas-chave de ministérios da igreja. Vamos refletir sobre cada uma delas:

1	
Apóstolo (Não consagramos Apóstolo)	É o obreiro apostólico enviado com autoridade e poder para comunicar as Boas-Novas do Reino de Deus resultando na formação e fundação de igrejas. Este apostolado também pode contribuir com outras igrejas com fundamentos bons quanto à sã doutrina e ao governo saudável.
(Ef. 4.11; 1 Co. 12.28).	
Fica empolgado com trabalhos missionários urbanos, regionais e no exterior. Adapta-se em situações diferentes para evangelizar; coopera com trabalhos pioneiros e através da ampla visão do Reino de Deus, olha além da sua denominação.

2	
Profeta	Pregação e/ou declaração inspirada por alguém chamado para proclamar a verdade de Deus. Este chamado acontece através da Pregação, (1 Co.
14.24-25), revelação específica
(1 Tm. 4.14), conselhos
profundos (At 15.32), advertência acerca de	Sua mensagem é baseada na escritura, aceita, discernida e anunciada rigorosamente; mensageiro designado por Deus com poder e autoridade; sua expressão é incisiva, franca e persuasiva; usa a Bíblia como bússola para repreensão e
correção do caminho.
 
		problemas futuros (At. 11.27-30; 21.10-26) e até mesmo oração (1 Tm. 4.14).
No Novo Testamento não tem caráter preditivo (primariamente). Objetivo: exortar, consolar e edificar (1 Co.
14.3).	Note uma diferença: o profeta é uma pessoa dada à igreja e profecia é um dom dado à pessoa (vide lição anterior).

3	
Evangelista	É o pregador que tem paixão em partilhar as boas novas com pessoas não evangélicas de tal forma que se tornem discípulos e responsáveis para evangelizar outros.	Tem facilidade em iniciar conversas com estranhos e gosta de conduzi-la à conversão; se preocupa com parentes, vizinhos e colegas que não conhecem a Cristo e gosta de cooperar com trabalhos
evangelísticos.

4	
Pastor	É	o ministro do amor de Deus, ele possui paixão em discipular, equipar, guiar a ovelha no caminho saudável individual e mútuo, e a se reproduzirem.	Preocupa-se em restabelecer o indivíduo e sente a necessidade de levar o crescimento individual e coletivo das pessoas; tem prazer de prover alimento ao próximo através da
palavra de Deus.

5	
Mestre	
É o mestre que procura, sistematiza e apresenta as verdades da Palavra de Deus, de tal forma que outros aprendam.	Tem discernimento pedagógico da palavra de Deus e juntamente com a busca profunda do conhecimento das escrituras, formula uma mensagem de ensino atraente e responsável. Não gosta de ficar preso ao ensino preparado por outros, preferindo expor o assunto baseado no seu próprio estudo.
Note uma diferença: O mestre é uma pessoa dada à igreja e o ensino é um dom dado à pessoa
(vide lição anterior).

Com efeito, quando estes dons de liderança são exercitados pela comunidade local, são gerados os seguintes resultados práticos (Ef. 4.13-16):
a)	Uma visão espiritual única (v. 13);
b)	Maturidade espiritual dos discípulos (v. 14);
c)	Relacionamentos saudáveis, marcados pelo amor e verdade (v.15).
d)	Responsabilidade mútua (v. 16).
 
II.	O SEGUNDO TESTE DOS DONS ESPIRITUAIS
Este é o segundo teste de dons. Logo abaixo, você encontrará 25 afirmações. Leia cada uma com bastante atenção. Se for preciso, leia mais de uma vez. Para cada afirmação, coloque uma nota de 0 a 5, segundo a escala abaixo. Responda todas as questões de forma sincera, o mais próximo possível da sua experiência. Coloque sua nota na frente de cada item.

      `,
    imagem: require('@/assets/images/cdv6.png'),
  },
  {
    modulo: 'cdv',
    numero: '7',
    titulo: 'Lição 7 - A importância dos talentos naturais',
    videoUrl: 'https://www.youtube.com/embed/LGVvLI1cmjU?si=mkpPo-_JGbBJn-nG',
    descricao:
      `
      INTRODUÇÃO
Benjamim Franklin disse: “Não esconda os seus talentos. Para o uso eles foram feitos.” Em Mateus 25.14-30, Jesus conta a parábola de um homem que ao sair em viagem chama seus três servos e confia-lhes seus bens (talentos) de forma diversa a cada um.
Ao retornar depois de muito tempo, este homem verifica que o servo que havia recebido cinco talentos os multiplicou por mais cinco, o que recebera dois talentos os investiu obtendo mais dois e o último servo, este com muito medo, cavou o único talento que recebeu, e por consequência desta atitude acabou ficando sem talento algum.
Devemos saber que os talentos que possuímos não devem ser negligenciados e sim utilizados em prol do Reino. Nesta lição você aprenderá sobre os conceitos certos e errados a respeito dos talentos naturais além de identificar as principais habilidades que possui.


I.	TALENTO X DOM
Talento é habilidade, destreza, inteligência. É a aptidão natural que nos faz agir de determinadas maneiras diante de situações do dia a dia. Durante a constituição do feto, bilhões de conexões neuronais são formadas no cérebro. Até os 3 anos de idade muitas dessas conexões são naturalmente eliminadas, de acordo com estímulos dos primeiros anos de vida. Esse conjunto de conexões que persiste é responsável pelas possibilidades de comportamento, atitudes, pensamentos e sensações do indivíduo, ou seja, são seus talentos mais dominantes.
Dom não é talento! Todas as pessoas possuem talentos, mas só os cristãos regenerados (Aula 4) têm dons espirituais. Veja, cantar é um talento natural, encorajar os outros por meio do louvor é um dom. Ensinar é um talento, mas o ensino de maneira que as pessoas entendam e vivam a revelação da Palavra é dom. Dom e Talento em operação conjunta, proezas acontecerão na igreja local.
 
II.	4 CONCEITOS ERRADOS SOBRE TALENTOS/HABILIDADES
Não é mais importante distinguir dons de talentos, do que usá-los para edificação do Corpo de Cristo e glória de Deus (Cl. 3.17; 1 Pe. 4.10-11). No entanto, algumas pessoas possuem conceitos errados sobre talentos e habilidades, os quais passamos a destacar:
1.	As pessoas não nascem com habilidades, elas aprendem a partir da experiência. Simplesmente isto não é verdade. Existe um bom número de habilidades que parecem ser congênitas e desenvolvidas muito cedo na infância. Quando as pessoas dizem: “Ele parece ter um talento natural”. Isto provavelmente é verdade.
2.	Se você tem certas habilidades, você percebe que as têm. Isto também não é verdade. Provavelmente você usa alguns talentos ou habilidades os quais não percebe que possui. Você precisa de um processo para identificá-las.
3.	Habilidades que eu uso para trabalhar são usadas somente naquele ambiente, não poderia usá-las no ministério. Ao final deste curso, você verá o engano desta ideia. Seja criativo.
4.	Muitas pessoas têm poucas habilidades. Isto também não é verdade! A verdade é que muitas pesquisas têm demonstrado certa proporção de pessoas que possuem de 500-700 habilidades diferentes.

INTRODUÇÃO
Vocação é um termo derivado do verbo no latim “vocare” que significa “chamar”. É uma inclinação ou tendência que leva o indivíduo a exercer uma determinada carreira ou profissão. É uma competência que estimula à prática de atividades que estão associadas aos seus desejos de seguir determinado caminho.
Na Bíblia, o termo vocação é sinônimo de chamado (procedente de Deus) e aparece no Novo Testamento 148 vezes possuindo origem no vocábulo grego “kaleo”, além de ter o mesmo significado de que a vontade de Deus.


I.	DEDICADOS À VOCAÇÃO DIVINA
Cada cristão é vocacionado para um serviço espiritual, mas a principal “vocação divina” é ser discípulo de Jesus. O discípulo é vocacionado para o serviço, havendo grande necessidade da implementação dessa ideia central por parte da comunidade cristã.
Em relação ao serviço cristão, nosso chamado é definido pelo dom espiritual que temos. Assim, a vocação apresenta-se como a reinterpretação da vontade de Deus para nós, em harmonia com a maneira humana livre de agir implicando na auto realização do discípulo de Cristo.
Desta forma, quando decidimos fazer de nossa vida uma vocação, aceitamos a inspiração divina como opção de vida ao invés de viver um juízo de filosofia e passamos a viver como pessoas chamadas e não obrigadas!
Quando vivemos como pessoas obrigadas:
1)	Nos sentimos pressionados por outros;
2)	Não sabemos onde encontrar a força para fazer tudo o que precisa fazer, e
3)	Temos o desejo de escapar do compromisso de alguma maneira. Já quando passamos a viver como pessoas chamadas:
1)	Sentimos a direção clara de Deus, nos trazendo força, orientação e alegria na vida;
 
2)	Percebemos que o tempo acompanha os propósitos de Deus;
3)	Começamos e terminamos o dia com alegria, certos do que Deus nos orientou a fazer e agradecendo a Ele pelo que nos confiou como tarefa.
Hoje, o grande desafio do discípulo de Cristo é viver como uma pessoa chamada. Na maioria das vezes nos sentimos “obrigados” a servir aos outros em virtude de vivermos a “tirania do urgente” que faz com que percamos a importância do que realmente é prioridade em nossas vidas.


II.	O CHAMADO DA SALVAÇÃO E DO SERVIÇO
Mas quantos chamados existem? Um? Dois? Existe um chamado geral que é para o arrependimento ou salvação e outro específico que é para o serviço? Veja abaixo em 2 Co. 5.18-20:
“Mas todas as coisas provêm de Deus, que nos reconciliou consigo mesmo por Cristo, e nos confiou o ministério da reconciliação; pois que Deus estava em Cristo reconciliando consigo o mundo, não imputando aos homens as suas transgressões; e nos encarregou da palavra da reconciliação. De sorte que somos embaixadores por Cristo, como se Deus por nós vos exortasse. Rogamos-vos, pois, por Cristo que vos reconcilieis com Deus” (2 Co. 5.18-20).
Existe apenas um chamado divino, mas que é duplo, pois ocorrem:
a)	Salvação: (“Deus, que nos reconciliou consigo mesmo”) e;
b)	Serviço: (“nos confiou o ministério da reconciliação”, “nos encarregou da palavra de reconciliação”)
Diante disto, não pode haver um chamado para a salvação sem que haja o chamado para o serviço. Somos embaixadores de Cristo e temos uma missão: ser e fazer discípulos!


III.	O PAPEL DE DEUS EM NOSSA VOCAÇÃO
É Deus quem toma a iniciativa, nos capacita e nos delega autoridade. Ele leva em conta nossas características individuais, como “temperamento” e “personalidade” (Jo. 15.16; Ef. 1.11), valoriza nossos talentos e dons (2 Co. 3.4-6; Cl. 1.27), além de nos legitimar para anunciar as boas novas do evangelho (Jo 12.49-50; Mt 16.19-20).


CONCLUSÃO
A nossa vocação é uma ação da vontade livre e pessoal de Deus, é a manifestação do ato de sua vontade benevolente e que jamais anula nosso livre-arbítrio.
“Ninguém pode jamais fazer todo o seu trabalho por você. Deus lhe deu um ambiente especial e um conjunto específico de experiências da Sua fidelidade, além de uma personalidade, e Ele investiu a Sua misericórdia e graça em você de modo que possa abençoar algumas pessoas mais do que qualquer outro poderia. Você é o instrumento mais perfeito de Deus para algumas
 
tarefas. Você tem seu próprio papel a desempenhar no plano de Deus, e ninguém mais pode substituir você.
Deus precisa de você para a tarefa para a qual Ele o está preparando. Será necessário todo o seu amor, oração e fidelidade para cumprir o chamado e a vontade de Deus para você. Se eu deixar parte do meu trabalho sem fazer e você preencher o meu lugar, deixará, então, vazio o lugar que Deus queria que você ocupasse, a parte do trabalho que Deus queria que você fizesse ficará inacabada. Nenhum de nós tem o direito de concluir: “Se eu não obedecer a Deus, algum outro me substituirá. Se você deixar de obedecer a Deus, haverá uma brecha no trabalho de Deus (Ez. 22.30). Existem muitas brechas abertas na obra de Deus ao redor do mundo hoje”. Wesley Duewel, Deixe Deus Guiá-lo Diariamente (1996, p. 213).


      `,
    imagem: require('@/assets/images/cdv7.png'),
  },
  {
    modulo: 'cdv',
    numero: '8',
    titulo: 'Lição 8 - A vocação e o chamado divino',
    videoUrl: 'https://www.youtube.com/embed/mzxQ6vxRwUI?si=Xo57p5F4LnsIJHcx',
    descricao:
      `
      INTRODUÇÃO
Motivação é o ato ou efeito de motivar; motivo, causa; conjunto de processos que dão ao comportamento uma intensidade, uma direção determinada e uma forma de desenvolvimento próprias da atividade individual.
Etimologicamente, motivação vem do latim movere, que significa deslocar, fazer mudar de lugar e é a junção dos termos motivo + ação, significando causa, razão ou fim específico. É aquilo que impulsiona a pessoa de dentro para fora, sendo os motivos que levam a pessoa a agir.1


I.	MOTIVAÇÃO (AÇÃO) – A FERRAMENTA ADEQUADA
Abraham Maslow, psicólogo atuante no século XX, disse que a motivação se dinamiza através de necessidades humanas. No entanto, devemos levar em consideração o motivo e a ação praticada, até mesmo a ferramenta utilizada para que tais necessidades sejam atendidas.
Se sentir alegre e feliz não é condição básica para ter certeza de que se tem a motivação correta. Muitas pessoas investem em boas coisas, no entanto com as motivações erradas. Outras possuem as motivações corretas, mas andam com pessoas erradas.
Para descobrirmos nossa real motivação deveríamos nos fazer as seguintes perguntas:
1.	Por que faço o que faço?
2.	Em que lugar desejo chegar?
3.	Faço isso com a ferramenta adequada?
Imagine um pedreiro que foi contratado para derrubar uma pequena parede e tem 3 dias para isso. Não precisamos entender de obras para saber que este serviço é plenamente possível de ser realizado neste tempo, não é? Agora, imagine que o mesmo pedreiro, ao invés de receber uma marreta, recebe uma colher de pedreiro para derrubar a parede. Será que ele conseguirá terminar o serviço no prazo solicitado?
Um líder conseguiria liderar sua equipe com qualidade não se utilizando de clareza e objetividade? Provavelmente não.


1 Etimologia e Motivação, ARTIGO / 13 DE FEVEREIRO DE 2012 / POR PROF. LUIZ MACHADO, PHD
 
Igualmente aos exemplos acima, apesar da motivação correta, muitas pessoas não se atentam à ferramenta adequada para cumprimento de seus objetivos ou propósitos, fazendo com que se sintam como se estivessem no lugar errado, até desanimando no meio do caminho.


II.	MOTIVAÇÃO EMOCIONAL – PAIXÃO
Para indicar maior interesse, utilizaremos o termo “paixão” ao invés de motivação. Paixão é motivação emocional. Motivação significa um estado psicológico caracterizado por elevado grau de disposição ou vontade de realizar uma meta, um sonho, um projeto.
Qual é a sua paixão? Você consegue se sair bem ou se entrega de coração àquilo que faz?
A motivação surge do nosso íntimo, nos motivando, orientando e dando energia para prosseguirmos. É um desejo do meu coração, dado por Deus, pessoal e que me impele a fazer diferença num “lugar” específico respondendo à pergunta: O que estou equipado para fazer?
Devemos prestar atenção naquilo que está por trás da nossa motivação (aquilo que realmente queremos) e com qual ferramenta iremos atingir o objetivo planejado.


III.	PASSOS PRÁTICOS PARA DESCOBRIR SUA ÁREA DE PAIXÃO
Vamos tentar descobrir sua área de paixão, aquela em que ela realmente se motiva com uma atividade individual. Como você deve se preparar para este exercício?
Considere as perguntas e responda-as sozinho. Não se preocupe se você pode ou não concretizar sua paixão, nem como isto pode ser feito. Responda às perguntas como se não houvesse nenhum obstáculo para a realização dos desejos do seu coração.

CONCLUSÃO
O grande desafio é definir a motivação correta. Para que possamos ter um objetivo real e lograr êxito, é necessário definir o que realmente se quer e analisar a motivação, ou seja, fazendo a coisa certa, com a motivação correta e com a ferramenta adequada faremos a diferença no lugar certo.

      `,
    imagem: require('@/assets/images/cdv8.png'),
  },
  {
    modulo: 'cdv',
    numero: '9',
    titulo: 'Lição 9 - Motivação: Servindo melhor',
    videoUrl: 'https://www.youtube.com/embed/CThlekbyqiQ?si=C-mBpNN_2LwNh7z0',
    descricao:
      `
      INTRODUÇÃO
“Você é um ser diferente, não há ninguém igual a você. Só há ‘um você’ no mundo. Há um lugar no Corpo de Cristo em que somente você, com seu chamado, pode ocupar.”
Cada ser humano constitui uma individualidade, sendo único em seu modo de ser e pensar. Assim, o homem é distinto e superior aos animais por possuir autoconsciência e autodeterminação, personalidade e o que o irracional não tem: intelecto, vontade e emoções.
O evangelho, que leva a pessoa a conhecer a Deus como Pai amoroso, não despersonaliza o indivíduo. Com efeito, a proposta do cristianismo não suprime nada que seja bom e saudável na cultura e no indivíduo.


I.	O ESTILO PESSOAL – A PERSONALIDADE DO SER HUMANO
Nesta lição, trataremos sobre estilo pessoal, o modo pelo qual o ser humano se motiva e se organiza. Para começar a entender e descobrir qual é o seu estilo pessoal, devemos falar um pouco sobre a personalidade do ser humano.
A personalidade humana é o conjunto de qualidades que define a individualidade de uma pessoa moral. Ela é formada durante as etapas do desenvolvimento psicoafetivo pelas quais passa a criança desde a gestação. Para a sua formação, incluem tanto os elementos geneticamente herdados (temperamentos), como também os adquiridos do meio ambiente no qual a criança está inserida (caráter).
Deus tem um propósito especial para cada um de nós e é o maior interessado pelas necessidades psicológicas do indivíduo apanhado pelas aterrorizantes complexidades da vida. Ele leva em consideração nossa personalidade, mas é Ele quem transforma nosso caráter (Mt. 5.8; Gl. 4.19; Ef. 1.4; 2 Tm. 3.17; 2 Pe. 1.3).


II.	ELEMENTOS BÁSICOS DO ESTILO PESSOAL
Os elementos básicos do nosso estilo pessoal são motivação e organização. Em relação à motivação, assunto tratado na aula anterior, o ser humano pode ser motivado por tarefas ou por pessoas.

      `,
    imagem: require('@/assets/images/cdv9.png'),
  },
  {
    modulo: 'cdv',
    numero: '10',
    titulo: 'Lição 10 - Descobrindo seu estilo pessoal',
    videoUrl: 'https://www.youtube.com/embed/N01LKNkT4r0?si=UumwXY425D1vErKB',
    descricao:
      `
      1.	COMO VOCÊ SE MOTIVA?

Motivado por tarefas	
É estimulado ao realizar tarefas	

Motivado por Pessoas
É estimulado ao relacionar-se com pessoas

Esta escala descreve como você recebe e concentra sua energia emocional e a maneira como você prefere interagir com pessoas e tarefas.
a)	No fim da Escala de Tarefas está a pessoa que se estimula realizando coisas. No final da Escala de Pessoas está a pessoa que se sente motivada interagindo com outros.
b)	Isto não quer dizer que as pessoas motivadas por pessoas não estejam preocupadas com as realizações de tarefas, ou que as pessoas motivadas por tarefas não estejam preocupadas com relacionamentos. É mais uma questão de prioridade e abordagem.

MOTIVADO POR TAREFAS, REALIZA ATIVIDADE MELHOR QUANDO:
Seu enfoque ministerial se dá pelo cumprimento de tarefas.	Seu enfoque ministerial são pessoas.
Você tem oportunidades para realizar tarefas.	Você tem oportunidades para desenvolver relacionamentos.

MOTIVADO POR PESSOAS, REALIZA ATIVIDADE MELHOR QUANDO:
Seu enfoque ministerial se dá pelo cumprimento de tarefas.	Seu enfoque ministerial são pessoas.
Você tem oportunidades para realizar tarefas.	Você tem oportunidades para desenvolver relacionamentos.

      `,
    imagem: require('@/assets/images/cdv10.png'),
  },
  {
    modulo: 'cdv',
    numero: '11',
    titulo: 'Lição 11 - Compreendendo o temperamento pessoal',
    videoUrl: 'https://www.youtube.com/embed/4S2NmIkARpE?si=-VHqPWIHsie5FBSe',
    descricao:
      `
      INTRODUÇÃO
“Não existe nada mais fascinante a respeito do homem do que o seu temperamento. É o temperamento que supre cada ser humano com as qualidades marcantes de singularidade que o tornam tão individualmente diferente de seus semelhantes como os diferentes contornos que Deus deu aos flocos de neve. É a força invisível que alicerça a ação humana, uma força que pode destruir um ser humano normal e eficiente, a menos que seja disciplinada e controlada.”
2

Segundo o dicionário, temperamento é: “Estado fisiológico ou constituição particular do corpo; compleição. O conjunto dos traços psicofisiológicos de uma pessoa, e que lhe determinam as reações emocionais, os estados de humor, o caráter (Têmpera). Mistura proporcional de coisas, combinação, mescla.”


I.	APRENDENDO MAIS SOBRE OS TEMPERAMENTOS
A palavra “TEMPERAMENTO” vem do latim e quer dizer: “Mistura correta”. Relaciona-se com a ideia da medicina antiga (Hipócrates, há cerca de 2.500 anos) de que o corpo continha quatro líquidos ou seiva: SANGUIS (Sangue), CHOLOS (Bílis Amarela), MELANCHOLOS (Bílis Negra) e FLEUMA (Mucosidade).
Compreenda uma coisa sobre o temperamento: seu temperamento nunca muda. Tal como sua aparência, sua altura e seu quociente de inteligência, seu temperamento será uma parte de você enquanto viver. O temperamento influencia tudo o que você faz, desde os hábitos do sono, estudo, estilo de alimentação, até a maneira de como você se relaciona com outras pessoas.
Humanamente falando, não existe outra influência mais poderosa em sua vida do que seu temperamento ou a combinação deles. É difícil haver uma função que não seja influenciada pelo nosso temperamento.
O temperamento é a combinação de características que herdamos de nossos pais (bagagem genética). Naturalmente, o temperamento não é a única influência sobre nossa conduta. A vida

2 LAHAYE, Tim. Temperamentos controlados pelo Espírito. São Paulo: Loyola, 1983. p. 9
 
doméstica, o treinamento, a educação e a motivação, por igual modo, exercem poderosas influências sobre nossas ações por toda a vida.
O temperamento, entretanto, é a principal influência na vida de uma pessoa, não somente por ser a primeira coisa que nos afeta, mas porque, como a estrutura corporal, a cor dos olhos e outras características físicas, ele nos acompanha por toda a vida. O temperamento estabelece fortes diretrizes no comportamento de todo indivíduo.


II.	VANTAGENS DE CONHECER O TEMPERAMENTO PESSOAL PREDOMINANTE
Primeiramente precisamos entender que o temperamento é herdado e congênito, e não pode mudar. Pode sim, ser controlado pelo Espírito Santo, mediante a santificação, mas não transformado. Os estudiosos do assunto ensinam que o temperamento é herdado: 1) 50% dos pais; 2) 25% dos avós; 3) 20% dos bisavôs; e 4) 5% dos trisavôs.
A falta de conhecimento do temperamento é uma das causas geradoras de conflitos de personalidade (geralmente chamada de incompatibilidade). Portanto, precisamos conhecer nosso temperamento predominante para melhor entendermos a nós mesmos, para nos aceitarmos e nos relacionarmos bem com os outros.
Não podemos, jamais, confundir temperamento com má educação, má formação social, disfunções orgânicas do indivíduo, falhas de caráter; senão vamos querer justificar nossas deficiências temperamentais, ao invés de nos deixar encher do Espírito Santo (Ef. 5.18).
Portanto, é necessário conhecermos nosso temperamento predominante para melhor nos conhecermos (Por que somos assim ou por que agimos como agimos?), além de conhecer melhor também nosso próximo e saber de qual modo podemos compreendê-lo melhor. O temperamento dá ao homem forças e fraquezas. Embora gostemos apenas de pensar em nossas forças, todos nós temos fraquezas.


III.	AUTO AVALIAÇÃO DOS TEMPERAMENTOS
A seguir, você vai responder a um teste sobre os 4 temperamentos. Assinale em cada um dos 4 temperamentos, aqueles itens em que você se enquadra - tanto os pontos fortes, quanto os fracos. Abaixo o desenho mostra forças e fraquezas de cada temperamento.

      `,
    imagem: require('@/assets/images/cdv11.png'),
  },
  {
    modulo: 'cdv',
    numero: '12',
    titulo: 'Lição 12 Qual é a sua missão',
    videoUrl: 'https://www.youtube.com/embed/kFIYzCqkIqs?si=C_u7H0trsNawCHi2',
    descricao:
      `
      INTRODUÇÃO
O chamado ao discipulado e ao serviço no Reino de Deus é intencional. Ser intencional significa trabalhar com propósito - fazer valer a pena cada ação de serviço ao Senhor.
Em 1 Pe. 4.10, verifica-se que os dons espirituais são totalmente funcionais, ou seja, devemos exercer o dom que recebemos pois é ele que define o tipo de serviço que empenharemos no Reino de Deus. Descoberto o propósito, nossa missão se torna visível e concreta, resultando no crescimento pessoal de cada discípulo e na edificação do Corpo de Cristo.


I.	SERVINDO COM PROPÓSITO
A Bíblia nos ensina que fomos criados por Deus para cumprir seus propósitos na Terra (Gn. 1.26-28). No entanto, não basta somente saber que há um propósito, mas descobrir qual é este propósito.
Em primeiro lugar, precisamos saber o que significa propósito. De acordo com dicionário, propósito é: “intenção (de fazer algo), projeto, desígnio; aquilo que se busca alcançar; objetivo, finalidade, intuito; aquilo a que alguém se propôs ou por que se decidiu; decisão, determinação, resolução.”
Em segundo lugar, é necessário e importante descobrir para que nascemos e para qual finalidade Deus nos chamou. Esta descoberta pode até parecer óbvia, mas está intrinsicamente ligada à evidenciação e ao desenvolvimento de nossos dons e talentos, os quais devem ser usados para a glória de Deus.
Deus reafirma Seu compromisso com nosso plano e destino (Sl. 139.13-18) e está intimamente envolvido na formação de cada indivíduo, pois todos os nossos dias estão escritos, mesmo antes que eles aconteçam.
Só conseguiremos servir com finalidade (propósito) após saber o que o Criador deseja que realizemos nesta vida, e isso implica em saber que:
 
1.	Entender sua identidade é o primeiro passo que levará você a descobrir seu propósito;
2.	O propósito está enraizado na sua história e na descoberta de seus dons;
3.	Suas motivações (paixão), metas e seu relacionamento com Deus são importantes para descoberta de seu propósito;
4.	O objetivo do CDV é auxiliar o aluno a explorar estes elementos.


II.	AVALIANDO AS POSSIBLIDADES E OPORTUNIDADES
Todos os cristãos que são nascidos de novo devem encontrar seu lugar no Corpo de Cristo, e avaliar as oportunidades e suas possibilidades (especialmente de tempo) que vão surgindo é uma tarefa necessária e importante, não tendo que se falar na falta de dons e talentos para servir a Deus.
O tempo, tal como o conhecemos – os segundos, minutos, horas, dias, meses, anos que transcorrem desde o começo do Universo e continuarão até o fim do mundo, diz respeito a nós seres humanos, e não a Deus. Todo o tempo - passado, presente e futuro - está presente para Deus, por assim dizer, comprimido nesse único e infinito instante a que chamamos de eternidade.4 Mas para nós, o tempo se traduz em oportunidades.
A Palavra de Deus diz que devemos aproveitar ao máximo todas as oportunidades, no entanto, devemos avaliá-las para que não nos desviemos de nosso propósito.
Quando falamos de possibilidades, encontramos em Levítico (Lv. 1.1-17) um sistema em que as ofertas eram dadas de acordo com as condições de cada israelita e dedicadas a Deus através de sacrifícios de animais de forma voluntária (Lv. 1.2), sem defeito (Lv. 1.3,10) e como aroma suave (vs. 9, 13 e 17).
Nossa doação (de tempo, energia, talentos etc.) torna-se agradável a Deus na medida em que nos exercitamos em todo o tipo de serviço desinteressado – com a motivação correta, visando a glória de Deus. Em 1 Coríntios 3.13, a Bíblia afirma que o fogo vai provar qual a obra, e não quanto à obra. A motivação que nos levou à prática de um determinado serviço é que será trazida à luz.


III.	MISSÃO X VISÃO
Missão é o próximo passo, aquilo que você deve fazer diariamente para que o futuro chegue no prazo determinado.5 Qual é a sua missão?
Sem visão, não há missão. Imagine um soldado que diante de uma guerra lutará contra o exército inimigo a fim de que não perca seu território e seu povo não seja escravizado. Neste caso, o soldado tem a missão de guerrear e lutar, mas só a fará por ter em sua mente a clara visão do desejo de ver seu povo livre e seu território protegido.


4 “A eternidade é simplesmente um perpetuo agora. Poderíamos dizer que é um ‘único instante’... seja como for, na eternidade não há passado nem futuro. Tudo está contido nesse agora que abarca tudo” (Leo J. Trese).
5 BRUNET, Tiago. 12 Dias para atualizar sua vida. São Paulo: Vida, 2017. p. 37
 
Nos dias de hoje, é muito comum existirem pessoas sem certeza de sua missão. Isso acontece porque elas não têm visão do que almejam, e na maioria das vezes ainda não descobriram seu propósito. Em Gênesis 25.31-34, encontramos o episódio em que Esaú vende a Jacó sua primogenitura em troca de um prato de lentilhas. Claramente Esaú não tinha visão, e trocou seu direito por uma necessidade (fome) deixando de exercer sua missão como filho mais velho.
Quando há visão, há futuro; quando se tem missão, há produção; quando se tem propósito, a vida passa a ter sentido.


CONCLUSÃO
Todo discípulo precisar ser a pessoa certa, no lugar certo, com a motivação certa. Ninguém deve estar ensinando se o seu dom não é ensino. Ninguém deve estar administrando se o seu dom não é administração. Aquele que não utiliza seus dons e talentos para servir em determinada área da igreja, facilmente se desencoraja e, às vezes, até desiste da igreja. O mais grave é quando desiste também da fé.
Nenhum discípulo deve ficar sobrecarregado de atividades com duas, três ou mais funções, e em duas ou três áreas diferentes. Com efeito, um discípulo bem posicionado, consciente de seu propósito e de sua missão, será relevante e impactante no Reino de Deus!

      `,
    imagem: require('@/assets/images/cdv12.png'),
  },

];

const AulasScreen: React.FC = () => {
  const [aulaSelecionada, setAulaSelecionada] = useState<Aula | null>(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    // só intercepta o botão se alguma aula estiver selecionada
    const backAction = () => {
      if (aulaSelecionada !== null) {
        setAulaSelecionada(null)
        return true; //impede que volte sozinho
      }
      return false; // impede voltar normalmente
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    // Remove listener ao desmontar
    return () => backHandler.remove();
  }, [aulaSelecionada])

  const aulaConcluida = async () => {
    const token = await AsyncStorage.getItem('token')
    const userString = await AsyncStorage.getItem('user')

    try {
      if (userString) {
        const user = JSON.parse(userString)
        await axios.patch(`http://192.168.247.103:8080/user/addToArray/${user._id}`, 
          {
            field: aulaSelecionada?.modulo,
            value: aulaSelecionada?.numero,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token // JWT
            }
          })
      }
      Alert.alert('Aula Concluída com Sucesso')
    } catch (error) {
      Alert.alert('Erro ao concluir aula')
    }
  }

  return (
    <AuthGuard>
      <ScrollView contentContainerStyle={styles.container}>
        <Text></Text>
      {!aulaSelecionada ? (
        <View>
          {/* Logo no topo */}
          <Image
            source={require('@/assets/images/avancai.jpg')}
            style={styles.logo}
          />
           <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/hidden/alunoavancai')}>
            <Text style={styles.buttonText}>Históricos do Aluno</Text>
          </TouchableOpacity>
          <Text style={styles.titulo}>RESET</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}>
            {reset.map((aula, index) => (
              <TouchableOpacity
                key={index}
                style={styles.carouselItem}
                onPress={() => setAulaSelecionada(aula)}>
                <Image source={aula.imagem} style={styles.carouselImage} />
                {/* <Text style={styles.carouselText}>{aula.titulo}</Text> */}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.titulo}>START</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}>
            {start.map((aula, index) => (
              <TouchableOpacity
                key={index}
                style={styles.carouselItem}
                onPress={() => setAulaSelecionada(aula)}>
                <Image source={aula.imagem} style={styles.carouselImage} />
                {/* <Text style={styles.carouselText}>{aula.titulo}</Text> */}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.titulo}>CDV</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}>
            {cdv.map((aula, index) => (
              <TouchableOpacity
                key={index}
                style={styles.carouselItem}
                onPress={() => setAulaSelecionada(aula)}>
                <Image source={aula.imagem} style={styles.carouselImage} />
                {/* <Text style={styles.carouselText}>{aula.titulo}</Text> */}
              </TouchableOpacity>
            ))}
          </ScrollView>
          
        </View>
      ) : (
        <View>
          <Text style={styles.aulaTitulo}>{aulaSelecionada.titulo}</Text>
          <WebView
            style={styles.video}
            source={{ uri: aulaSelecionada.videoUrl }}
            javaScriptEnabled
            allowsFullscreenVideo
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => aulaConcluida()}>
            <Text style={styles.buttonText}>Aula Concluída</Text>
          </TouchableOpacity>
		  <Text style={styles.descricao}>{aulaSelecionada.descricao}</Text>
        </View>
      )}
    </ScrollView>
    </AuthGuard>
  );
};

export default AulasScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000', // Fundo preto
    padding: 16,
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'cover', // Preenche o topo e as laterais
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#FFF', // Texto branco
  },
  carousel: {
    marginBottom: 20,
  },
  carouselItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  carouselImage: {
    width: 180,
    height: 100,
    borderRadius: 10,
  },
  carouselText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    color: '#FFF', // Texto branco
  },
  aulaTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFF', // Texto branco
    textAlign: 'center'
  },
  descricao: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFF', // Texto branco
    textAlign: 'auto'
  },
  video: {
    height: 200,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2cab77', // Cor de fundo do botão
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF', // Cor do texto do botão
    fontSize: 20,
    fontWeight: 'bold',
  },

});
