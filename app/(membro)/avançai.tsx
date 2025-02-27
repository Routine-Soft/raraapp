// src/screens/AulasScreen.tsx
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';

type Aula = {
  titulo: string;
  videoUrl: string;
  descricao: string;
  imagem: any;
};

const reset: Aula[] = [
  {
    titulo: 'Lição 1 - Reconhecendo a Cristo como Senhor',
    videoUrl: 'https://www.youtube.com/embed/fuh3jtveqD4?si=1oVPbPYH3tYsPuPZ',
    descricao:
      `
<div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px">INTRODU&Ccedil;&Atilde;O</span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A experi&ecirc;ncia mais importante de sua vida &eacute; conhecer Jesus Cristo pessoalmente e relacionar- se com Ele. Jesus veio ao mundo para nos mostrar quem &eacute; Deus e como podemos conhec&ecirc;-lo. Se voc&ecirc; quer que o seu relacionamento com Cristo cres&ccedil;a, voc&ecirc; precisa conhec&ecirc;-lo melhor. Para isso &eacute; preciso compreender melhor quem Ele &eacute;, porqu&ecirc; Ele veio e o que Ele deseja fazer em sua vida.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px">QUEM &Eacute; JESUS?</span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Muitas pessoas tem uma vis&atilde;o distorcida ou limitada sobre Jesus. De acordo com as passagens abaixo, quem &eacute; Jesus?</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Mateus 16:16</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Colossenses 1:15-17</span></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px">POR QUE JESUS VEIO?</span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Nas passagens abaixo, quais s&atilde;o as raz&otilde;es da vinda de Cristo?</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Lucas 4:16-19</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px">&radic; 1 Tim&oacute;teo 2:5-6</span></span></p>
</div>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Por que precisamos nos reconciliar com Deus?</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Isa&iacute;as 59:2</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Romanos 3:23</span></span></p>

<p>&nbsp;</p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Pecado significa rebeli&atilde;o pessoal contra Deus e afastamento dos prop&oacute;sitos que ele tem para nossas vidas.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Qual foi a solu&ccedil;&atilde;o de Jesus para o pecado?</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Romanos 5:8-9</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; 1 Pedro 3:18</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Atos 4:12</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Qual o resultado de sua morte?</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; ll Cor&iacute;ntios 5:19-21</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Romanos 5:1-2</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Que prova temos n&oacute;s da sua ressurrei&ccedil;&atilde;o?</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; 1 Cor&iacute;ntios 15:3-8</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Atos 10:40-41</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Quais s&atilde;o as raz&otilde;es da import&acirc;ncia de sua ressurrei&ccedil;&atilde;o?</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; 1 Cor&iacute;ntios 15:13-18</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px">SEU CONVITE</span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Todos os que ouvem falar de Jesus devem tomar uma decis&atilde;o a respeito dEle e do que Ele fez por n&oacute;s. Ningu&eacute;m pode ficar neutro! Aceitamos a Cristo ou o rejeitamos. Ele nos chama para si.</span></span></p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px">NOSSA RESPOSTA</span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para respondermos ao convite de Jesus e deix&aacute;-lo ser nosso Salvador e Senhor, &eacute; necess&aacute;rio que tomemos certas atitudes.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Embora Jesus tenha morrido pelos pecados de todo mundo, &eacute; preciso que haja uma resposta pessoal, individual para com Ele. Para nos relacionamentos com Ele, precisamos deixar nosso antigo modo de vida (arrependimento), precisamos confiar totalmente em Jesus para nossa salva&ccedil;&atilde;o (f&eacute;) e convid&aacute;-lo para fazer parte das nossas vidas.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Ao inv&eacute;s de um mero acordo intelectual repleto de ensinamentos sobre Jesus, isto significa um compromisso total de vida com Ele como Senhor. Este &eacute; o verdadeiro significado de tornar-se crente.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Como j&aacute; vimos, receber a Cristo &eacute; o come&ccedil;o de um relacionamento com Ele. Isto quer dizer que deve haver continuidade, deve haver crescimento para que haja significado real e satisfat&oacute;rio. Os cap&iacute;tulos seguintes deste estudo v&atilde;o tratar do desenvolvimento de seu relacionamento com Cristo.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px">CONCLUS&Atilde;O</span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Lembre-se dos passos b&aacute;sicos para se tornar em crente:</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Crer que Jesus morreu por seus pecados e ressuscitou para justific&aacute;-lo diante de Deus</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Arrepender-se de seus pecados (admitindo a Deus que voc&ecirc; &eacute; pecador) e afastar-se deles.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Receber o perd&atilde;o de seus pecados a aceitar a Cristo como Salvador e Senhor de sua vida.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Confessar publicamente que Jesus &eacute; o Senhor (dono) de sua vida.</span></span></p>

<p>&nbsp;</p>

      `,
    imagem: require('@/assets/images/reset1.png'),
  },
  {
    titulo: 'Lição 2 - Conhecendo Jesus Cristo',
    videoUrl: 'https://www.youtube.com/embed/_xtmwkQtx6w?si=wob4bSq7fvzHLO0S',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px">INTRODU&Ccedil;&Atilde;O</span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Aceitar a Cristo &eacute; o come&ccedil;o de um novo relacionamento. O desejo de Deus &eacute; que cres&ccedil;amos neste relacionamento e que o conhe&ccedil;amos melhor. Para que possamos crescer n&oacute;s precisamos ter a certeza e seguran&ccedil;a de que o relacionamento &eacute; real e duradouro. Deus providenciou um meio para que tiv&eacute;ssemos esta certeza e seguran&ccedil;a sem precisarmos depender de sentimentos ou circunst&acirc;ncias. Ele providenciou sua palavra escrita e sua presen&ccedil;a conosco.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Quando come&ccedil;amos a conhecer a Cristo melhor, todo poder que era evidente em sua vida est&aacute; &agrave; nossa disposi&ccedil;&atilde;o. Pense nisso! Todo poder de Jesus Cristo est&aacute; dispon&iacute;vel para transformar nossas vidas completamente.</span></span></p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px">AM&Aacute;-LO COMPLETAMENTE</span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O amor &eacute; a chave para desenvolvimento de uma rela&ccedil;&atilde;o. Deus quer que o amemos de todo o nosso ser? (Dt. 6:5). Jesus repetiu este desejo e mandamento em Marcos 12:29-31.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>A OBRA DO ESP&Iacute;RITO SANTO</strong></span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Jesus est&aacute; presente na vida dos crentes de um modo especial: atrav&eacute;s do Esp&iacute;rito Santo. O Esp&iacute;rito Santo concede o milagre do novo nascimento. Ele faz com que seja poss&iacute;vel conhecer a Cristo pessoalmente, e completa a obra de Cristo em nossas vidas.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A palavra grega para Esp&iacute;rito Santo &eacute; <em>paracletos. </em>O seu significado &eacute; &ldquo;aquele que vai ao lado&rdquo;. Ela traduzida como ajudante, conselheiro, confortador, animador. Seu minist&eacute;rio em nossas vidas &eacute; absolutamente essencial.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Ser cheio do Esp&iacute;rito Santo significa que Cristo tem o controle absoluto em todas as &aacute;reas de nossa vida (Romanos 8:5-6). Ser cheio do Esp&iacute;rito Santo deve significar uma experi&ecirc;ncia cont&iacute;nua, evidenciada por qualidades interiores e n&atilde;o necessariamente por sentimentos e experi&ecirc;ncias extasiantes.</span></span></p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px">CRESCER NO RELACIONAMENTO</span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Leia Jo&atilde;o 15:1-11.</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Como &eacute; que o crescimento se desenvolve?</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Deus pode nos ensinar muitas coisas, mesmo quando estamos cheios de d&uacute;vidas. Habacuque tinha s&eacute;rias d&uacute;vidas sobre a validade da presen&ccedil;a de Deus. Ele queria saber qual a posi&ccedil;&atilde;o de Deus num mundo t&atilde;o cheio de maldades. Deus se revelou a ele e Habacuque mudou sua maneira de encarar a presen&ccedil;a de Deus.</span></span></p>
</div>

      `,
    imagem: require('@/assets/images/reset2.png'),
  },
  {
    titulo: 'Lição 3 - Graça e Justificação',
    videoUrl: 'https://www.youtube.com/embed/thLa8h6v5pI?si=sfeiM59AyJ9vTAAj',
    descricao:
      `
      <h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Na hist&oacute;ria da cria&ccedil;&atilde;o compreendemos que Deus criou o homem para ser livre, feliz e aben&ccedil;oado. Por&eacute;m, j&aacute; refletimos que o pecado interrompeu este ciclo gerando aos homens consequ&ecirc;ncias desastrosas.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Por&eacute;m, o mesmo amor que moveu Deus em criar o homem, &eacute; o mesmo que atrav&eacute;s de Jesus Cristo justifica esse mesmo homem do pecado manifestando a sua maravilhosa gra&ccedil;a.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>A GRA&Ccedil;A E SUA MANIFESTA&Ccedil;&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A &uacute;ltima palavra de Deus ao homem n&atilde;o &eacute; o pecado, mas a gra&ccedil;a divina (Gn 3-21, 4.15) (Tito 2.11/ Rm 5.20b / ll Pe 1.2). Esta mesma gra&ccedil;a menciona que a resposta de Deus ao pecado foi o perd&atilde;o e o direito do homem em se libertar dos males do pecado.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Este processo se inicia quando analisamos que a principal a&ccedil;&atilde;o de Deus em n&atilde;o deixar o homem na mis&eacute;ria do pecado foi seu amor (1 Jo 4.16 / 1 Jo 4-19), e a maior prova desse amor foi enviar seu filho amado Jesus Cristo para morrer por n&oacute;s na cruz (Jo 3.16), nos redimindo, justificando e salvando na figura de Jesus Cristo que deixou sua gl&oacute;ria para nos purificar do pecado (Hb 1.3</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">/ Tito 2.14 / Col 1.14) e que atrav&eacute;s da f&eacute; Nele recebemos o maior presente que poder&iacute;amos ter de Deus, a certeza da vida eterna (Rm 3.24).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para entendermos um pouco da imensid&atilde;o do significado da palavra gra&ccedil;a, &eacute; importante dividi- la em duas partes:</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Gra&ccedil;a proveniente</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Esta gra&ccedil;a &eacute; a a&ccedil;&atilde;o de Deus, antes da nossa decis&atilde;o em nos render a Ele. O texto de 1 Jo 4.19, expressa que n&oacute;s amamos porque Ele nos amou primeiro, sendo assim, j&aacute; entendemos que a nossa decis&atilde;o &eacute; uma resposta da gra&ccedil;a divina que j&aacute; opera em n&oacute;s mostrando que Deus sempre d&aacute; o primeiro passo em nossa dire&ccedil;&atilde;o atrav&eacute;s do seu infinito amor. Por&eacute;m, devemos sintetizar que a B&iacute;blia tamb&eacute;m nos ensina que mesmo com esta a&ccedil;&atilde;o, muitos homens por sua dureza de cora&ccedil;&atilde;o ignoram esta gra&ccedil;a (Ef 4.18) seguindo suas pr&oacute;prias convic&ccedil;&otilde;es e valores.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Gra&ccedil;a justificadora</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Esta gra&ccedil;a tamb&eacute;m &eacute; uma a&ccedil;&atilde;o de Deus (Rm 3.24), mas depende de n&oacute;s aceitarmos ou n&atilde;o. Se a nossa resposta for positiva e cumprirmos princ&iacute;pios da B&iacute;blia Sagrada. Nosso Pai nos considerar&aacute; justificados por meio de Jesus Cristo, e isto, &eacute; o que chamamos de justifica&ccedil;&atilde;o.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>A JUSTIFICA&Ccedil;&Atilde;O E O SER HUMANO</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A justifica&ccedil;&atilde;o pode ser definida de m&uacute;ltiplas formas, por&eacute;m a que mais se assemelha ao benef&iacute;cio que ela nos traz &eacute; a liberdade da culpa e do castigo do pecado. Tal manifesta&ccedil;&atilde;o &eacute; evidenciada no sacrif&iacute;cio de Jesus Cristo por n&oacute;s na cruz, trazendo a evidencia de que n&atilde;o pode haver remiss&atilde;o e aplica&ccedil;&atilde;o de Justi&ccedil;a de Deus sem o sangue de Cristo (Hb 9.22 e Rm 3.26.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Este direito de Justifica&ccedil;&atilde;o foi resgatado por Cristo, trazendo a id&eacute;ia de que Deus criou o homem bom (Gn 1.27) por&eacute;m sua desobedi&ecirc;ncia o levou ao pecado, violando a lei de Deus, comprometendo toda sua descend&ecirc;ncia (Ec 7.29). Jesus Cristo veio na figura de um segundo Ad&atilde;o para resgatar tudo o que Deus criou de bom e justificar o pecado pela sua gra&ccedil;a (Rm 3.24), em resumo, por um homem o pecado entrou no mundo (Ad&atilde;o) e por um s&oacute; homem a salva&ccedil;&atilde;o veio ao mundo (Jesus Cristo) (Rm 5.12-19 / ll Co 5.21).</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O FRUTO DA JUSTIFICA&Ccedil;&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A justifica&ccedil;&atilde;o &eacute; adquirida pela f&eacute; em Jesus Cristo e n&atilde;o pelas obras que a pessoa realiza antes da convers&atilde;o. Quando somos justificados por meio de Jesus Cristo (Gl 2.16), um fruto &eacute; desenvolvido em n&oacute;s, o qual Deus se agrada, &eacute; o fruto da santifica&ccedil;&atilde;o. Esse fruto opera em n&oacute;s pelo Esp&iacute;rito Santo de Deus mudando nosso interior e manifestando o desejo de pensar e de tomar a&ccedil;&otilde;es que agradam o cora&ccedil;&atilde;o de Deus!</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Atrav&eacute;s de Jesus Cristo, o amor de Deus foi enraizado novamente na cria&ccedil;&atilde;o. A desobedi&ecirc;ncia que um dia gerou desgra&ccedil;a &agrave; humanidade atrav&eacute;s de Ad&atilde;o, foi resgatada atrav&eacute;s de Jesus Cristo. Anunciemos esta gra&ccedil;a para que a salva&ccedil;&atilde;o, justifica&ccedil;&atilde;o e santifica&ccedil;&atilde;o cheguem a todos de nossa fam&iacute;lia, amigos, bairro, cidade, pa&iacute;s e mundo.</span></span></p>

      `,
    imagem: require('@/assets/images/reset3.png'),
  },
    {
    titulo: 'Lição 4 - O Pecado e o Arrependimento',
    videoUrl: 'https://www.youtube.com/embed/ARZyyOPEGAQ?si=pnOBMeIpOlpMJWhR',
    descricao:
      `
      <h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Deus criou o homem a sua imagem e semelhan&ccedil;a (Gn 2.7-17) (Gn 1.26-27) e harmonizou o mundo para que ele visse em plena felicidade. Deus deu liberdade, autoridade e estabeleceu limites para que o homem obedecesse. Por&eacute;m esse homem transgrediu este limite (Gn 3.1-6), ferindo sua rela&ccedil;&atilde;o com a natureza, com o seu pr&oacute;ximo, consigo mesmo e principalmente com Deus.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O PECADO E SUA NATUREZA</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O pecado &eacute; qualquer ato, palavra ou inten&ccedil;&atilde;o que transgrida a vontade de Deus (Tg 4.16-17). Cometer um pecado &eacute; ir contra a santa e boa lei de Deus (1 Jo 3.4).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Algumas defini&ccedil;&otilde;es n&atilde;o esgotam o sentido do pecado, por&eacute;m entendemos melhor quando analisamos o livro b&iacute;blico de G&ecirc;nesis no cap&iacute;tulo 3, onde Ad&atilde;o e Eva foram criados em estado de inoc&ecirc;ncia, por&eacute;m pecaram quando desobedeceram a Deus e comeram do fruto da &aacute;rvore do conhecimento do bem e do mal (Gn 3.5). Em resumo, o pecado se caracterizou quando o ser humano quis ser igual a Deus. E &eacute; &oacute;bvio que foi um insucesso, manifestando gan&acirc;ncia, rebeldia, desobedi&ecirc;ncia, ang&uacute;stia, mentira, idolatria, etc.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Devido ao ato de desobedi&ecirc;ncia praticado por Ad&atilde;o e Eva, toda humanidade foi afetada pelo pecado (Rm 5.19), e a Morte Eterna (Rm 5.12-21). Tal afirma&ccedil;&atilde;o &eacute; conhecida pelos te&oacute;logos como Pecado Original.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Em Romanos 3.23, o ap&oacute;stolo Paulo descreve o estado dos homens, ap&oacute;s o Pecado Original, fomos destitu&iacute;dos da Gl&oacute;ria de Deus. Por&eacute;m Deus oferece gra&ccedil;a &agrave; todos, e por meio da f&eacute; em Jesus Cristo os pecados podem ser perdoados. Tal f&eacute; opera no cora&ccedil;&atilde;o do ser humano, a ponto dele nascer de novo em Cristo, transformando sua maneira de ver o mundo, ou seja, em Jesus Cristo todos podem ser uma nova criatura!</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>COMPREENS&Atilde;O DO ARREPENDIMENTO</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A B&iacute;blia relata sobre a vida de um homem que antecedeu o minist&eacute;rio de Jesus, seu nome &eacute; Jo&atilde;o Batista. Ele proclamava &agrave;s pessoas o arrependimento dos seus pecados (Mc 1.1-4). Ap&oacute;s&nbsp;</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">este an&uacute;ncio Jesus estabeleceu seu minist&eacute;rio na terra oferecendo n&atilde;o apenas a busca pelo arrependimento, mas na certeza que esse arrependimento salvarias as pessoas atrav&eacute;s do Seu nome (1 Jo 3.7) (2 Co 7.9 / Atos 5.31) e devolveria a pureza de cora&ccedil;&atilde;o aos homens (1 Jo 3.3)</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O arrependimento o ponto de partida para a pratica de vida crist&atilde; onde os primeiros passos s&atilde;o guiados por Jesus Cristo atrav&eacute;s de Sua palavra (Gl 4.3) (Gl 2.20), andando em rumo a maturidade crist&atilde; (1 Pe 2.2).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O sentimento de arrependimento genu&iacute;no &eacute; caracterizado quando a tristeza por causa do pecado (2 Co 7.9) (2 Co 7.9-10) nos d&aacute; a sensa&ccedil;&atilde;o de estarmos distante de Deus. O arrependimento &eacute; uma mudan&ccedil;a de cora&ccedil;&atilde;o consequentemente de vida. Devemos entender que a decis&atilde;o de usufruir deste benef&iacute;cio (arrependimento) &eacute; pessoal (Rm 6.1-4). A gra&ccedil;a de Deus em Cristo precisa ser aceita por n&oacute;s a cada dia por meio de um genu&iacute;no arrependimento. Temos o livre arb&iacute;trio, isto &eacute;, a liberdade de escolher e aceitar essa gra&ccedil;a, e vivermos novamente a comunh&atilde;o e a harmonia com o Criador.)</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A trajet&oacute;ria de pecado tem sido uma pr&aacute;tica da humanidade. Mesmo Jesus Cristo se manifestando ao mundo, o homem continua sendo incr&eacute;dulo quanto a Deus e seu amor. Por&eacute;m, nossa miss&atilde;o &eacute; dar continuidade na miss&atilde;o de Jesus Cristo, pregando e vivendo o verdadeiro evangelho para estabelecer o Reino dos c&eacute;us na terra.</span></span></p>

      `,
    imagem: require('@/assets/images/reset4.png'),
  },
  {
    titulo: 'Lição 5 - Princípíos da Oração',
    videoUrl: 'https://www.youtube.com/embed/ENu07d8zIZA?si=qQewKnMmX8U7oZUB',
    descricao:
      `
      <h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Muitas coisas s&atilde;o importantes na vida de um crist&atilde;o, por&eacute;m outras s&atilde;o mais que importantes, s&atilde;o vitais. Dentre essas coisas vitais, encontramos a ora&ccedil;&atilde;o.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Segue abaixo algumas frases ditas a respeito da ora&ccedil;&atilde;o ao longo da hist&oacute;ria:</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><em>&ldquo;Satan&aacute;s ri de nosso zelo no servi&ccedil;o, zomba de nossa sabedoria, mas treme quando oramos.&rdquo;</em></span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><em>&ldquo;Muita ora&ccedil;&atilde;o secreta resulta em muito poder em p&uacute;blico.&rdquo;</em></span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><em>&ldquo;A ora&ccedil;&atilde;o do crente fiel tem p&eacute; e anda, tem asas e voa at&eacute; chegar no c&eacute;u.&rdquo;</em></span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><em>&ldquo;Nunca ocupamos posi&ccedil;&atilde;o t&atilde;o elevada como quando estamos de joelho.&rdquo;</em></span></span></li>
</ul>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O QUE &Eacute; A ORA&Ccedil;&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Ora&ccedil;&atilde;o &eacute; a comunica&ccedil;&atilde;o e o fruto consciente do relacionamento com Deus durante a qual a pessoa louva, agradece, intercede pela vida de outro, pede b&ecirc;n&ccedil;&atilde;os para ele ou a outrem, e atrav&eacute;s dela pode desfrutar da presen&ccedil;a de Deus. As ora&ccedil;&otilde;es s&atilde;o dirigidas &agrave; Deus, por media&ccedil;&atilde;o &uacute;nica de Jesus Cristo, e podem ser feitas em voz alta, falada, em can&ccedil;&atilde;o ou em sil&ecirc;ncio. O prop&oacute;sito da ora&ccedil;&atilde;o (Mt 6.5-13) n&atilde;o seria o de alterar a vontade de Deus, mas de obter para si mesmo e/ou para os outros b&ecirc;n&ccedil;&atilde;os e gra&ccedil;a que Deus j&aacute; estaria disposto a conceder. Ora&ccedil;&atilde;o &eacute; a comunica&ccedil;&atilde;o e o fruto consciente do relacionamento com Deus durante a qual a pessoa louva, agradece, intercede pela vida de outro, pede b&ecirc;n&ccedil;&atilde;os para ele ou a outrem, e atrav&eacute;s dela pode desfrutar da presen&ccedil;a de Deus. As ora&ccedil;&otilde;es s&atilde;o dirigidas &agrave; Deus, por media&ccedil;&atilde;o &uacute;nica de Jesus Cristo, e podem ser feitas em voz alta, falada, em can&ccedil;&atilde;o ou em sil&ecirc;ncio. O prop&oacute;sito da ora&ccedil;&atilde;o (Mt 6.5-13) n&atilde;o seria o de alterar a vontade de Deus, mas de obter para si mesmo e/ou para os outros b&ecirc;n&ccedil;&atilde;os e gra&ccedil;a que Deus j&aacute; estaria disposto a conceder.</span></span></p>

<p style="margin-left:64.1pt">&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>NECESSIDADE DA ORA&Ccedil;&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Em diversas passagens dos evangelhos, encontramos relatos que Jesus constantemente orava ao Pai. Ele orava pela manh&atilde; (Marcos 1.35), &agrave; tarde (Mateus 14.23) e passava noites inteiras em comunh&atilde;o com Deus (Lucas 6.12). Se Jesus, que era o pr&oacute;prio Filho de Deus tinha essa pr&aacute;tica, &eacute; &oacute;bvio que devemos estabelecer essa rotina no nosso dia-a-dia. Quanto mais conversarmos com algu&eacute;m, mais nos aproximamos dessa pessoa e temos mais intimidade com ela, da mesma forma &eacute; com o Senhor. Al&eacute;m de poderosa (Tiago 5.16), atrav&eacute;s da ora&ccedil;&atilde;o estabelecemos um di&aacute;logo com Deus, aprofundando a nossa comunh&atilde;o e intimidade atrav&eacute;s do Esp&iacute;rito Santo (Romanos 8.26-27). Tamb&eacute;m apresentamos a Ele as nossas ansiedades, desejos e necessidades, &ldquo;e Deus nos conceder&aacute; a paz que excede todo o entendimento e guardar&aacute; em Cristo Jesus os nossos cora&ccedil;&otilde;es e mentes&rdquo;. (Fp 4.6-7).</span></span></p>

<p style="margin-left:64.1pt">&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>FRUTOS DE UMA VIDA DE ORA&Ccedil;&Atilde;O</strong></span></span></h2>

<p>&nbsp;</p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong><em>a) Conseguimos sabedoria</em></strong></span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Tiago 1.5</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;... Se algum de voc&ecirc;s tem falta de sabedoria, pe&ccedil;a-a a Deus, que a todos d&aacute; livremente, de boa vontade; e lhe ser&aacute; concedida...&rdquo;</span></span></p>

<p>&nbsp;</p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong><em>b) Movemos a m&atilde;o de Deus;</em></strong></span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Mateus 7.7-8</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;... Pe&ccedil;am, e lhes ser&aacute; dado; busquem, e encontrar&atilde;o; batam, e a porta lhes ser&aacute; aberta. Pois tudo o que pede, recebe; o que busca, encontrar&aacute;; e &agrave;quele que bate, a porta ser&aacute; aberta...&rdquo;</span></span></p>

<p>&nbsp;</p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong><em>c) Nos tornamos intercessores;</em></strong></span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute;f&eacute;sios 6. 18-20</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;... Orem no Esp&iacute;rito em todas as ocasi&otilde;es, com toda ora&ccedil;&atilde;o e s&uacute;plica; tendo isso em mente, estejam atentos e perseverem na ora&ccedil;&atilde;o por todos os santos. Orem tamb&eacute;m por mim, para que, quando eu falar, seja-me dada a mensagem a fim de que, destemidamente, torne conhecido o mist&eacute;rio do evangelho, pelo qual sou embaixador preso em correntes. Orem para que, permanecendo nele, eu fale com coragem, como me cumpre fazer...&rdquo;</span></span></p>

<p>&nbsp;</p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong><em>d) Caminhamos em rumo a santidade;</em></strong></span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">1 Tim&oacute;teo 4.4</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;... Pois tudo o que Deus criou &eacute; bom, e nada deve ser rejeitado, se for recebido com a&ccedil;&atilde;o de gra&ccedil;as, pois &eacute; santificado pela palavra de Deus e pela ora&ccedil;&atilde;o...&rdquo;</span></span></p>

<p>&nbsp;</p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>e) Deus estabelece o seu avivamento;</strong></span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Atos 4.31</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;...Depois de orarem, tremeu o lugar em que estavam reunidos; todos ficaram cheios do Esp&iacute;rito Santo e anunciavam corajosamente a palavra de Deus...&rdquo;</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>COMO E QUANDO DEVEMOS ORAR?</strong></span></span></h2>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Nossas&nbsp;&nbsp;&nbsp;&nbsp; ora&ccedil;&otilde;es&nbsp;&nbsp;&nbsp;&nbsp; devem&nbsp;&nbsp;&nbsp;&nbsp; ser&nbsp;&nbsp;&nbsp;&nbsp; feitas&nbsp;&nbsp;&nbsp; em&nbsp;&nbsp;&nbsp;&nbsp; nome&nbsp;&nbsp;&nbsp;&nbsp; de&nbsp;&nbsp;&nbsp; Jesus.&nbsp;&nbsp;&nbsp;&nbsp; (Jo&atilde;o&nbsp;&nbsp;&nbsp;&nbsp; 14.13-14)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">A nossa ora&ccedil;&atilde;o deve ser feta segundo a vontade de Deus (Mateus 6.10), a sua vontade ser&aacute; sempre boa, agrad&aacute;vel e perfeita (Rm 12.2b).</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Precisamos estar em comunh&atilde;o com Deus para que nossas ora&ccedil;&atilde;o sejam atendidas (Jo 15.7 / l Jo 3.22).</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Devemos orar sem cessar ( l Ts 5.17 / Cl 4.2 / Sl 40.1 / Ef 6.18 / Lc 18.1-8).</span></span></li>
</ol>

      `,
    imagem: require('@/assets/images/reset5.png'),
  },
  {
    titulo: 'Lição 6 - Batismo',
    videoUrl: 'https://www.youtube.com/embed/mzPPMX60c4g?si=g4Dbbn4OMfXjMVQD',
    descricao:
      `
      <h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">H&aacute; duas cerim&ocirc;nias ordenadas por Cristo para que os crist&atilde;os pratiquem: O Batismo em &aacute;gua e a Ceia do Senhor.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A palavra batismo tem muitos significados, dentre eles:</span></span></p>

<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Imerso, mergulho, lavado, limpo com &aacute;gua (W. C. Taylor).</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Cerim&ocirc;nia em que se usa &aacute;gua por meio da qual uma pessoa se torna membro de uma igreja crist&atilde; (Dicion&aacute;rio Jo&atilde;o Ferreira de Almeida).</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Uma ordenan&ccedil;a crist&atilde;; banho com &aacute;gua simbolizando a limpeza dos pecados, unido ao arrependimento e admiss&atilde;o na comunidade dos fi&eacute;is (Dicion&aacute;rio Dake).</span></span></li>
</ol>

<p><span style="color:#FFFFFF"><span style="font-size:18px">De todos os significados mais conhecidos, o grande consenso que existe nas igrejas crist&atilde;s evang&eacute;licas &eacute; que o batismo em &aacute;gua &eacute; um ato ou confiss&atilde;o p&uacute;blica de arrependimento e f&eacute; em Jesus Cristo, em que a pessoa declara publicamente que morreu para o mundo (sistema mundano) e ressuscitou para Deus.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>REQUISITOS PARA O BATISMO</strong></span></span></h2>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Crer em Jesus (Marcos 16.16)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Arrependimento (Atos 2.38)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Confessar os seus pecados (Marcos 1.5 / Mateus 3.6)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Desejo de ser batizado (Atos 2.37-41)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Responsabilidade pelos seus atos em consci&ecirc;ncia do batismo (Atos 2.41 / Hebreus 10.22)</span></span></li>
</ul>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O PORQU&Ecirc; DO BATISMO</strong></span></span></h2>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Porque &eacute; uma demonstra&ccedil;&atilde;o de obedi&ecirc;ncia ao Senhor (Mateus 28.19)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Porque o pr&oacute;prio Jesus se batizou (Mateus 3.16)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Porque precisamos dar testemunho p&uacute;blico perante a igreja e o mundo da mudan&ccedil;a de car&aacute;ter que conquistamos atrav&eacute;s de B&iacute;blia Sagrada (ll Cor&iacute;ntios 5.17 / G&aacute;latas 3.27)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Porque nos livros do Novo Testamento encontramos cerca de 70 refer&ecirc;ncias &agrave; pratica do batism</span></span></li>
</ul>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>M&Eacute;TODOS</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Imers&atilde;o: </strong>Lavagem de todo o corpo</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Aspers&atilde;o: </strong>Lavagem de partes do corpo</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Embora n&atilde;o tenhamos nenhuma refer&ecirc;ncia b&iacute;blica clara sobre o m&eacute;todo que devemos usar, a CRIEP tem como regra o batismo por imers&atilde;o, simbolizando a morte da velha criatura e o renascimento de uma nova criatura. (ll Cor&iacute;ntios 5.17; Mateus 3.16).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong><em>Observa&ccedil;&atilde;o: </em></strong>Quando n&atilde;o &eacute; poss&iacute;vel a imers&atilde;o por algum motivo de sa&uacute;de, a lideran&ccedil;a da igreja opta pela aspers&atilde;o.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>MOMENTO CERTO PARA O BATISMO DE ALGU&Eacute;M</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Na &eacute;poca do Antigo Testamento as crian&ccedil;as eram apresentadas ao Senhor (Lucas 2.22), e aos 12 anos (idade em que se considera iniciar-se o processo de consci&ecirc;ncia) eram entregues ao Templo para aprender os ensinos e tradi&ccedil;&otilde;es judaicas.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Por esse motivo, que muitos pais crist&atilde;os aconselham a seus filhos serem batizados a partir dos 12 anos, pois entendem que &eacute; necess&aacute;rio terem responsabilidade pelos seus atos e consci&ecirc;ncia dos mesmos. Por isso que n&oacute;s da CRIEP n&atilde;o batizamos crian&ccedil;as, visto que elas ainda n&atilde;o s&atilde;o respons&aacute;veis pelos seus atos e decis&otilde;es.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>PORQUE N&Atilde;O PODEMOS DEIXAR DE NOS BATIZAR?</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Porque o batismo nos identifica com Cristo:</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Na morte &ldquo;Fomos batizados na sua morte.&rdquo; (Romanos 6.3)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">No sepultamento: &ldquo; Tendo sido sepultados juntamente com Ele no batismo...&rdquo; (CL 2.12/ RM 6.4)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Na resurrei&ccedil;&atilde;o: &ldquo; Portanto, se fostes ressuscitados juntamente com Cristo...&rdquo; (Colossenses 3.1) &ldquo;...tamb&eacute;m seremos semelhantes na sua ressurrei&ccedil;&atilde;o&rdquo; (Romanos 6.5).</span></span></li>
</ul>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>QUEM PODE REALIZAR A CERIM&Ocirc;NIA DO BATISMO?</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Na RARA, cremos no sacerd&oacute;cio de todos os crentes (l Pedro 2.9), ou seja, todos aqueles que j&aacute; fazem parte da fam&iacute;lia de Deus por meio do batismo, podem realizar a cerim&ocirc;nia. Por&eacute;m, como forma organizacional, estabelecemos essa responsabilidade aos presb&iacute;teros, evangelistas e pastores da nossa comunidade, ou algu&eacute;m nomeado pelo corpo ministerial.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Atrav&eacute;s do batismo a pessoa d&aacute; um testemunho p&uacute;blico de sua identifica&ccedil;&atilde;o com Cristo. &Eacute; o sinal exterior que representa a morte para o mundo e a ressurrei&ccedil;&atilde;o para Deus. Cada um de n&oacute;s repete de modo espiritual, o que aconteceu com Cristo. Ele morreu e ressuscitou. Assim, pelo batismo, n&oacute;s provamos que somos vitoriosos por meio de Jesus Cristo.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Se voc&ecirc; est&aacute; realizando esse curso, sinta-se privilegiado por essas informa&ccedil;&otilde;es que voc&ecirc; acabou de receber. Pense bem, e se voc&ecirc; desejar tome a decis&atilde;o de se batizar, e acredite uma vida abundante voc&ecirc; ter&aacute; em Jesus Cristo.</span></span></p>

      `,
    imagem: require('@/assets/images/reset6.png'),
  },
  {
    titulo: 'Lição 7 - Santificação',
    videoUrl: 'https://www.youtube.com/embed/6BoZ8MQh_P8?si=7yWKmlks8-geWSuI',
    descricao:
      `
      <h1><span style="color:#FFFFFF"><span style="font-size:18px">INTRODU&Ccedil;&Atilde;O</span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A santifica&ccedil;&atilde;o &eacute; o est&aacute;gio posterior ao da justifica&ccedil;&atilde;o e cont&iacute;nuo, sua pr&aacute;tica di&aacute;ria &eacute; fundamental para estruturar nosso relacionamento com Deus, estabelecendo assim, o Reino de Deus em nossa vida e na vida de outras pessoas.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCEITO</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O conceito da palavra santifica&ccedil;&atilde;o significa a separa&ccedil;&atilde;o das pr&aacute;ticas mundanas em todos os sentidos da vida. Este processo caracteriza-se em levar o crist&atilde;o a ser mais dedicado e comprometido com os padr&otilde;es b&iacute;blicos espirituais, morais e comportamentais.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O texto de Hebreus 12.14 nos evidencia que o primeiro est&aacute;gio da santifica&ccedil;&atilde;o &eacute; a sensa&ccedil;&atilde;o de paz, a qual precisamos ter para vermos a Deus. A B&iacute;blia em sua rica instru&ccedil;&atilde;o nos ensina que os principais objetivos em se santificar, implicam em agradar a Deus em nossas pr&aacute;ticas di&aacute;rias, estando sempre preparadas a servir a Deus de maneira &iacute;ntegra e s&oacute;lida.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para que o Reino de Deus seja estabelecido na vida de uma pessoa, a santifica&ccedil;&atilde;o se torna um pr&eacute; - requisito. Isso implica uma ren&uacute;ncia di&aacute;ria do nosso &ldquo;eu&rdquo; deixando aquilo que n&atilde;o agrada a Deus e buscando sua vontade. O texto de 1 Ts 4.7m nos revela que a santifica&ccedil;&atilde;o &eacute; mais do que uma decis&atilde;o pessoal e intransfer&iacute;vel de viver a sua palavra, mas &eacute; tamb&eacute;m um chamado de Deus. Ap&oacute;s a escolha do Senhor em nos amar (Ef 1.4), Ele mesmo tem o interesse de nos moldar para sermos vasos &uacute;teis e santificados, sendo eficientes para a boa obra (2 Tm 2.21).</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>FONTES DE SANTIFICA&Ccedil;&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Muitos usam seus gostos e ideologias pessoais para oferecer padr&otilde;es de santidade. Por&eacute;m a CRIEP acredita em tr&ecirc;s padr&otilde;es fundamentais:</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Jesus Cristo</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Em Cristo Jesus, o qual se tornou, da parte de Deus, sabedoria, e justi&ccedil;a, e santifica&ccedil;&atilde;o e reden&ccedil;&atilde;o&rdquo; (l Cor&iacute;ntios 1.30).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Nessa vontade &eacute; que temos sido santificados, mediante a oferta do corpo de Jesus Cristo, uma vez por todas&rdquo; (Hebreus 10.10).</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Esp&iacute;rito Santo</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Para que eu seja ministro de Cristo Jesus entre os gentios &ldquo;... uma vez santificado pelo Esp&iacute;rito Santo&rdquo; (Romanos 15.16).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Tais fostes alguns de v&oacute;s vos lavastes, mas fostes santificados, mas fostes justificados em nome do Senhor Jesus e no Esp&iacute;rito do nosso Deus&rdquo; (l Cor&iacute;ntios 6.11).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Deus vos escolheu desde o princ&iacute;pio para a salva&ccedil;&atilde;o, pela santifica&ccedil;&atilde;o do Esp&iacute;rito e f&eacute; na verdade&rdquo; (ll Tessaloniceses 2.13).</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3.B&iacute;blia Sagrada</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Santifica-vos na verdade, a tua palavra &eacute; a verdade&rdquo; (Jo&atilde;o 17.17).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Por que a Palavra de Deus &eacute; viva, e eficaz, e mais cortante do que qualquer espada de dois gumes, e penetra at&eacute; o ponto alma e esp&iacute;rito...&rdquo; (Hebreus 4.12).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Guardo no cora&ccedil;&atilde;o as tuas palavras para n&atilde;o pecar contra ti&rdquo; (Salmo 119.11).</span></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>&Aacute;REAS DA SANTIFICA&Ccedil;&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O ser humano &eacute; constitu&iacute;do de corpo, alma e esp&iacute;rito (l Tessalonicenses 5.23). E essas tr&ecirc;s &aacute;reas devem ser submetidas ao processo de santifica&ccedil;&atilde;o.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Corpo</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Devemos santificar e glorificar a Deus com todos os membros do nosso corpo, pois ele &eacute; a morada do Esp&iacute;rito de Deus (l Cor&iacute;ntios 3.16-17 e l Cor&iacute;ntios 6.20).</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Alma</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Devemos n&atilde;o apenas santificar o nosso corpo, mas tamb&eacute;m nossos pensamentos, sentimentos, vontades, motiva&ccedil;&otilde;es e desejos (Atos 24.16 / ll Cor&iacute;ntios 1.12).</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3.Esp&iacute;rito</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O esp&iacute;rito &eacute; a heran&ccedil;a divina que Deus soprou em n&oacute;s, por&eacute;m com o Pecado Original, esse esp&iacute;rito foi enfraquecido. N&atilde;o &eacute; &agrave; toa que Deus atrav&eacute;s de Jesus Cristo soprou sobre sua Igreja o Esp&iacute;rito Santo, para fortalecer o seu elo com o ser humano. (l Pedro 1.2)</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Que em todo tempo possamos estar comprometidos em nos tornar pessoas mais santas. N&atilde;o uma santifica&ccedil;&atilde;o aparente e demag&oacute;gica, mas uma santifica&ccedil;&atilde;o que venha ser gerada no &iacute;ntimo do nosso cora&ccedil;&atilde;o e frutificada em todas as nossas palavras e atitudes.</span></span></p>

      `,
    imagem: require('@/assets/images/reset7.png'),
  },
  {
    titulo: 'Lição 8 - Ceia do Senhor',
    videoUrl: 'https://www.youtube.com/embed/x3fofsEiiyw?si=FIftDDd3vgLngjsP',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">H&aacute; duas ordenan&ccedil;as estabelecidas por Jesus Cristo O Batismo em &aacute;gua, que vimos na aula passada, e a Ceia do Senhor (Eucaristia).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O termo &ldquo;eucaristia&rdquo; a partir dos relatos das comunidades crist&atilde;s dando in&iacute;cio no primeiro s&eacute;culo significativa &ldquo;o partir do p&atilde;o&rdquo;. Ou seja, o oferecimento de a&ccedil;&atilde;o de gra&ccedil;as a Deus sobre o p&atilde;o e o vinho na refei&ccedil;&atilde;o cerimonial da igreja.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O QUE &Eacute; A CEIA DO SENHOR OU EUCARISTIA?</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>&Eacute; a celebra&ccedil;&atilde;o mais solene da Igreja, que tem por finalidade um duplo an&uacute;ncio (l Cor&iacute;ntios 11.26):</strong></span></span></p>

<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">An&uacute;ncio da morte de Jesus para nos livrar da morte eterna.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">An&uacute;ncio da sua volta gloriosa.</span></span></li>
</ol>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A Ceia &eacute; constitu&iacute;da por dois elementos: o p&atilde;o e o vinho. O p&atilde;o simboliza o corpo de Cristo. &ldquo;Tomai, comei, isto &eacute; o meu corpo&rdquo; ( l Co 11.24). O vinho simboliza o sangue de Cristo. &ldquo;Isto &eacute; o meu sangue&rdquo; ( l Co 11.25).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Existem nas igrejas crist&atilde;s tr&ecirc;s tipo de ensino:</strong></span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Transubstancia&ccedil;&atilde;o</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; a ideia prevalecente na igreja cat&oacute;lica, de que, ao serem consagrados, os elementos se tornam verdadeiramente corpo e sangue de Cristo. Cr&ecirc;-se que a h&oacute;stia nas m&atilde;os do sacerdote (padre se transforma integralmente no corpo e sangue de Jesus.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Consubstancia&ccedil;&atilde;o</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Os adeptos da consubstancia&ccedil;&atilde;o ensinam que a partir do momento que o sacerdote (pastor) faz a ora&ccedil;&atilde;o de consagra&ccedil;&atilde;o, al&eacute;m de permanecerem p&atilde;o e vinho, tamb&eacute;m se transformam no corpo e sangue de Jesus.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3.Ato memorial &ndash; No que acreditamos</strong></span></span></h3>
</div>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Em muitas igrejas evang&eacute;licas, inclusive na RARA, entendemos pela Palavra de Deus, que a Ceia &eacute; um memorial, pois ao instituir essa ordenan&ccedil;a Jesus disse: &ldquo;Fazei isto em mem&oacute;ria de mim&rdquo; (l Co 11.24,25).</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>A CEIA EM RELA&Ccedil;&Atilde;O &Agrave; IGREJA</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Quando participamos da Ceia significa que a Igreja vive num s&oacute; corpo, num s&oacute; esp&iacute;rito, numa s&oacute; f&eacute;, num s&oacute; pensamento (Ef&eacute;sios 4.4-6).</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Na CRIEP, todo m&ecirc;s h&aacute; pelo menos um culto da Ceia. Esse culto n&atilde;o foi ideia de um homem ou mulher, mas como vimos, foi institu&iacute;do por Jesus. Esta &eacute; uma cerim&ocirc;nia espiritual, na qual os crentes devem participar em atitude solene, meditativa e reverente. N&atilde;o apenas com apar&ecirc;ncia de santidade, mas como um pecador arrependido, anunciando que Ele morreu, ressuscitou e em breve voltar&aacute;.</span></span></p>

      `,
    imagem: require('@/assets/images/reset8.png'),
  },
  {
    titulo: 'Lição 9 - Vícios',
    videoUrl: 'https://www.youtube.com/embed/1w0_5drOyKM?si=kWgpvMpfRa1hFkIh',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Romanos 8:5-6</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Porque os que se inclinam para a carne, cogitam das coisas da carne, mas os que se inclinam para o Esp&iacute;rito, das coisas do Esp&iacute;rito. Porque o pendor da carne d&aacute; para a morte, mas o do Esp&iacute;rito, para a vida e paz.&rdquo;</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Ef&eacute;sios 5.18</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;N&atilde;o vos embriagueis com o vinho, em que h&aacute; devassid&atilde;o, mas enchei-vos com o Esp&iacute;rito Santo.&rdquo;</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O QUE &Eacute; V&Iacute;CIO</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Conceito: </strong>Disposi&ccedil;&atilde;o habitual para certo mal; mau costume. (Aur&eacute;lio)</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O v&iacute;cio nada mais &eacute; do que tenta&ccedil;&otilde;es que geram atos repetitivos, causando depend&ecirc;ncia sejam de que natureza for.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>DE ONDE V&Ecirc;M AS TENTA&Ccedil;&Otilde;ES?</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">I Cor&iacute;ntios 10.13</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;N&atilde;o vos sobreveio tenta&ccedil;&atilde;o que n&atilde;o fosse humana; mas Deus &eacute; fiel e n&atilde;o permitir&aacute; que sejais tentadas al&eacute;m das vossas for&ccedil;as; pelo contr&aacute;rio, juntamente com a tenta&ccedil;&atilde;o, vos prover&aacute; livramento, de sorte que a possais suportar&rdquo;.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Os impulsos da carne t&ecirc;m a tend&ecirc;ncia de consumir o que gera prazer moment&acirc;neo e satisfa&ccedil;&atilde;o dos nossos desejos.</span></span></p>
</div>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>VENCENDO O V&Iacute;CIO</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Nosso dia-a-dia deve ser guiado pelo Esp&iacute;rito Santo de Deus, isto &eacute;, viver segundo uma Palavra que me convence a n&atilde;o usufruir de coisas que podem gerar uma mal para meu corpo, alma e esp&iacute;rito.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Como podemos lutar contra os v&iacute;cios?</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Sujeita-vos, pois, a Deus, resisti ao diabo, e ele fugir&aacute; de v&oacute;s&rdquo; (Tiago 4.7). Em Deus est&aacute; a nossa for&ccedil;a! Quando nos submetemos &agrave; sua vontade abrindo o cora&ccedil;&atilde;o para receber o Seu poder, o Esp&iacute;rito Santo obt&eacute;m o controle de nossa vida. Isso n&atilde;o significa que nunca mais seremos tentados, mas que Ele nos dar&aacute; for&ccedil;a e gra&ccedil;a para resistimos as tenta&ccedil;&otilde;es atrav&eacute;s do Seu poder.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">l Cor&iacute;ntios 7.22</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Porque o que &eacute; chamado pelo Senhor, sendo servo, &eacute; liberto do Senhor; e da mesma maneira tamb&eacute;m o que &eacute; chamado sendo livre, servo &eacute; de Cristo.&rdquo;</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Alguma vez voc&ecirc; j&aacute; lutou contra h&aacute;bitos que julgou ser imposs&iacute;veis de vencer?</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">H&aacute; algum pecado que voc&ecirc; tenha cometido v&aacute;rias vezes na vida ou que ainda cometa? Voc&ecirc; j&aacute; quis se libertar de algo que o escravizava?</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Existe esperan&ccedil;a?</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Temos que analisar que para termos uma vida protegida das coisas que podem nos fazer mal, temos que ter a atitude de priorizar o que o Senhor nos ensina mediante a sua palavra.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Somente atrav&eacute;s da gra&ccedil;a redentora de Cristo &eacute; que se pode viver sem droga ou qualquer tipo de v&iacute;cio, pois Ele &eacute; a verdade que liberta (Jo&atilde;o 8.32), o caminho a ser seguido para a vida eterna (Jo&atilde;o 14.6).</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Colossenses 2.14</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Havendo riscado a c&eacute;dula que era contra n&oacute;s nas suas ordenan&ccedil;as, a qual de alguma maneira nos era contr&aacute;ria, e a tirou do meio de n&oacute;s, cravando-a na cruz&rdquo;.</span></span></p>

      `,
    imagem: require('@/assets/images/reset9.png'),
  },
  {
    titulo: 'Lição 10 - Jugo Desigual',
    videoUrl: 'https://www.youtube.com/embed/sWrRxP7sbJs?si=8nwuY1mRfT26HpM2',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">2 Cor&iacute;ntios 6.14-18</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;N&atilde;o vos prendais a um jugo desigual com os infi&eacute;is; porque, que sociedade tem a justi&ccedil;a com a injusti&ccedil;a? E que comunh&atilde;o tem a luz com as trevas? E que consenso tem o templo de Deus vivente, como Deus disse: Neles habitarei, e entre eles andarei; e eu serei o seu Deus e eles ser&atilde;o o meu povo. Por isso sai do meio deles, e apartai-vos, diz o Senhor; E n&atilde;o toqueis nada imundo, E eu vos receberei; E eu serei para v&oacute;s Pai, E v&oacute;s sereis para mim filhos e filhas, Diz o Senhor Todo-Poderoso.&rdquo;.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O QUE &Eacute; JUGO DESIGUAL?</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Salmos 1.1</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Bem-aventurado o homem que n&atilde;o anda segundo o conselho dos &iacute;mpios, nem se det&eacute;m no caminho dos pecadores, nem se assenta na roda dos escarnecedores.&rdquo;</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Mediante a Palavra de Deus, se refere a uma alian&ccedil;a formada entre um crist&atilde;o e um &iacute;mpio. Por&eacute;m isso n&atilde;o significa que devemos abrir m&atilde;o dos nossos amigos &iacute;mpios, mas atrav&eacute;s da ajuda do Esp&iacute;rito Santo, sermos instrumentos da gra&ccedil;a de Deus para Alcan&ccedil;a-los da mesma forma que um dia fomos alcan&ccedil;ados.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONVIVENDO COM JUGO DESIGUAL</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">1 Cor&iacute;ntios 7.14</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Pois o marido incr&eacute;dulo &eacute; santificado pela mulher, e a mulher incr&eacute;dula &eacute; santificada pelo marido crente. Doutra sorte os vossos filhos seriam impuros, mas agora s&atilde;o santificados.&rdquo;</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Quando vivemos uma situa&ccedil;&atilde;o a qual o conjugue ou os familiares n&atilde;o servem a Deus, temos a responsabilidade de levar um bom testemunho para que a casa seja santificada, e com jejum e ora&ccedil;&atilde;o esta pessoa ser&aacute; transformada em Cristo.</span></span></p>
</div>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Temos que ficar atentos em rela&ccedil;&atilde;o a este assunto para n&atilde;o servos influenciados e deixarmos o objetivo principal que &eacute; viver uma vida na presen&ccedil;a de Deus fazendo e falando coisas boas.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Que possamos com toda a for&ccedil;a do nosso ser e com a ajuda do Esp&iacute;rito Santo, ser sal e luz dentro de um mundo t&atilde;o sem sabor e t&atilde;o obscuro. Que n&atilde;o venhamos nos amoldar ao sistema mundano, mas que por onde passarmos possamos transformar pela renova&ccedil;&atilde;o da nossa mente, que agora &eacute; propriedade exclusiva do nosso Senhor e Salvador Jesus Cristo.</span></span></p>

      `,
    imagem: require('@/assets/images/reset10.png'),
  },
  {
    titulo: 'Lição 11 - Servo',
    videoUrl: 'https://www.youtube.com/embed/SmMQYAbraRM?si=IdkvVMcVSe_17qsO',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">H&aacute; uma grande diferen&ccedil;a entre ser volunt&aacute;rio, empregado e servo na obra do Senhor. Vamos ver abaixo algumas caracter&iacute;sticas de cada um desses tr&ecirc;s tipos de pessoas.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>VOLUNT&Aacute;RIO</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Lev&iacute;tico 10.1-2</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Nadabe e Abi&uacute;, filhos de Ar&atilde;o, tomaram cada um o seu incens&aacute;rio, e puseram neles fogo, e sobre este, incenso, e trouxeram fogo estranho perante a face do Senhor, o que n&atilde;o lhes ordenara.&rdquo;</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Caracter&iacute;sticas desse tipo de pessoa:</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Escolhe como e quando servir;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Faz somente o que lhe agrada;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o tem comprometimento;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o depende de Deus, mas da for&ccedil;a pr&oacute;pria;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o aceita cobran&ccedil;a;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Nunca de disp&otilde;e ao sacrif&iacute;cio;</span></span></li>
</ul>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Paul Hoff escreveu: &ldquo;As boas inten&ccedil;&otilde;es n&atilde;o substituem a obedi&ecirc;ncia.&rdquo; Exemplo: Uz&aacute; morre ao tocar a Arca da Alian&ccedil;a (ll Samuel 6.6)</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>EMPREGADO</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">2 Reis 5:20</span></span></h3>
</div>

<div>
<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Ent&atilde;o Geazi, servo de Eliseu, homem de Deus, disse: Eis que meu Senhor poupou a este s&iacute;rio Naam&atilde;, n&atilde;o recebendo da sua m&atilde;o alguma coisa do que trazia; por&eacute;m, vive o SENHOR que hei de correr atr&aacute;s dele, e receber dele alguma coisa.&rdquo;</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Caracter&iacute;sticas desse tipo de pessoa:</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Faz as coisas pensando em receber algo em troca;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Encara o trabalho na casa de Deus como um fardo;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Se faz o que lhe &eacute; pedido e faz por obriga&ccedil;&atilde;o;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Se sente explorado se lhe &eacute; pedido algo a mais;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Adora cargos, t&iacute;tulos e posi&ccedil;&atilde;o;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Escolhe a quem servir (pastor ou l&iacute;der possa ver seu trabalho e &ldquo;recompens&aacute;-lo&rdquo;);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Sempre procura uma posi&ccedil;&atilde;o melhor (como um plano de carreira);</span></span></li>
</ul>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>SERVO</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Filipenses 2.7</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Antes a si mesmo se esvaziou, assumindo a forma de servo, tornando-se em semelhan&ccedil;a de homens, e reconhecido em figura humana, a si mesmo se humilhou, tornando-se obediente at&eacute; a morte, e morte de cruz.&rdquo;</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Marcos 10.45</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Porque o Filho do homem tamb&eacute;m n&atilde;o veio para ser servido, mas para servir e dar a sua vida em resgate de muitos&rdquo;</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Caracter&iacute;sticas desse tipo de pessoa:</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Faz o que o Senhor manda;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o tem direito;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Tem um Senhor e dono;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Toma a sua cruz;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o espera pagamento, gratid&atilde;o e mordomia;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Quer ser um mordomo na obra de Cristo;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Faz o que &eacute; necess&aacute;rio para a obra;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Tem alegria em contribuir para o Reino;</span></span></li>
</ul>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Servos s&atilde;o aqueles que realmente frutificam e multiplicam. A igreja s&oacute; pode ser edificada com servos que agem por amor e renunciam o seu &ldquo;eu&rdquo; para que Cristo viva atrav&eacute;s de sua vida. Tomar a cruz de Cristo n&atilde;o &eacute; um fardo e sim obedi&ecirc;ncia a vontade de Deus, mesmo que ela seja contr&aacute;ria ao nosso pr&oacute;prio desejo. O servo se sacrifica pelo reino de Deus por amor a Sua Palavra.</span></span></p>
</div>

      `,
    imagem: require('@/assets/images/reset11.png'),
  },

];

const start: Aula[] = [
  {
    titulo: 'Lição 1 - Conhecendo a bíblia',
    videoUrl: 'https://www.youtube.com/embed/q-w0MYaLKS8?si=NODP5_RzTWoyvNJc',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Voc&ecirc; j&aacute; tem em suas m&atilde;os a B&iacute;blia Sagrada. S&oacute; nela voc&ecirc; encontra tudo o que Deus fez para dar a salva&ccedil;&atilde;o e a vida eterna &agrave;s pessoas. Por isso, a B&iacute;blia &eacute; tamb&eacute;m conhecida como a Palavra de Deus.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. A B&Iacute;BLIA EM SUAS M&Atilde;OS</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O que significa a palavra &ldquo;B&iacute;blia&rdquo;?</strong></span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Para voc&ecirc; descobrir a resposta, primeiro, tem de entender que esta palavra quer dizer <strong>&ldquo;livros&rdquo;</strong>, isto &eacute;, v&aacute;rios livros em um s&oacute;. &Eacute; prov&aacute;vel que em sua B&iacute;blia logo nas primeiras folhas, haja um &iacute;ndice, onde est&atilde;o escritos os nomes de todos os livros que comp&otilde;em a B&iacute;blia. Procure-o e d&ecirc; uma lida neles. Voc&ecirc; concluir&aacute; que n&atilde;o se pode ser crente sem a Palavra de Deus em sua totalidade. Por isso, os aut&ecirc;nticos crist&atilde;os devem carregar, ler, estudar e meditar constantemente nessa&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; suprema&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; verdade,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; a&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B&iacute;blia&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sagrada.</span></span></p>

<p>&nbsp;</p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A B&iacute;blia, &eacute; a palavra de Deus porque atrav&eacute;s dela o Senhor se d&aacute; a conhecer aos homens e mulheres. Isto se chama <strong>revela&ccedil;&atilde;o divina</strong>. Deus fala conosco atrav&eacute;s da B&iacute;blia. Lendo-a, voc&ecirc; come&ccedil;a a conhecer o Senhor, a entend&ecirc;-lo e a obedecer suas orienta&ccedil;&otilde;es na sua vida particular e na participa&ccedil;&atilde;o da igreja na qual voc&ecirc; faz parte.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A revela&ccedil;&atilde;o de Deus que se encontra na B&iacute;blia foi escrita por cerca de 40 pessoas em dois idiomas, o hebraico e o grego, que s&atilde;o bem diferentes do portugu&ecirc;s. Isto aconteceu h&aacute; muitos anos. Os autores foram profetas, reis, sacerdotes, pescadores, criadores de gado etc. Deus escolheu estas pessoas e as usou apesar das suas imperfei&ccedil;&otilde;es e seus diferentes conhecimentos da vida humana. Este &eacute; o lado maravilhoso da B&iacute;blia. Apesar dos livros serem escritos por pessoas diferentes, em &eacute;pocas bem distantes, e depois reunidos num livro s&oacute;, a B&iacute;blia &eacute; completa e perfeita em unidade e harmonia. Deus inspirou estas pessoas para escreverem, capacitando- as a receber e transmitir o ensino sem mistura ou erro. A inspira&ccedil;&atilde;o divina &eacute; tamb&eacute;m a garantia de que as pessoas escolhidas escreveram apenas o que Deus queria, sem os sinais da fraqueza humana. Leia a seguir o que disse Paulo, um dos escritores: &ldquo;Toda a escritura &eacute; divinamente inspirada...&rdquo; (2 Tim&oacute;teo 3.16&ordf;).</span></span></p>
</div>

<div>
<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. COMO USAR A B&Iacute;BLIA NA IGREJA</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A primeira parte da B&iacute;blia, que come&ccedil;a com o livro de G&ecirc;nesis e termina com o livro de Malaquias, chama-se: <strong>Antigo Testamento </strong>ou, abreviando-se, <strong>AT</strong>. S&atilde;o ao todo 39 livros. Depois de Malaquias, o ultimo livro do Antigo Testamento, inicia-se o <strong>Novo Testamento, </strong>conhecido pelas letras iniciais <strong>NT </strong>e tem 27 livros. Juntos, AT e NT somam 66 livros. Um detalhe interessante &eacute; que os 66 livros n&atilde;o est&atilde;o organizados pela ordem de data em que foram escritos. A preocupa&ccedil;&atilde;o de Deus n&atilde;o foi contar uma hist&oacute;ria cronol&oacute;gica, mas sim, revelar o seu plano para salvar todos os homens e mulheres.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Para que se encontre facilmente um texto, cada livro da b&iacute;blia &eacute; dividido em <strong>cap&iacute;tulos </strong>ou <strong>n&uacute;meros </strong>e <strong>vers&iacute;culos </strong>ou <strong>versos</strong>. O n&uacute;mero em tamanho grande ao lado esquerdo das palavras impressas indica o Cap&iacute;tulo ou n&uacute;mero, e o menor, o</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">vers&iacute;culo ou verso. Antes do in&iacute;cio de cada cap&iacute;tulo, ou de alguns grupos de vers&iacute;culos, voc&ecirc; encontra o t&iacute;tulo do assunto. &Eacute; bom voc&ecirc; saber que os escritores da B&iacute;blia n&atilde;o escreveram os t&iacute;tulos, cap&iacute;tulos, vers&iacute;culos, etc. Todos estes recursos foram adotados muitos anos depois para facilitar a leitura e o estudo da b&iacute;blia.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Existem diversas vers&otilde;es de tradu&ccedil;&atilde;o da B&iacute;blia. As vers&otilde;es s&atilde;o resultantes de atualiza&ccedil;&otilde;es de uma tradu&ccedil;&atilde;o. A tradu&ccedil;&atilde;o significa que tudo o que estava</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">escrito em hebraico (AT) e grego (NT) foi traduzido para o portugu&ecirc;s. A tradu&ccedil;&atilde;o principal utilizada no Brasil &eacute; a de Jo&atilde;o Ferreira de Almeida. Desta tradu&ccedil;&atilde;o, existem as vers&otilde;es que apresentam diferen&ccedil;as, n&atilde;o nas mensagens, mas nas palavras.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Veja um exemplo: numa vers&atilde;o, voc&ecirc; l&ecirc; em 1 Cor&iacute;ntios 13: &ldquo;Caridade&rdquo; e em outra, publicada mais recentemente, &ldquo;amor&rdquo;. A quest&atilde;o &eacute; que com o passar do tempo a palavra &ldquo;caridade&rdquo; tomou outro sentido e n&atilde;o &eacute; t&atilde;o forte como o termo &ldquo;amor&rdquo;. Por causa das diferentes vers&otilde;es, voc&ecirc; escuta as pessoas lerem o mesmo vers&iacute;culo de maneiras diferentes.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. COMO USAR A B&Iacute;BLIA NO DIA-A-DIA</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Voc&ecirc; n&atilde;o deve usar a B&iacute;blia apenas em alguns momentos, pois se limitar o uso dela o seu crescimento espiritual acontecer&aacute; lentamente. Um passo que voc&ecirc; deve dar para crescer espiritualmente &eacute; estudar profundamente a Palavra de Deus. Devem acompanhar voc&ecirc; num estudo mais aprofundado da B&iacute;blia os seguintes materiais:</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>a) A B&iacute;blia</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Se poss&iacute;vel, use v&aacute;rias vers&otilde;es existentes em portugu&ecirc;s para consulta comparativa;</span></span></p>
</div>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>b) Uma concord&acirc;ncia B&iacute;blica</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Ajuda a localizar palavras, assuntos e suas refer&ecirc;ncias b&iacute;blicas, livro por livro;</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>c) Chaves B&iacute;blicas</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Traz esbo&ccedil;os dos livros da B&iacute;blia e tamb&eacute;m introdu&ccedil;&atilde;o dos autores, hist&oacute;ria e datas;</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>d) Dicion&aacute;rio B&iacute;blico</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para a explica&ccedil;&atilde;o de palavras e assuntos b&iacute;blicos;</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>e) Dicion&aacute;rio de Portugu&ecirc;s</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para saber o significado das palavras pouco conhecidas por voc&ecirc;;</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>f) Um caderno</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para anota&ccedil;&otilde;es das observa&ccedil;&otilde;es e correla&ccedil;&otilde;es do seu estudo.</span></span></p>

<p>&nbsp;</p>

      `,
    imagem: require('@/assets/images/start1.png'),
  },
  {
    titulo: 'Lição 2 - Conhecendo a Deus',
    videoUrl: 'https://www.youtube.com/embed/w4KbJsqNDC4?si=XN_Zz_gUgpULRD00',
    descricao:
      `
      <div>
<div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Deus tem m&uacute;ltiplos nomes que legitimam sua grandeza e excel&ecirc;ncia dando respaldo ao ser humano sobre sua exist&ecirc;ncia e convic&ccedil;&atilde;o. Seguem algumas informa&ccedil;&otilde;es que podem te ajudar a conhecer um pouco do muito que &eacute; o nosso Deus.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. CONHECENDO DEUS ATRAV&Eacute;S DE SUAS QUALIDADES</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Deus tem muitas qualidades atrav&eacute;s das quais Ele se identifica com o ser humano e, ao mesmo tempo, torna-se diferente de todos os outros seres espirituais. Uma das formas de voc&ecirc; descobrir algumas dessas qualidades &eacute; conhecendo alguns dos seus variados nomes. O nome de Deus &eacute; muito mais do que um conjunto de letras do portugu&ecirc;s ou de qualquer outro idioma. Na b&iacute;blia, os nomes de Deus mais comuns s&atilde;o: Senhor, Jeov&aacute;, Pai, terno, Alt&iacute;ssimo etc. Independente da nomenclatura escolhida, seguem algumas refer&ecirc;ncias importantes de como devemos tratar o Seu nome:</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px">O seu nome deve ser invocado na adora&ccedil;&atilde;o (leia G&ecirc;nesis 12.8);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">O seu nome deve ser temido (leia Deuteron&ocirc;mio 28.58);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">O seu nome deve ser louvado (leia 2 Samuel 22.50);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">O seu nome n&atilde;o pode ser tomado em v&atilde;o (leia &Ecirc;xodo 20.7);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">O seu nome n&atilde;o pode ser profanado, nem blasfemado (leia Lev&iacute;tico 18.21;24.16);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">O seu nome deve ser santificado e bendito (leia Mateus 6.9</span></span></li>
</ol>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. CONHECENDO DEUS ATRAV&Eacute;S DOS ASPECTOS DO SEU CAR&Aacute;TER</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Seguem algumas caracter&iacute;sticas EXCLUSIVAS de Deus:</span></span></p>
</div>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Soberania</strong>: Para voc&ecirc;, pode ser encorajador porque te fornece a seguran&ccedil;a de que nada est&aacute; fora do controle do Senhor e os Seus planos s&atilde;o, de fato, realizados. Leia Sl 29.10,71.16.f</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Eternidade</strong>: Nunca houve um tempo em que Deus n&atilde;o existisse. Ele n&atilde;o teve princ&iacute;pio e jamais ter&aacute; fim. N&atilde;o se limita ao tempo. Sendo eterno, Ele v&ecirc; o passado e o futuro de modo t&atilde;o claro como contempla o presente. Nesta perspectiva, Ele sabe o que &eacute; melhor para a vida do crist&atilde;o. Leia Isa&iacute;as 44.6</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Onisci&ecirc;ncia</strong>: Deus possui todo o conhecimento que existe. Nada o pega de surpresa. A onisci&ecirc;ncia do Senhor permite que Ele tenha conhecimento de tudo antes e depois. Leia Hebreus 4.13.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Onipresen&ccedil;a</strong>: Significa que Deus est&aacute; presente em todo o tempo e espa&ccedil;o. Ningu&eacute;m pode se esconder de sua face. Mas a presen&ccedil;a do Senhor deve ser experimentada em todo o tempo de maneira bem real. Leia Jeremias 23.24.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Onipotente</strong>: Deus tem mais do que o poder necess&aacute;rio para realizar todas as coisas. O crente tem certeza de sua salva&ccedil;&atilde;o porque o Senhor &eacute; Todo-Poderoso. Esta for&ccedil;a se manifesta no Evangelho de Cristo para salva&ccedil;&atilde;o dos homens. Leia Romanos 1.16.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Imut&aacute;vel</strong>: Jamais muda em Sua natureza e postura. Ser&aacute; sempre bom, justo e verdadeiro. Leia N&uacute;meros 23.19.</span></span></li>
</ol>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Existem tamb&eacute;m os aspectos <strong>partilhados </strong>de Deus para com o ser humano. S&atilde;o caracter&iacute;sticas que Deus espera que n&oacute;s, Seus filhos, tamb&eacute;m possamos ter. Estes aspectos se manifestam de forma limitada.</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Retid&atilde;o: </strong>&Eacute; imposs&iacute;vel Deus fazer algo errado. Por causa de sua retid&atilde;o, Ele espera o mesmo de todos os que desejam estar em Sua presen&ccedil;a. &Eacute; um estilo de vida para ser vivido pela gra&ccedil;a de Deus, pois &eacute; humanamente imposs&iacute;vel ao homem e &agrave; mulher terem a retid&atilde;o total de Deus. Leia Mateus 5-48.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Justi&ccedil;a: </strong>Deus jamais age com desonestidade. A justi&ccedil;a divina &eacute; manifestada no livramento do inocente. Leia 2 Tim&oacute;teo 4-8.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Amor: </strong>&Eacute; um outro aspecto divino. Na verdade, Deus &eacute; amor. Esta virtude do Senhor &eacute; perfeita e infinita. A maior demonstra&ccedil;&atilde;o do amor de Deus foi a de conceder o seu pr&oacute;prio filho para morrer em nosso lugar atrav&eacute;s do Seu sacrif&iacute;cio na cruz do Calv&aacute;rio. Leia Jo&atilde;o 3.16.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Verdade: </strong>Deus &eacute; a verdade absoluta. O homem e a mulher desejam ardentemente encontr&aacute;-la. Por&eacute;m, muitos a procuram em outras fontes. Como voc&ecirc; &eacute; de Jesus, sua busca terminou, pois Cristo &eacute; a verdade. Por esse motivo, viver distante da mentira deve ser um dos grandes objetivos em nossa vida crist&atilde;. Leia Jo&atilde;o 8.32.</span></span></li>
</ol>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. CONHECENDO DEUS, JESUS E O ESP&Iacute;RITO SANTO</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O Pai, Jesus Cristo e o Esp&iacute;rito Santo existem em unidade s&atilde;o tr&ecirc;s pessoas reais e distintas. Elas trabalham juntas em favor do ser humano. Em Jo&atilde;o 15.26 existe uma afirma&ccedil;&atilde;o de Jesus: &ldquo;Mas quando vier o Consolador, que eu da parte do Pai vos hei de enviar, aquele Esp&iacute;rito de verdade, que procede do Pai, ele testificar&aacute; de mim&rdquo;. Isso significa que h&aacute; unidade entre o Pai, Jesus Cristo e o Esp&iacute;rito Santo de tal forma que os tr&ecirc;s s&atilde;o um, ou seja, um s&oacute; Deus. Leia 2 Cor&iacute;ntios 13.14.</span></span></p>
</div>

      `,
    imagem: require('@/assets/images/start2.png'),
  },
  {
    titulo: 'Lição 3 - A Salvação',
    videoUrl: 'https://www.youtube.com/embed/nctL4jP0bHY?si=E3G6gwLGiiv9-SLq',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A salva&ccedil;&atilde;o &eacute; a maior ben&ccedil;&atilde;o que o ser humano pode receber, e ao mesmo tempo &eacute; a maior responsabilidade. A salva&ccedil;&atilde;o &eacute; o tema central da B&iacute;blia. Todo crist&atilde;o deve conhece-la bem e falar dela aos que ainda n&atilde;o aceitaram a Cristo para que tamb&eacute;m sejam salvos.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. O QUE &Eacute; A SALVA&Ccedil;&Atilde;O?</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A princ&iacute;pio, pode-se afirmar que ela &eacute; o resultado da morte de Jesus Cristo na cruz do Calv&aacute;rio, que livra a humanidade da condena&ccedil;&atilde;o eterna causada pelo pecado. Leia Ef&eacute;sios 1.7; 2,1. Podemos dividir o conceito da palavra salva&ccedil;&atilde;o em dois atos:</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Um ato da soberana vontade de Deus</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A salva&ccedil;&atilde;o &eacute; um ato da soberana vontade de Deus, sob a qual seu filho nos reconciliou consigo mesmo. Est&aacute; relatado em 2 Cor&iacute;ntios 5-18.19: &ldquo; E tudo isto prov&eacute;m de Deus, que nos reconciliou consigo mesmo por Jesus Cristo, e nos deu o minist&eacute;rio da reconcilia&ccedil;&atilde;o: isto &eacute;, Deus estava em Cristo reconciliando consigo o mundo, n&atilde;o lhes imputando os seus pecados...&rdquo;. Observe que a salva&ccedil;&atilde;o &eacute; a demonstra&ccedil;&atilde;o do grande amor de Deus em favor da humanidade, condenada pelo pecado. Leia Romanos 5.8. Ela &eacute; oferecida a todos, sem exce&ccedil;&atilde;o. Em Cristo, todos podem ser salvos, libertos do pecado, tornando-se, assim, filhos de Deus. Leia Jo&atilde;o 1.12.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Um ato da infinita miseric&oacute;rdia de Deus</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A salva&ccedil;&atilde;o vem graciosamente mediante a f&eacute; e n&atilde;o atrav&eacute;s dos nossos pr&oacute;prios m&eacute;ritos ou boas obras. O pr&oacute;prio criador tomou a decis&atilde;o de reconciliar consigo o homem e a mulher, que pela desobedi&ecirc;ncia, haviam se afastado dEle, tornando-se escravos do pecado e inimigos de quem os criara. Voc&ecirc; tamb&eacute;m precisa saber que a sua salva&ccedil;&atilde;o custou um alto pre&ccedil;o, o sangue de Jesus Cristo, o Cordeiro de Deus (Jo&atilde;o 1.29), imolado pelos nossos pecados na cruz do Calv&aacute;rio conforme a profecia de Isa&iacute;as 53.4-7. Leia tamb&eacute;m Ef&eacute;sios 2.8,9.</span></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. A NECESSIDADE DA SALVA&Ccedil;&Atilde;O</strong></span></span></h3>
</div>

<div>
<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Todos precisa arrepender-se dos seus pecados, confess&aacute;-los a Deus e abandon&aacute;-los definitivamente aceitando o dom gratuito de Deus. Leia Romanos 6.23.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1. A origem do pecado</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Como o pecado entrou no mundo, como isto aconteceu?</strong></span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Em Genesis 1.26,27 lemos que Deus criou o homem e a mulher &agrave; sua imagem e semelhan&ccedil;a e o colocou no Jardim do &Eacute;den. Disse-lhes que de todos os frutos podiam comer, por&eacute;m, daquele da &aacute;rvore do conhecimento do bem e do mal, o Senhor lhes proibiu que provassem. Feitos &agrave; imagem e semelhan&ccedil;a de Deus, o homem e a mulher possu&iacute;am o livre-arb&iacute;trio. Estavam capacitados a discernirem o bem e o mal, o certo e o errado. Enquanto obedecessem viveriam. Todavia, apesar de usufruir das del&iacute;cias do &Eacute;den e conviverem em perfeita harmonia com o Criador, o homem e a mulher, tentados, pecaram e foram destitu&iacute;dos da gl&oacute;ria com que foram criados perdendo, assim, a comunh&atilde;o com Deus. Como representantes da ra&ccedil;a humana, eles transmitiram o pecado e a condena&ccedil;&atilde;o &agrave; sua descend&ecirc;ncia. A desobedi&ecirc;ncia de Ad&atilde;o afetou toda cria&ccedil;&atilde;o, a qual geme e chora sob o peso da maldi&ccedil;&atilde;o. Leia Genesis 3.6,17-19 e Romanos 8.22.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2. A heran&ccedil;a do pecado</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A salva&ccedil;&atilde;o &eacute; a vida eterna em Cristo Jesus, visto que s&oacute; Ele pode salvar o homem da condena&ccedil;&atilde;o da morte eterna, causada pelo pecado do primeiro homem. Veja o que relata a B&iacute;blia: &ldquo;Porque todos pecaram e destitu&iacute;dos est&atilde;o da gl&oacute;ria de Deus&rdquo; (Romanos 3.23). &ldquo;Pelo que, como por um homem entrou o pecado no mundo, e pelo pecado a morte, assim tamb&eacute;m a morte passou a todos os homens; por isso, que todos pecaram&rdquo; (Romanos 5.12). Esta &eacute; uma revela&ccedil;&atilde;o terr&iacute;vel: &ldquo;a morte passou a todos os homens...&rdquo;. Deste modo, o pecado foi a heran&ccedil;a maldita deixada a humanidade.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Como escapar desta condena&ccedil;&atilde;o?</span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Veja a import&acirc;ncia da salva&ccedil;&atilde;o: voc&ecirc; estava morto em delitos e pecados e nada podia fazer para escapar do ju&iacute;zo divino. Por&eacute;m, Deus, em Seu filho, o libertou da condena&ccedil;&atilde;o da morte eterna. Leia Jo&atilde;o 5.24. Voc&ecirc;, agora, n&atilde;o precisa temer o ju&iacute;zo final, pois Jesus, mediante a Sua morte na cruz do calv&aacute;rio, condenou o pecado e concedeu a vida eterna a todos que nEle crerem. Cristo anulou por Sua morte e ressurrei&ccedil;&atilde;o os efeitos do pecado, que s&atilde;o a morte eterna e suas consequ&ecirc;ncias.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Leia&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Romanos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8.1.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. ASPECTOS DA SALVA&Ccedil;&Atilde;O</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">S&atilde;o dois:</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1. Justifica&ccedil;&atilde;o</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Como se justificaria o homem para com Deus?</strong></span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A humanidade, morta em seus delitos e pecados, n&atilde;o tinha como justificar-se perante o Todo- Poderoso. Por&eacute;m, mediante Sua morte expiat&oacute;ria e substitutiva, Jesus tornou poss&iacute;vel a justifica&ccedil;&atilde;o do transgressor.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Como &eacute; poss&iacute;vel isto?</span></span></h3>
</div>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Justifica&ccedil;&atilde;o &eacute; um termo judicial que lembra um tribunal, em que Deus (o supremo juiz) absolve o pecador das suas transgress&otilde;es e o declara justo, isto &eacute;, justificado. Desta forma, Deus (o ofendido) reconcilia consigo mesmo a humanidade (o ofensor). O que a humanidade n&atilde;o p&ocirc;de fazer Deus o fez por ela. A justi&ccedil;a de Cristo (o justo) &eacute; concedida ao ser humano mediante a gra&ccedil;a divina. Agora, feito justo pela de justi&ccedil;a de Cristo que lhe foi concedida, ele se torna membro da fam&iacute;lia divina e adotado como filho de Deus mediante o batismo nas &aacute;guas. Leia Romanos 5.17-19.</span></span></p>

<p style="margin-left:14.25pt">&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2. A santifica&ccedil;&atilde;o</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Uma vez restaurada a comunh&atilde;o com Deus, a humanidade abandona as pr&aacute;ticas pecaminosas do passado e separa-se (santifica-se) para servi&ccedil;o do Senhor. A santifica&ccedil;&atilde;o &eacute; um ato do Esp&iacute;rito Santo no interior do crist&atilde;o, que se reflete nos seus atos exteriores. Portanto, justifica&ccedil;&atilde;o e santifica&ccedil;&atilde;o s&atilde;o os dois aspectos da salva&ccedil;&atilde;o plena em Cristo Jesus. Ao subir ao c&eacute;u, o Senhor Jesus ordenou aos Seus disc&iacute;pulos que realizassem a obra que ele iniciara em seu minist&eacute;rio terreno. Desde ent&atilde;o, todos os que realmente aceitam a Cristo como o seu Senhor e Salvador cumprem o &ldquo;Ide&rdquo;, a fim de ganharem vidas para o Reino de Deus.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>IV. JORNADA DA VIDA CRIST&Atilde;</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>A. Confiss&atilde;o de f&eacute; em Jesus Cristo</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">1 Joa&otilde; 4.15: &ldquo;Qualquer que confessar que Jesus &eacute; o Filho de Deus, Deus est&aacute; nele, e ele em Deus.&rdquo;</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>B. Justifica&ccedil;&atilde;o pela f&eacute; em Jesus Cristo</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Romanos 5.1: &ldquo;Tendo sido, pois, justificados pela f&eacute;, temos paz com Deus, por nosso Senhor Jesus.&rdquo;</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>C. Batismo nas &aacute;guas</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Atos 8.9: &ldquo; E Felipe mandou parar o carro, e descerem ambos &agrave; &aacute;gua, tanto Felipe como o eunuco, e o batizou.&rdquo; (At. 8.38).</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>D. Santifica&ccedil;&atilde;o</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Romanos 6.19(b): &ldquo;Assim apresentai agora os vossos membros &agrave; justi&ccedil;a para a santifica&ccedil;&atilde;o.&rdquo;</span></span></p>

      `,
    imagem: require('@/assets/images/start3.png'),
  },
    {
    titulo: 'Lição 4 - Conhecendo a Igreja',
    videoUrl: 'https://www.youtube.com/embed/5WUd_c4cQxA?si=iHzaeD69ctGbyu0e',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px">INTRODU&Ccedil;&Atilde;O</span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Voc&ecirc; faz parte da Igreja, pois n&atilde;o apenas recebeu a salva&ccedil;&atilde;o oferecida por Cristo, mas tamb&eacute;m foi inclu&iacute;do em Sua fam&iacute;lia. A palavra &ldquo;Igreja&rdquo;, nesta li&ccedil;&atilde;o n&atilde;o est&aacute; restrita a CRIEP (Igreja Evang&eacute;lica Pentecostal Comunh&atilde;o Rara da F&eacute;) ou a qualquer outra denomina&ccedil;&atilde;o, nem ao local onde voc&ecirc; frequenta os cultos. Depois do plano idealizado por Deus para salvar a humanidade, a igreja &eacute; uma das mais lindas cria&ccedil;&otilde;es da divindade. Aqueles que s&atilde;o salvos formam um corpo, que &eacute; a porta-voz da salva&ccedil;&atilde;o para outras pessoas. A igreja &eacute; um organismo que tem a pr&oacute;pria vida em Cristo, o qual estabeleceu sua miss&atilde;o. Quem faz parte desta igreja d&aacute; continuidade ao trabalho de Cristo na terra, isto &eacute; ser uma ben&ccedil;&atilde;o para o mundo. Ningu&eacute;m recebeu a salva&ccedil;&atilde;o simplesmente para ser salvo, mas sim para integrar-se &agrave; igreja. Por isso, &eacute; preciso que voc&ecirc; compreenda bem o que ela significa, conhe&ccedil;a quais s&atilde;o os seus objetivos e a suas ordenan&ccedil;as.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. OQUE &Eacute; A IGREJA?</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A palavra &ldquo;Igreja&rdquo; significa &ldquo;uma reuni&atilde;o de pessoas chamadas para fora&rdquo; ou seja, um grupo de pessoas que sa&iacute;ram do mundo (espiritualmente falando) para seguirem a Cristo. Todos os crist&atilde;os espalhados pelo mundo formam a igreja. Ela n&atilde;o est&aacute; restrita &agrave; uma &aacute;rea geogr&aacute;fica e nem a um &uacute;nico povo da terra, antes &eacute; invis&iacute;vel e universal.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Existem dois s&iacute;mbolos que representam a Igreja:</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Corpo</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Jesus n&atilde;o est&aacute; mais presente de forma f&iacute;sica, mas em cada pessoa que o recebe, em qualquer parte do mundo, ele introduz a Sua vida para conect&aacute;-la ao corpo. Por ter a vida em Cristo, a Igreja n&atilde;o &eacute; um simples ajuntamento de pessoas, uma associa&ccedil;&atilde;o ou clube. &Eacute; um organismo, algo que t&ecirc;m exist&ecirc;ncia tal como o corpo humano. &Eacute; um composto de muitos membros e &oacute;rg&atilde;os que funcionam em prol de uma vida comum. Da mesma forma que o ser humano &eacute; um, mas tem milh&otilde;es de c&eacute;lulas vivas, assim tamb&eacute;m &eacute; a igreja. Um corpo, mas constitu&iacute;dos por milh&otilde;es de pessoas nascidas de novo por interm&eacute;dio do Evangelho de Jesus. Possui tamb&eacute;m um cabe&ccedil;a, o pr&oacute;prio Cristo. Ele &eacute; o l&iacute;der, o guia, o principal da Igreja. Leia Ef&eacute;sios 2.19-22 e Colossenses 1.18.</span></span></p>
</div>

<div>
<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Casa de Ora&ccedil;&atilde;o</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Embora Deus habite em toda parte, &eacute; saud&aacute;vel nos reunirmos como Igreja local para juntos adorarmos e louvarmos ao Senhor. Leia Hebreus 10.24-25.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Infelizmente, por conta de uma s&eacute;rie de acontecimentos tristes dentro de algumas igrejas, muitos est&atilde;o adotando uma ideologia chamada de: &ldquo;Crist&atilde;os sem igreja&rdquo;.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Por mais que respeitamos as pessoas que pensam assim, de forma algumas, essa ideologia far&aacute; parte do nosso DNA. Sabemos sim, das tristezas geradas por l&iacute;deres irrespons&aacute;veis, mas tamb&eacute;m sabemos do qu&atilde;o &eacute; apaixonante servirmos numa igreja Local.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Uma vez Bill Hybels escreveu: <em>&ldquo;A Igreja Local &eacute; a esperan&ccedil;a do mundo quando funciona corretamente.&rdquo;</em></span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. OS OBJETIVOS DA IGREJA</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Atrav&eacute;s da B&iacute;blia, voc&ecirc; descobre que a Igreja foi fundada por Cristo para cumprir as seguintes finalidades:</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Evangelizar o mundo</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A principal atividade dos crist&atilde;os &eacute; levar a salva&ccedil;&atilde;o para os n&atilde;o crist&atilde;os. Cristo, depois de completar a Sua miss&atilde;o na Terra, declarou: &ldquo;&Eacute; me dado todo o poder no C&eacute;u e na Terra. &ldquo;E, em seguida, estabeleceu uma miss&atilde;o aos Seus seguidores.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Leia Mateus 28.19 e 20. &Eacute; atrav&eacute;s da Igreja que o Evangelho &eacute; pregado a todas as pessoas do mundo. Esta miss&atilde;o n&atilde;o foi dada aos anjos e nem a outro ser espiritual, mas aos crist&atilde;os que formam a Igreja.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Lugar para o crist&atilde;o cultuar a Deus e aprender da Sua Palavra</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O culto &eacute; o momento de ora&ccedil;&atilde;o, louvor, adora&ccedil;&atilde;o e edifica&ccedil;&atilde;o dos crist&atilde;os. No culto, todos os crist&atilde;os podem se unir em ora&ccedil;&atilde;o, peti&ccedil;&atilde;o, a&ccedil;&atilde;o de gra&ccedil;as e intercess&atilde;o. O culto tamb&eacute;m &eacute; uma oportunidade para os crist&atilde;os estudarem a Biblia. A pessoa aumenta o seu crescimento espiritual quando a palavra &eacute; compreendida com sabedoria em um culto ou estudo b&iacute;blico. Quando os crist&atilde;os se re&uacute;nem para cultuar a Deus, existe a oportunidade para que venham praticar a comunh&atilde;o muito mais do que uma simples amizade. A comunh&atilde;o &eacute; resultante de uma experi&ecirc;ncia comum. Todas as diferen&ccedil;as s&atilde;o eliminadas, e os homens e as mulheres se tornam irm&atilde;os em Cristo. Na igreja, voc&ecirc; &eacute; aperfei&ccedil;oado para o desempenho do servi&ccedil;o e edifica&ccedil;&atilde;o/constru&ccedil;&atilde;o do corpo de Cristo. Leia Hebreus 10.25, 1Jo&atilde;o 1.6-7 e Colossenses 3.16.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3.Lugar para o crente praticar a mordomia (servi&ccedil;o) crist&atilde;</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Tudo o que voc&ecirc; possui n&atilde;o lhe pertence (Leia salmos 24.1). Por isso, n&atilde;o tem o direito de fazer o que quer. Deus est&aacute; em primeiro lugar em sua exist&ecirc;ncia. Isso inclui sua vida, seu tempo, seus talentos e suas finan&ccedil;as. Voc&ecirc; deve buscar o Reino de Deus e a Sua justi&ccedil;a e ter a certeza que as demais coisas ser&atilde;o acrescentadas. Leia Mateus 6.33.</span></span></p>
</div>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Exemplo:</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Passar boa parte do seu tempo cultuando a Deus e o servindo na evangeliza&ccedil;&atilde;o;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Empregar todos os seus talentos na igreja, para torn&aacute;-lo forte e vibrante;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Investir financeiramente atrav&eacute;s dos d&iacute;zimos e ofertas;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Dedicar os seus bens ao Senhor, pois voc&ecirc; prestar&aacute; conta a Ele de tudo o que administrou nessa vida.</span></span></li>
</ul>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. AS DUAS ORDENAN&Ccedil;AS DA IGREJA</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">H&aacute; duas cerim&ocirc;nias ordenadas por Cristo para que os Crist&atilde;os as pratiquem: o batismo em &aacute;gua e a Ceia do Senhor (Eucaristia).</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.O Batismo</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Atrav&eacute;s do batismo, a pessoa d&aacute; um testemunho p&uacute;blico de sua identifica&ccedil;&atilde;o com Cristo, &Eacute; o sinal exterior que representa a morte para o mundo e a ressurrei&ccedil;&atilde;o para Deus.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Cada um de n&oacute;s repete, de modo espiritual, o que aconteceu com Cristo. Ele morreu e ressuscitou. Assim, pelo batismo voc&ecirc; prova que &eacute; vitorioso. O batismo em &aacute;guas n&atilde;o salva, porque em si, n&atilde;o tem poder para tal. As igrejas locais estabelecem esta pratica para que o novo crente se torne membro dela. A maioria das denomina&ccedil;&otilde;es evang&eacute;licas n&atilde;o batiza crian&ccedil;as, porque entendem que essa decis&atilde;o precisa ser muito bem avaliada pela pr&oacute;pria pessoa. Mateus</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">3.11 e 28.19, Marcos 1.9, Jo&atilde;o 1.32-33 e Atos 2.38.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A CRIEP, como a maioria das denomina&ccedil;&otilde;es evang&eacute;licas, n&atilde;o batizam crian&ccedil;as com menos de 12 anos de idade, pois entendemos que essa decis&atilde;o precisa ser muito bem avaliada.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Ceia do Senhor (Eucaristia)</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Na CRIEP, todo m&ecirc;s h&aacute; pelo menos um culto de ceia. Esse culto n&atilde;o foi ideia de um homem ou mulher, mas foi institu&iacute;do por Jesus na v&eacute;spera da Sua crucifica&ccedil;&atilde;o, para os crist&atilde;os relembrarem da Sua morte atrav&eacute;s do p&atilde;o e do vinho. O primeiro simboliza o seu Corpo, e o segundo, o Seu sangue. N&atilde;o somente para relembra a Sua morte vitoriosa, mas os crist&atilde;os tomam a Ceia do Senhor para anunciar a Cristo, at&eacute; que Ele volte. Para participar da Ceia, cada um deve examinar-se a si mesmo e remover qualquer impedimento. N&atilde;o apenas com apar&ecirc;ncia de santidade, mas como um pecador arrependido e um instrumento para ser usado no testemunho de Cristo aos homens e mulheres perdidos. Leia Mateus 26.26-29, 1 Cor&iacute;ntios 10.16 e 11.26-31.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. AS DUAS ORDENAN&Ccedil;AS DA IGREJA</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">H&aacute; duas cerim&ocirc;nias ordenadas por Cristo para que os Crist&atilde;os as pratiquem: o batismo em &aacute;gua e a Ceia do Senhor (Eucaristia).</span></span></p>

      `,
    imagem: require('@/assets/images/start4.png'),
  },
  {
    titulo: 'Lição 5 - Princípios da Oração',
    videoUrl: 'https://www.youtube.com/embed/8XFZ2DwA3V0?si=pSTtmmRS3hR2LRcm',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Nesta li&ccedil;&atilde;o, voc&ecirc; vai conhecer o quanto &eacute; bom orar, e vai aprender que tudo quanto se pede ao Senhor, com f&eacute;, mediante Sua vontade, se recebe.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. O QUE SIGNIFICA ORAR?</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Conversar com Deus: </strong>&Eacute; o di&aacute;logo que devemos manter com o Pai celestial.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>&Eacute; ter comunh&atilde;o com Deus: </strong>Ela faz com que as pessoas sintam a comunh&atilde;o real com seu criador. Seria imposs&iacute;vel para os crist&atilde;os, no decorrer da historia da Igreja enfrentar os tribunais, as arenas, as fogueiras, os pelot&otilde;es de fuzilamento, as pris&otilde;es, a fome e a sede, a persegui&ccedil;&atilde;o, a incompreens&atilde;o, e tantos outros males, n&atilde;o fosse com a certeza de que n&atilde;o estavam sozinhos, mas sentiam uma &ldquo;m&atilde;o&rdquo; que lhes segurava e uma &ldquo;voz&rdquo; suave a lhes dizer: &ldquo;Coragem, meus amigos, pois estou aqui para lhes conceder a vit&oacute;ria e, logo mais, voc&ecirc;s estar&atilde;o comigo!&rdquo;</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Orar n&atilde;o &eacute; rezar: </strong>Como j&aacute; foi dito anteriormente, orar &eacute; conversar com Deus, &eacute; dialogar com Ele. Deve fluir normal e espontaneamente. O Esp&iacute;rito Santo nos inspira as palavras que devem ser ditas nas ora&ccedil;&otilde;es que fazemos. N&atilde;o &eacute; errado reproduzirmos ora&ccedil;&otilde;es feitas por outras pessoas, mas na maioria das vezes &eacute; importante usarmos as nossas pr&oacute;prias palavras, fugindo, assim, das v&atilde;s repeti&ccedil;&otilde;es.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Os disc&iacute;pulos pediram a Jesus que lhe ensinasse a orar. O Mestre, de pronto, lhe respondeu:</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Pai nosso que est&aacute;s nos c&eacute;us! Santificado seja o teu nome. Venha o teu Reino; seja feita a tua vontade, assim na terra como no c&eacute;u. D&aacute;-nos hoje o nosso p&atilde;o de cada dia. Perdoa as nossas d&iacute;vidas, assim como perdoamos aos nossos devedores. E n&atilde;o nos deixe cair em tenta&ccedil;&atilde;o, mas livra-nos do mal, porque teu &eacute; o Reino, o poder e a gl&oacute;ria para sempre. Am&eacute;m&rdquo;. Mateus 6.9-13 (NVI).</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Esta &eacute; uma ora&ccedil;&atilde;o ensinada por Jesus e utilizada pela maioria das igrejas evang&eacute;licas nos dias atuais.</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. COMO ORAR?</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>De joelhos: </strong>Muitos consideram esta a melhor maneira de se conversar com Deus, pois &eacute; uma demonstra&ccedil;&atilde;o de submiss&atilde;o, rever&ecirc;ncia e humildade. Leia Ef&eacute;sios 3.14.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>De p&eacute;: </strong>Este modo refere-se a Josaf&aacute;, rei de Jud&aacute;, que em p&eacute;, diante do povo, orou a Deus, e recebeu a resposta imediatamente. Os crist&atilde;os costumam orar em p&eacute;, no in&iacute;cio, durante e no fim dos cultos. Leia 2 Cr&ocirc;nicas 20.5-6.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Deitado: </strong>Esta passagem registra a enfermidade de Ezequias, rei de Jud&aacute;. Acamado, recebeu a visita do profeta Isa&iacute;as que lhe transmitiu o recado de Deus a respeito de sua morte iminente: &ldquo;Morrer&aacute;s, e n&atilde;o viver&aacute;s&rdquo;. Deitado, Ezequias virou o rosto para a parede e orou. O Senhor o ouviu e concedeu mais 15 anos de vida. Leia 2 Reus 20.2-3.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. ONDE ORAR?</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Na Casa de Ora&ccedil;&atilde;o: </strong>Biblicamente, todas as igrejas evang&eacute;licas dedicadas a Deus, tornam-se uma Casa de Ora&ccedil;&atilde;o. Nela, os Crist&atilde;os se re&uacute;nem para buscar a presen&ccedil;a de Deus e receber Suas b&ecirc;n&ccedil;&atilde;os. Consagra&ccedil;&otilde;es, Reuni&otilde;es de Ora&ccedil;&atilde;o e Vig&iacute;lias s&atilde;o encontros j&aacute; tradicionais em nossas igrejas. Ocasi&otilde;es em que adoramos a Deus, Ele nos enche com o Esp&iacute;rito Santo, cura nossas enfermidades e nos ajuda em orienta&ccedil;&atilde;o para resolvermos os nossos problemas. Leia Mateus 21.13.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Em particular: </strong>Jesus, em seu Serm&atilde;o da montanha, enfatizou que a ora&ccedil;&atilde;o feita em particular &eacute; ouvida pelo Senhor, que v&ecirc; secretamente. Leia Mateus 6.6.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Em fam&iacute;lia: </strong>Aqueles primeiros crist&atilde;os ainda n&atilde;o tinham um templo-sede para se reunirem, utilizavam as casas dos irm&atilde;os em Cristo para cultuar ao Senhor. Oravam exatamente na resid&ecirc;ncia de Maria, m&atilde;e do evangelista Marcos (escritor do segundo evangelho), quando um anjo de Deus, em resposta &agrave;s suas ora&ccedil;&otilde;es, visitou o c&aacute;rcere onde estava preso o ap&oacute;stolo Pedro, e o libertou. Leia Atos 12.12.</span></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>IV. QUANDO ORAR?</strong></span></span></h2>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Ao deitar-se: </strong>Depois de um dia estafante, principalmente em uma cidade grande, onde se enfrenta perigos mil, &eacute; <strong>dever </strong>do crente orar ao deitar e agradecer a Deus pelos grandes livramentos, pela prote&ccedil;&atilde;o a Deus pelos grandes livramentos, pela prote&ccedil;&atilde;o dos assaltos, das batidas do carro no tr&acirc;nsito, dos atropelamentos; pela sa&uacute;de e por tudo que lhe acontece, pois a B&iacute;blia recomenda: &ldquo;Dando sempre gra&ccedil;as por tudo a nosso Deus e Pai em nome do nosso Senhor Jesus Cristo&rdquo; &ndash; Ef&eacute;sios 5.20.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Ao levantar-se: </strong>Nossas vidas est&atilde;o entregues nas m&atilde;os de Deus. Por isso, tamb&eacute;m o nosso dever, ao iniciarmos o novo dia, orar, para que o Senhor mande os seus anjos, a fim de nos livrar de todos os perigos; conforme lemos no Salmo 91.11; &ldquo;Porque aos Seus anjos dar&aacute; ordem a teu respeito, para te guardarem em todos os teus caminhos&rdquo;.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Sempre: </strong>Quem vive em total depend&ecirc;ncia de Deus, atrav&eacute;s da ora&ccedil;&atilde;o, &eacute; sempre vitorioso. Orar sempre significa viver as 24 horas do dia em constante comunh&atilde;o com Deus. No deitar,</span></span></p>
</div>

<p>&nbsp;</p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">levantar, trabalhar, viajar e com o pensamento sempre voltado para as coisas espirituais. Leia 1 Tessalonicenses 5.17.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>V. ASSUNTOS PRESENTES NUMA ORA&Ccedil;&Atilde;O ADORA&Ccedil;&Atilde;O</strong></span></span></h2>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Jo&atilde;o 4.24:<em>&rdquo; Deus &eacute; Esp&iacute;rito, e importa que os que o adoram em esp&iacute;rito e em verdade.&rdquo;</em></span></span></p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONFISS&Atilde;O</strong></span></span></h2>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Daniel 9.20(a): <em>&ldquo;Estando eu ainda falando e orando, e confessando o meu pecado.&rdquo;</em></span></span></p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>AGRADECIMENTO</strong></span></span></h2>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Salmos 100.4: <em>&ldquo;Entrai pelas portas dele com gratid&atilde;o, e em seus &aacute;trios com louvor...&rdquo;</em></span></span></p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>PETI&Ccedil;&Atilde;O</strong></span></span></h2>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Filipenses 4.6: <em>&ldquo;N&atilde;o estejais inquietos por coisa alguma, antes as vossas peti&ccedil;&otilde;es sejam em tudo conhecidas diante de Deus pela ora&ccedil;&atilde;o e s&uacute;plica...&rdquo;</em></span></span></p>

      `,
    imagem: require('@/assets/images/start5.png'),
  },
  {
    titulo: 'Lição 6 - O Discípulo Obediente',
    videoUrl: 'https://www.youtube.com/embed/QFN28g7PwZM?si=LHFCCQ5PHsJzTiat',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A obedi&ecirc;ncia, segundo definem os dicionaristas, &eacute; o ato de submeter-se &agrave; vontade de algu&eacute;m. Nesta li&ccedil;&atilde;o, por&eacute;m, voc&ecirc; vai aprender que se tratando do disc&iacute;pulo crist&atilde;o, a obedi&ecirc;ncia est&aacute; profundamente ligada &agrave; f&eacute;, atrav&eacute;s da qual somos introduzidos &agrave; presen&ccedil;a do Deus invis&iacute;vel, a quem volunt&aacute;ria e conscientemente nos submetemos. Por crermos na Sua soberania sobre todas as coisas, nos dispomos a viver em obedi&ecirc;ncia &agrave; sua Palavra, &agrave; Igreja e &agrave;queles que Ele estabeleceu para ministrar o Seu povo.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>EXEMPLOS DE OBEDI&Ecirc;NCIA</strong></span></span></h2>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A obedi&ecirc;ncia &eacute; uma virtude exemplificada em todos os livros da B&iacute;blia. Por&eacute;m, na mesma B&iacute;blia, voc&ecirc; tamb&eacute;m encontra registros sobre a desobedi&ecirc;ncia e suas tristes consequ&ecirc;ncias. Cabe-nos olhar para estes exemplos e tirarmos li&ccedil;&otilde;es que podem nos ajudar a p&ocirc;r em pr&aacute;tica a obedi&ecirc;ncia e n&atilde;o repetir os erros daqueles que n&atilde;o souberam honrar a Deus.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.A obedi&ecirc;ncia de Abra&atilde;o</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Deus fez uma determina&ccedil;&atilde;o ao patriarca Abra&atilde;o baseada em algumas condi&ccedil;&otilde;es. Ele devia deixar sua terra, sua parentela, a casa de seus pais, e seguir para uma terra distante, a qual n&atilde;o conhecia. Estas condi&ccedil;&otilde;es implicavam basicamente em um princ&iacute;pio: obedi&ecirc;ncia. Leia G&ecirc;nesis 12.1.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; importante entendermos que a obedi&ecirc;ncia n&atilde;o imp&otilde;e apenas condi&ccedil;&otilde;es, mas traz tamb&eacute;m privil&eacute;gios. Abra&atilde;o seria pai de uma grande na&ccedil;&atilde;o, aben&ccedil;oado, engrandecido e uma ben&ccedil;&atilde;o para todas as fam&iacute;lias da terra. E mais, aqueles que o aben&ccedil;oassem seriam aben&ccedil;oados; os que o amaldi&ccedil;oassem, seriam amaldi&ccedil;oados.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Vale lembrar, por conseguinte, que todas as vezes que Deus determinou alguma coisa a algu&eacute;m, o intuito n&atilde;o era o obedecer por obedecer, ou simplesmente para fazer valer a Sua soberania. Havia um prop&oacute;sito pr&eacute;-estabelecido. Neste caso, o prop&oacute;sito maior era formar uma na&ccedil;&atilde;o pela qual o redentor, Jesus Cristo, viesse ao mundo, Se Abra&atilde;o n&atilde;o obedecesse, ficaria privado de</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">ter o privil&eacute;gio de constar em sua biografia o registro de progenitor da ra&ccedil;a Judaica que trouxe o&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Salvador&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; da&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Humanidade. N&atilde;o obstante Abra&atilde;o ser um exemplo de obedi&ecirc;ncia houve um momento em sua vida cuja precipita&ccedil;&atilde;o trouxe consequ&ecirc;ncias dr&aacute;sticas que repercutem at&eacute; os dias de hoje. Foi quando Deus prometeu um filho em sua velhice. Induzido por Sara, sua mulher, que j&aacute; n&atilde;o acreditava mais em sua capacidade de gerar nem mesmo por interven&ccedil;&atilde;o divina, Abra&atilde;o acabou tendo um filho com sua escrava Agar, fora do plano de Deus. O resultado &eacute; que logo surgiram os conflitos, principalmente depois que nasceu Isaque, o filho da promessa. Para resumir, ainda hoje as consequ&ecirc;ncias a&iacute; est&atilde;o com as hostilidades entre &aacute;rabes (descendentes de Ismael) e israelenses (descendentes de Isaque). Leia G&ecirc;nesis 15.1-21 e 16.1-16.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. A QUEM DEVEMOS OBEDECER?</strong></span></span></h3>

<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Devemos obedecer a Deus atrav&eacute;s de Sua Palavra</strong></span></span></li>
</ol>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o obstante &agrave; Sua transcend&ecirc;ncia, ou seja, a Sua elevada posi&ccedil;&atilde;o como Criador de todas as coisas, que habita num alto e sublime trono, Deus se revelou a n&oacute;s atrav&eacute;s da Sua Palavra e de Jesus Cristo, Seu filho. Portanto, ao estudarmos a B&iacute;blia, descobrimos os princ&iacute;pios que Ele estabeleceu para reger a nossa vida como crist&atilde;os nesse mundo. A palavra de Deus &eacute; a nossa regra &aacute;urea de f&eacute;, o padr&atilde;o de obedi&ecirc;ncia para com Deus. O Esp&iacute;rito Santo, por sua vez, ilumina a nossa mente e nos ajuda a descobrir como p&ocirc;r em pr&aacute;tica em nosso cotidiano os mandamentos b&iacute;blicos. 2 Tim&oacute;teo 3.16-17.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Devemos obedecer &agrave; Igreja</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A Igreja &eacute; o fiel instrumento comunicativo do plano de salva&ccedil;&atilde;o na pessoa de Jesus Cristo. &Agrave; ela, estamos ligados mediante o novo nascimento. Assim sendo, devemos obedi&ecirc;ncia &agrave; Igreja. No primeiro conc&iacute;lio (reuni&atilde;o de l&iacute;deres) da Igreja, em Jerusal&eacute;m, para discutir a quest&atilde;o do legalismo, relatado em Atos 15.1-35, est&aacute; claro que ela teve participa&ccedil;&atilde;o nas decis&otilde;es sobre o que os gentios deviam ou n&atilde;o acatar.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; sempre bom lembrar que esta obedi&ecirc;ncia &eacute; &agrave; luz da Palavra, e n&atilde;o ao contr&aacute;rio. N&atilde;o &eacute; a igreja que estabelece o que a B&iacute;blia ensina, mas a B&iacute;blia que estabelece o que a Igreja deve fazer. Tudo quanto ela faz ou ensina n&atilde;o pode basear-se em textos isolados, mas nos princ&iacute;pios gerais da B&iacute;blia. Um princ&iacute;pio s&oacute; pode ser assim considerado, se tiver apoio em toda a Palavra de Deus. Se n&atilde;o, pode ser uma boa opini&atilde;o, mas n&atilde;o um princ&iacute;pio b&iacute;blico. O grande erro da Igreja Romana, entre outros ao longo da Hist&oacute;ria, foi que, para justificar suas heresias, inverteu o papel: a sua tradi&ccedil;&atilde;o passou a ser mais importante do que a B&iacute;blia e a arbitrar o que ela ensina.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3.Devemos obedecer aos nossos pastores</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Se a B&iacute;blia &eacute; o nosso padr&atilde;o, ela determina que devemos tamb&eacute;m obedecer aos nossos pastores. Leia Hebreus 13.17. N&atilde;o obstante a salva&ccedil;&atilde;o ser individual, voc&ecirc; descobriu que a responsabilidade de ministrar &agrave;s nossas vidas &eacute; do pastor, de quem Deus vai cobrar a presta&ccedil;&atilde;o de contas um dia. Cabe-lhe, portanto, expor a Palavra para o nosso ensino e crescimento espiritual. De nossa parte, como determina a B&iacute;blia, cabe-nos atentar para os seus conselhos, ouvir-lhes as recomenda&ccedil;&otilde;es e obedecer-lhe, sempre consultando a B&iacute;blia, pois este &eacute; um direito de todos os crist&atilde;os. O direito de ter acesso &agrave; B&iacute;blia Sagrada para comparar o ensino que est&aacute; recebendo com a Palavra de Deus. Aqui vale a seguinte cautela: se, por acaso, o seu pensamento est&aacute; divergindo do que fala a Palavra de Deus e do que pensa a unanimidade da igreja, acenda uma luz de advert&ecirc;ncia e procure um di&aacute;logo sadio com sua lideran&ccedil;a.</span></span></p>
</div>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. EFEITOS DA OBEDI&Ecirc;NCIA</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Para finalizar, veja na B&iacute;blia os efeitos da obedi&ecirc;ncia na vida dos que a praticam:</span></span></p>

<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Os que obedecem a Deus t&ecirc;m o Esp&iacute;rito Santo: </strong>&ldquo;E n&oacute;s somos testemunhas acerca destas palavras. N&oacute;s e tamb&eacute;m o Esp&iacute;rito Santo, que Deus deu &agrave;queles que lhe obedecem.&rdquo; (Atos 5.32)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Os que obedecem a Deus s&atilde;o inabal&aacute;veis: </strong>&ldquo;Todo aquele, pois, que escuta estas minhas palavras e as pratica, assemelh&aacute;-lo-ei ao homem prudente, que edificou a sua casa sobre a rocha.&rdquo; (Mateus 7.24)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Os que obedecem a Deus tem sua obedi&ecirc;ncia reconhecida: </strong>&ldquo;Quanto &agrave; vossa obedi&ecirc;ncia &eacute; ela conhecidas de todos. Comprazo-me, pois, em v&oacute;s, e quero que sejais s&aacute;bios no bem, mas s&iacute;mplices no mal.&rdquo; (Romanos 16.19)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Os que obedecem a Deus glorificam-lhe: </strong>&ldquo; Visto como, na prova desta administra&ccedil;&atilde;o, glorificam a Deus pela submiss&atilde;o que confessais quanto ao evangelho de Cristo, e pela liberalidade de vossos dons para com eles, e para com todos.&rdquo; (2 Cor&iacute;ntios 9.13)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Quem obedece a Deus &eacute; irrepreens&iacute;vel: </strong>&ldquo;De sorte que, meus amados, assim como sempre obedecestes, n&atilde;o s&oacute; na minha presen&ccedil;a, mas muito mais agora na minha aus&ecirc;ncia, assim tamb&eacute;m operai a vossa salva&ccedil;&atilde;o com temor e tremor (...) para que sejais irrepreens&iacute;veis e sinceros, filhos de Deus inculp&aacute;veis no meio duma gera&ccedil;&atilde;o corrompida e perversa, entre a qual resplandeceis como astros no mundo.&rdquo; (Filipenses 2.12-15)</span></span></li>
</ol>

      `,
    imagem: require('@/assets/images/start6.png'),
  },
  {
    titulo: 'Lição 7 - O Dizimista e Ofertante',
    videoUrl: 'https://www.youtube.com/embed/iWb4GuuPmg8?si=eDIevtRkunejqxKT',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Dizimar e ofertar n&atilde;o &eacute; obriga&ccedil;&atilde;o, mas um ato de fidelidade e gratid&atilde;o. &Eacute; tornar-se participante com Deus na obra de evangeliza&ccedil;&atilde;o no mundo. &Eacute; o privil&eacute;gio de tirar uma porcentagem de toda a renda pessoal e investir nos neg&oacute;cios de Deus aqui na terra.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. O D&Iacute;ZIMO NO ANTIGO TESTAMENTO</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Devolver o d&iacute;zimo, no Antigo Testamento, constitu&iacute;a-se em separar a d&eacute;cima parte do produto da terra e dos rebanhos para o sustento do santu&aacute;rio de Deus e dos sacerdotes.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O d&iacute;zimo nos dias de Abra&atilde;o</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A origem do ato de dizimar perde-se no tempo, sendo anterior a Mois&eacute;s. No entanto, a primeira refer&ecirc;ncia b&iacute;blica ao fato relaciona-se aos dias de Abra&atilde;o. Em Genesis 14.20 est&aacute; escrito que Abra&atilde;o pagou a um rei de nome Melquisedeque o dizimo de tudo, sendo que, neste caso, n&atilde;o foi do produto da terra nem dos rebanhos, e sim do despojo da guerra, costume tamb&eacute;m observado nos tempos antigos. Leia Hebreus 7.2, Lev&iacute;tico 27.30-34 e Deuteron&ocirc;mio 12.5-6.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O d&iacute;zimo nos dias de Mois&eacute;s</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Nos dias de Mois&eacute;s, o d&iacute;zimo passou a exercer importante papel na vida religiosa do povo israelita. Leia Deuteron&ocirc;mio 26.1-15. Desta forma, n&atilde;o s&oacute; a casa de Deus era suprida, como tamb&eacute;m mantida a tribo de Levi, respons&aacute;vel pela organiza&ccedil;&atilde;o de todas as outras tribos. Devolver o d&iacute;zimo &eacute;, portanto, sinal de um cora&ccedil;&atilde;o que reconhece o senhorio de Deus sobre todas as coisas. Por isso, Malaquias chegou a chamar de roubadores de Deus &agrave;queles que n&atilde;o pagavam os seus d&iacute;zimos. Leia Malaquias 3.8-10.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. O D&Iacute;ZIMO NO NOVO TESTAMENTO</strong></span></span></h3>
</div>

<div>
<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O d&iacute;zimo n&atilde;o ficou restrito aos tempos do Antigo Testamento. O escritor da Ep&iacute;stola aos Hebreus estabelece uma vincula&ccedil;&atilde;o direta entre esta pr&aacute;tica e o Novo Testamento quando menciona o fato de Abra&atilde;o ter pago o d&iacute;zimo de tudo a Melquisedeque. Vale lembrar, inclusive, que o mesmo autor afirma ser Cristo sumo Sacerdote segundo a ordem de Melquisedeque (Hebreus 5.10). Ora, isto quer dizer que, se a ordem &eacute; a mesma, os deveres e privil&eacute;gios continuam tamb&eacute;m os mesmos, sem altera&ccedil;&atilde;o, e isto inclui o d&iacute;zimo. Pagar o d&iacute;zimo, portanto, &eacute; dar sequ&ecirc;ncia, em Cristo, ao sacerd&oacute;cio de Melquisedeque. Leia Hebreus 7-3.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Jesus e o D&iacute;zimo</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O pr&oacute;prio Cristo n&atilde;o passou ao largo do d&iacute;zimo. Leia Mateus 23.23-24. A pr&aacute;tica do d&iacute;zimo entre os contempor&acirc;neos de Jesus tornou-se legalista e de falsa espiritualidade. Os escribas e fariseus cumpriam esta determina&ccedil;&atilde;o para serem vistos e honrados pelos homens, e n&atilde;o como fruto sincero de cora&ccedil;&otilde;es agradecidos. Era apenas apar&ecirc;ncia, nada mais. Todo o texto de Mateus 23 enfatiza este lado da arrog&acirc;ncia, da falsa religiosidade, onde a hipocrisia se reveste de justi&ccedil;a para tornar-se a gl&oacute;ria de cora&ccedil;&otilde;es in&iacute;quos e apodrecidos.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O D&iacute;zimo nas Ep&iacute;stolas</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ainda que a palavra d&iacute;zimo n&atilde;o apare&ccedil;a nos ensinos do ap&oacute;stolo Paulo, ela est&aacute; impl&iacute;cita todas as vezes em que ela admoesta sobre a contribui&ccedil;&atilde;o. Leia 1 Cor&iacute;ntios 16.2. Duas coisas aparecem no texto: as contribui&ccedil;&otilde;es eram feitas no primeiro dia da semana (domingo), proporcionalmente &agrave; prosperidade de cada um. O d&iacute;zimo &eacute; exatamente isto. Quando se paga 10%, ele sempre ser&aacute; proporcional. Em outras palavras, quanto mais o crente prospera, mais contribui. O ap&oacute;stolo tamb&eacute;m reitera o conceito de que a contribui&ccedil;&atilde;o deve ser oriunda da motiva&ccedil;&atilde;o correta. Ele afirma: &ldquo;N&atilde;o com tristeza, ou por necessidade; porque Deus ama ao que d&aacute; com alegria&rdquo;. (Leia 2 cor&iacute;ntios 9-7).</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. AS BEN&Ccedil;&Atilde;OS QUE ACOMPANHAM OS D&Iacute;ZIMOS</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>B&ecirc;n&ccedil;&atilde;os para a Igreja</strong></span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Se todos os crist&atilde;os pagassem o d&iacute;zimo n&atilde;o haveria necessidade da Igreja local lan&ccedil;ar m&atilde;o de campanhas financeiras para a execu&ccedil;&atilde;o de sua tarefa. Malaquias afirmou que o d&iacute;zimo &eacute; para que haja &ldquo;mantimento na casa do Senhor&rdquo;. Aplicando-se ao contexto de hoje, &eacute; o meio que a Igreja tem aqui na terra para realizar a evangeliza&ccedil;&atilde;o, enviar mission&aacute;rios, manter os seus funcion&aacute;rios, cuidar da assist&ecirc;ncia social, construir templos para abrigar o povo e suprir o dia- a-dia da administra&ccedil;&atilde;o.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Por exemplo: como a igreja poder&aacute; ser aben&ccedil;oada com o crescimento, se lhe faltam os recursos parar adquirir folhetos, enviar obreiros, dar suporte aos programas de evangelismo e ajudar no cuidado aos carentes da igreja e da comunidade? O d&iacute;zimo &eacute; para isto. N&atilde;o tem outra finalidade.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>&nbsp; &nbsp; Ben&ccedil;&atilde;o para quem devolve o D&iacute;zimo</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A promessa dada por Deus atrav&eacute;s de Malaquias imp&otilde;e uma condi&ccedil;&atilde;o: primeiro trazer os d&iacute;zimos, depois fazer prova do Senhor, que garante derramar ben&ccedil;&atilde;o tal, trazendo maior abastan&ccedil;a. Por&eacute;m, &eacute; preciso que fique claro: isto n&atilde;o anula as afli&ccedil;&otilde;es da vida, onde podem aparecer os momentos de sequid&atilde;o. Agora, com certeza, garante vit&oacute;ria aos que, com fidelidade em tudo, atravessam estas horas mais dif&iacute;ceis, pois a palavra de Deus jamais cai por terra.</span></span></p>
</div>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Fazer prova aqui n&atilde;o &eacute; chantagear o Senhor, mas saber que ele &eacute; rec&iacute;proco para conosco, se cumprirmos a nossa parte.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Veja algumas coisas que acontecem quando, motivado pela vis&atilde;o correta, o crente dizima:</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Sente-se recompensado por ser parte ativa na obra de Deus;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Torna-se exemplo para os demais crist&atilde;os;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Deus lhe &eacute; rec&iacute;proco em propor&ccedil;&otilde;es bem maiores</span></span></li>
</ol>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>IV. A OBRA MISSION&Aacute;RIA E A VIS&Atilde;O DA CRIEP</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Ide por todo mundo e pregai o evangelho</span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O texto de Marcos 16.15 indica que todo Crist&atilde;o que desfruta da rica oportunidade de conhecer a Cristo deve anunciar este evangelho de uma maneira &uacute;nica em ess&ecirc;ncia e m&uacute;ltipla a&ccedil;&atilde;o. Tal inspira&ccedil;&atilde;o em expandir esta boa nova recebida e anunciar esta paz, requer boa vontade dos membros da comunidade em servir. Esta sinergia &eacute; realizada quando a membresia da igreja est&aacute; engajada juntamente com a comunidade em fazer diferen&ccedil;a num mundo t&atilde;o carente e sedento de Deus. A CRIEP busca em suas atividades, dar toda estrutura e suporte para que a obra de Deus seja realizada com excel&ecirc;ncia e prud&ecirc;ncia por todos que desejam realizar esta pr&aacute;tica.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A vis&atilde;o mission&aacute;ria da CRIEP tem se amadurecido ao longo dos anos com o foco em investir em pessoas.</span></span></p>

      `,
    imagem: require('@/assets/images/start7.png'),
  },
  {
    titulo: 'Lição 8 - O Discipulo e o Espírito Santo',
    videoUrl: 'https://www.youtube.com/embed/woaRLoYujx0?si=BWyOTmylSClQDIpj',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; imposs&iacute;vel escrever sobre qualquer dos temas destas li&ccedil;&otilde;es sem fazer refer&ecirc;ncia expl&iacute;cita ou impl&iacute;cita &agrave; pessoa aos atos do Esp&iacute;rito Santo. N&atilde;o obstante, se faz necess&aacute;rio tratar deste assunto com clareza, a fim de tirar d&uacute;vidas que, porventura, existiam por parte do disc&iacute;pulo sobre a terceira pessoa da trindade. As escrituras d&atilde;o muitas provas da personalidade do Esp&iacute;rito Santo. Ele n&atilde;o &eacute; apenas uma influ&ecirc;ncia, for&ccedil;a ativa ou energia c&oacute;smica, conforme ensinam algumas religi&otilde;es; mas, sim, um com o Pai e com o Filho, ou seja, o Esp&iacute;rito Santo &eacute; Deus. Leia 1 Jo&atilde;o 5.6-7.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. A NATUREZA DO ESP&Iacute;RITO SANTO</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Provas b&iacute;blicas da Sua divindade</strong></span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Em G&ecirc;nesis 1.2 voc&ecirc; encontra a primeira refer&ecirc;ncia ao Esp&iacute;rito Santo, o qual participou ativamente da cria&ccedil;&atilde;o. O Esp&iacute;rito Santo &eacute; da mesma ess&ecirc;ncia divina que o Pai e o Filho, pois possui os mesmos atributos destes. Vejamos:</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Onipot&ecirc;ncia: </strong>Pode todas as coisas. J&oacute; 42.2;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Onisci&ecirc;ncia: </strong>Seu saber &eacute; perfeito e infinito em rela&ccedil;&atilde;o ao passado, presente e futuro. Ele &eacute; eterno: n&atilde;o tem princ&iacute;pio e nem fim. Salmos 1.39 1-4, 1 Cr 28.9;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Onipresen&ccedil;a: </strong>Conhece e sonda todos os atos e pensamentos, pois est&aacute; presente em todo lugar, de modo pleno. Salmo 139.</span></span></li>
</ol>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Provas de sua personalidade: </strong>O Esp&iacute;rito Santo &eacute; uma pessoa. Ele possui caracter&iacute;sticas e personalidade como: intelecto, vontade e sentimento. Onde se observa, claramente, a sua capacidade de examinar, conhecer e interceder. Leia Romanos 8.27 e 1 Cor&iacute;ntios 2.10,11,16.</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ele se entristece e tamb&eacute;m tem zelo de n&oacute;s. Leia Tiago 4-5. Considere, ainda, algumas atividades que atesta a personalidade do Esp&iacute;rito Santo:</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Ele revela: </strong>A B&iacute;blia, revela&ccedil;&atilde;o de Deus &agrave; humanidade, foi escrita por homens e mulheres inspiradas pelo Esp&iacute;rito Santo. Leia 2 Pedro 1.21;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Ele ensina: </strong>O Senhor Jesus afirmou aos disc&iacute;pulos que o Consolador os ensinaria todas as coisas, e os farias lembrar de tudo quanto Ele (Jesus) havia dito. Leia Jo&atilde;o 14.26;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Ele intercede: </strong>O ap&oacute;stolo Paulo disse que o Esp&iacute;rito Santo &ldquo;intercede por n&oacute;s com gemidos inexprim&iacute;veis&rdquo;. Leia Romanos 8.26;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Ordena: </strong>A igreja de Antioquia da S&iacute;ria foi a primeira a enviar obreiros ao campo mission&aacute;rio. Por&eacute;m, a ordem para isto foi dada pelo Esp&iacute;rito Santo. Leia Atos 13-2;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Testifica: </strong>Se n&atilde;o fosse uma pessoa, seu testemunho a favor de Jesus Cristo seria nulo. Leia Jo&atilde;o 15-26; 1 Jo&atilde;o 5-6,7;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Fala &agrave; igreja: </strong>Atrav&eacute;s dos ministros da Palavra e de v&aacute;rias outras maneira, Ele fala &agrave; igreja. Leia apocalipse 2.7-11, 17-29; 3.6-22;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Convida &agrave; salva&ccedil;&atilde;o: </strong>Convence o pecador a aceitar Cristo como Salvador. Leia Apocalipse 22.17.</span></span></li>
</ol>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. NOMES E S&Iacute;MBOLOS DO ESP&Iacute;RITO SANTO</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Voc&ecirc; aprendeu que o Esp&iacute;rito Santo &eacute; uma pessoa, pois possui personalidade. A ele s&atilde;o atribu&iacute;das &agrave;s mesmas qualidades inerentes ao Pai e Filho, e tamb&eacute;m, &eacute; lhe dado, de acordo com as diversas fun&ccedil;&otilde;es, v&aacute;rios nomes e s&iacute;mbolos.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Seguem alguns de seus <strong>NOMES:</strong></span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O Esp&iacute;rito de Deus: </strong>Significa que ele &eacute; &ldquo;executivo&rdquo; da divindade. Em Lucas 11.20, Jesus afirma que expulsa os dem&ocirc;nios pelo &ldquo;dedo de Deus&rdquo;;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O Esp&iacute;rito de Cristo: </strong>Este nome, conferido &agrave; terceira pessoa da Trindade, indica que o Esp&iacute;rito &eacute; enviado por Cristo para o glorificar e habitar no salvo. Romanos 8;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O Consolador: </strong>Perto de findar o Seu minist&eacute;rio terreno, o Senhor sabia que, brevemente, teria de deixar os Seus disc&iacute;pulos. Contudo, eles n&atilde;o ficariam sozinhos, pois enviaria o &ldquo;outro Consolador&rdquo;, a fim de ficar com eles para sempre. Leia 2 Cor&iacute;ntios 1.4;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O Esp&iacute;rito de verdade: </strong>O Esp&iacute;rito do engano e do erro opera no mundo, por isso, o Senhor enviou o Esp&iacute;rito de verdade para preservar os Seus das ciladas de Satan&aacute;s. 1 Jo&atilde;o 4.6;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O Esp&iacute;rito de Gra&ccedil;a: </strong>A gra&ccedil;a &eacute; concedida aos crist&atilde;os a fim de viverem em santidade e vencerem as fraquezas, pr&oacute;prias da carne. Leia 2 Cor&iacute;ntios 12.9;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O Esp&iacute;rito de vida: </strong>O poder do pecado e da morte n&atilde;o tem efeito sobre aqueles que receberam o Esp&iacute;rito de vida. Neste vers&iacute;culo, o ap&oacute;stolo Paulo afirma: &ldquo;Porque a lei do Esp&iacute;rito de vida, em Cristo Jesus, me livrou da lei do pecado e da morte&rdquo;. Leia Romanos 8.2.</span></span></li>
</ol>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Seguem alguns <strong>S&Iacute;MBOLOS:</strong></span></span></p>
</div>

<p>&nbsp;</p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Eles indicam a a&ccedil;&atilde;o divina da terceira pessoa da trindade, atrav&eacute;s dos v&aacute;rios minist&eacute;rios que as pessoas recebem de Deus. Consideremos alguns:</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Fogo: </strong>Este s&iacute;mbolo fala da a&ccedil;&atilde;o purificadora do Esp&iacute;rito Santo, na vida do crente. Ao mesmo tempo diminui a for&ccedil;a do pecado dentro de n&oacute;s; o fogo do Esp&iacute;rito assinala a presen&ccedil;a de Deus na vida do crente ao ilumin&aacute;-lo e aquec&ecirc;-lo.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Vento: </strong>No encontro com Nicodemos (Jo&atilde;o 3.8), o Senhor referiu-se &agrave; a&ccedil;&atilde;o do vento para ilustrar a opera&ccedil;&atilde;o do Esp&iacute;rito Santo na obra de regenera&ccedil;&atilde;o do Pecador. &Eacute; ele que convence a pessoa da necessidade de arrepender-se dos seus pecados e receber, pela f&eacute;, mediante a gra&ccedil;a divina, a salva&ccedil;&atilde;o consumada no sacrif&iacute;cio do Calv&aacute;rio pelo Filho de Deus. O vento simboliza a obra regeneradora do Esp&iacute;rito Santo. Tal como o vento, assim &eacute; o Esp&iacute;rito Santo. Percebe-se a Sua real opera&ccedil;&atilde;o na vida do crente e da Igreja, embora n&atilde;o se possa v&ecirc;-lo como &eacute;. Seus atos independem da vontade humana, pois Ele &eacute; Deus Soberano.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>&Aacute;gua: </strong>Em Jo&atilde;o 7.37, o Senhor Jesus identifica-se como a verdadeira fonte de &aacute;gua viva, isto &eacute;, a salva&ccedil;&atilde;o consumada por Ele e conferida aos que O aceitarem pelo Esp&iacute;rito Santo. Ele afirmou: &ldquo;Se algu&eacute;m tem sede, venha a mim e beba. Quem cr&ecirc; em mim, como diz a escritura rios de &aacute;gua viva correr&atilde;o do seu ventre.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Azeite: </strong>&Eacute; o mais conhecido dos s&iacute;mbolos atribu&iacute;dos &agrave; terceira pessoa da trindade. No Antigo Testamento, era usado para consagrar os sacerdotes e os reis de Israel. Ser ungido com o azeite significa estar revestido da autoridade de Deus para determinada tarefa espiritual ou secular. A Igreja primitiva, atrav&eacute;s dos presb&iacute;teros, ungia os enfermos, que saravam, ap&oacute;s a ora&ccedil;&atilde;o da f&eacute;. Leia Tiago 5.14-1;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Pomba: </strong>Esta ave simboliza brandura, inoc&ecirc;ncia, do&ccedil;ura, pureza, amabilidade e paz. Por ocasi&atilde;o do batismo de Jesus, o Esp&iacute;rito Santo desceu do C&eacute;u em forma corp&oacute;rea de uma pomba e pousou sobre o Filho de Deus para indicar que aquele era o Messias. Isto n&atilde;o significa que a terceira pessoa da trindade tenha esta apar&ecirc;ncia, pois, como Esp&iacute;rito, n&atilde;o possui forma que se possa definir.</span></span></li>
</ol>

<h3>&nbsp;</h3>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. AS OBRAS DO ESP&Iacute;RITO SANTO</strong></span></span></h3>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>No pecador: </strong>O Esp&iacute;rito regenera a natureza pecaminosa do homem, convence-o dos seus delitos e pecados, leva-o ao arrependimento, &agrave; confiss&atilde;o e ao abandono dos mesmos, pela f&eacute; no sacrif&iacute;cio do Filho de Deus. Deste modo, regenerado pelo Esp&iacute;rito, o pecador torna-se uma nova criatura. Leia 2 Cor&iacute;ntios 5.17;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>No Crist&atilde;o: </strong>Consola, conduz, ensina todas as coisas e lembra o que o Senhor ensinou, concede poder para testemunhar de Cristo, intercede pelos crist&atilde;os em suas ora&ccedil;&otilde;es e santifica.</span></span></li>
</ol>

      `,
    imagem: require('@/assets/images/start8.png'),
  },
  {
    titulo: 'Lição 9 - Vivendo Cheio do Espírito Santo',
    videoUrl: 'https://www.youtube.com/embed/1J4Gowxacow?si=-ut_UrvdJ9Vj6BwH',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Viver cheio do Esp&iacute;rito Santo significa ser alegre, confiante, revestido do poder de Deus. Por interm&eacute;dio desta virtude, muitos crist&atilde;os enfrentaram os perigos com muita coragem. Os que realmente s&atilde;o cheios do Esp&iacute;rito Santo, aceitaram o mart&iacute;rio, cientes de que eram bem- aventurados. Isto s&oacute; foi poss&iacute;vel porque experimentaram uma vida repleta no Esp&iacute;rito Santo.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. TODO O CRENTE RECEBE O ESP&Iacute;RITO SANTO</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">No momento da convers&atilde;o, quando voc&ecirc; aceita a Jesus como Salvador, recebe o Esp&iacute;rito Santo. Foi Ele quem, na hora da sua convers&atilde;o, atuou em seu ser para que se decidisse por Cristo. Ele lhe convenceu que era pecador e que necessitava do arrependimento para alcan&ccedil;ar o perd&atilde;o de Deus. No instante em que levantou as m&atilde;os, como sinal de aceita&ccedil;&atilde;o, voc&ecirc; sentiu uma alegria incontida. &Eacute; o momento em que a terceira pessoa da trindade passa a habitar na vida do crist&atilde;o, que se torna o templo do Deus Alt&iacute;ssimo. Leia 1 Cor&iacute;ntios 6.19.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Como promessa e garantia da salva&ccedil;&atilde;o (2 Cor&iacute;ntios 1.22), dentre as muitas fun&ccedil;&otilde;es do Esp&iacute;rito Santo e de tudo o que a B&iacute;blia diz a respeito de Sua pessoa, destaca-se o fato de ser Ele o penhor, ou seja, a garantia de nossa futura heran&ccedil;a em Cristo:</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Em cristo tamb&eacute;m v&oacute;s estais, depois que ouvistes a palavra da verdade, o evangelho da vossa salva&ccedil;&atilde;o; e, tendo nele tamb&eacute;m crido, fostes selados com o Esp&iacute;rito Santo da promessa; o qual &eacute; o penhor da nossa heran&ccedil;a, para reden&ccedil;&atilde;o da promessa de Deus, para louvor da sua gl&oacute;ria&rdquo; (Ef&eacute;sios 1.13,14). &Eacute; o Esp&iacute;rito Santo, que mediante a Palavra de Deus e por todos os meios da gra&ccedil;a, nos capacita a atingir a gl&oacute;ria eterna de Deus. Este selo &eacute; o penhor do futuro que nos aguarda aqui na terra e na eternidade.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. OQUE &Eacute; O BATISMO NO ESP&Iacute;RITO SANTO?</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1. &Eacute; uma promessa do Pai (Joel 2.28,29)</strong></span></span></p>
</div>

<div>
<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Deus fez muitas promessas ao homem, sendo o batismo no Esp&iacute;rito Santo uma delas. No passado, o Esp&iacute;rito Santo manifestava-se de uma forma espec&iacute;fica. De acordo com a necessidade, ele operava na vida dos servos de Deus. Leia Ex&ocirc;do 35.30-35. No entanto, Deus prometeu derramar o Seu Esp&iacute;rito sobre todos os homens e mulheres, para que se profetizassem, tivesse sonhos etc. O batismo no Esp&iacute;rito Santo &eacute; uma ben&ccedil;&atilde;o que est&aacute; ao alcance de todos os que creem.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.&Eacute; um revestimento do poder (Marcos 16.17,18)</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Os disc&iacute;pulos, antes do batismo no Esp&iacute;rito Santo, eram t&iacute;midos e medrosos. Inclusive, no dia da pris&atilde;o de Jesus, todos fugiram, com exce&ccedil;&atilde;o de Pedro, que acompanhou at&eacute; o local onde o Filho de Deus foi julgado. Na casa do sumo-sacerdote Caif&aacute;s, o amigo de Cristo, que prometeu segui-lo at&eacute; a morte, com medo de morrer, negou-o tr&ecirc;s vezes. No entanto, no dia de Pentecostes, revestido do Poder de Deus, quando os Judeus, atra&iacute;dos pelo barulho das l&iacute;nguas estranhas que os disc&iacute;pulos falavam, declaravam que os seguidores de Jesus estavam embriagados, Pedro respondeu: &ldquo;Var&otilde;es judeus, e todos os que habitais em Jerusal&eacute;m, seja-vos isto not&oacute;rio, e escutai as minhas palavras. Estes homens n&atilde;o est&atilde;o embriagados, como v&oacute;s pensais, sendo a terceira hora do dia. Mas isto &eacute; o que foi dito pelo profeta Joel&rdquo; (Atos 2.14- 16).</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">No t&eacute;rmino de sua mensagem, quase tr&ecirc;s mil pessoas aceitaram a Jesus como salvador. Com certeza, todos os revestidos do poder de Deus s&atilde;o mais do que vencedores.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>IV. EVID&Ecirc;NCIAS DO ESP&Iacute;RITO SANTO</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Os dons espirituais (1 Cor&iacute;ntios 12.8-10)</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">S&atilde;o os seguintes: a palavra da sabedoria, a palavra da ci&ecirc;ncia, a f&eacute;, os dons de curar, a opera&ccedil;&atilde;o de maravilhas, a profecia, o dom de discernir os esp&iacute;ritos, a variedade de l&iacute;nguas e a interpreta&ccedil;&atilde;o de l&iacute;nguas. Os dons espirituais s&atilde;o necess&aacute;rios para a edifica&ccedil;&atilde;o espiritual e o crescimento da Igreja. S&atilde;o concedidos gratuitamente e devem ser utilizados, tamb&eacute;m, de gra&ccedil;a. N&oacute;s o recebemos mediante o nosso pedido a Deus. Se voc&ecirc; deseja um ou mais destes dons, comece a busc&aacute;-los ainda hoje, com f&eacute; e o Senhor lhe conceder&aacute;.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Obs: outras passagens b&iacute;blicas nos apresentam outros dons, por&eacute;m voc&ecirc; os conhecer&aacute; no CDV (Curso de Despertamento Vocacional).</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.O fruto do Esp&iacute;rito (G&aacute;latas 5.22)</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">No momento da regenera&ccedil;&atilde;o, o novo homem passa a ter a mente de Cristo e a produzir o fruto do Esp&iacute;rito, que podemos comparar a uma mexerica com nove gomos, cujo nomes diferem um dos outros. S&atilde;o eles: amor, gozo, paz, longanimidade, benignidade, bondade, f&eacute;, mansid&atilde;o e dom&iacute;nio pr&oacute;prio. N&atilde;o s&atilde;o diversos frutos, mas um s&oacute;, constitu&iacute;dos por nove virtudes diferentes. Jesus orou esta sublime ora&ccedil;&atilde;o: &ldquo;porque pelo fruto se conhece a &aacute;rvore&rdquo; (Mateus 12.33). Isto significa dizer que se conhece a pessoa que realmente nasceu de novo, quando ela produz o fruto do Esp&iacute;rito, manifestado nas nove virtudes que lhe s&atilde;o peculiares.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Obs: Se a pessoa n&atilde;o souber canalizar os dons espirituais a favor da constru&ccedil;&atilde;o do fruto do Esp&iacute;rito, correr&aacute; o risco de perder a salva&ccedil;&atilde;o. Leia Mateus 7.22</span></span></p>
</div>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>V. O ESP&Iacute;RITO SANTO COMO L&Iacute;DER</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Ensina todas as coisas (Jo&atilde;o 14.26)</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Jesus declarou aos disc&iacute;pulos que eles seriam odiados e levados aos tribunais por causa de Seu nome, mas que eles n&atilde;o deviam se preocupar, pois o Esp&iacute;rito Santo lhes ensinaria tudo o que deveriam responder aos seus inimigos. Hoje tamb&eacute;m, o Esp&iacute;rito Santo nos ensina. Por n&oacute;s mesmos, nada sabemos falar. Mas quando abrirmos a nossa boca, a terceira pessoa da trindade nos enche de sabedoria e gra&ccedil;a, para pregarmos o evangelho de Cristo.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Santifica-nos (2 Tessalonicenses 2.13)</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O Esp&iacute;rito Santo &eacute; quem nos regenera. A partir do momento em que aceitamos a Jesus, ele inicia o processo de santifica&ccedil;&atilde;o. Logo ap&oacute;s o novo nascimento, come&ccedil;amos a crescer espiritualmente at&eacute; chegarmos a estatura de var&otilde;es perfeitos (Ef&eacute;sios 4-13). Realmente, as tr&ecirc;s pessoas da trindade s&atilde;o respons&aacute;veis pela salva&ccedil;&atilde;o da humanidade: o Pai enviou o Filho. Este, por sua morte, redimiu-nos, e o Esp&iacute;rito Santo tem a incumb&ecirc;ncia de nos santificar. Quando pecamos, sentimos, por interm&eacute;dio dEle, a nossa culpa. Nos arrependemos as nossas faltas, e Ele purifica-nos de todo o pecado por interm&eacute;dio do sangue de Jesus.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3.Dirige a Igreja (Jo&atilde;o 16.13)</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">No dia de Pentecostes, o Esp&iacute;rito Santo assumiu a dire&ccedil;&atilde;o da Igreja. Com a sua infinita sabedoria, Ele dirige os passos da eleita de Cristo desde a sua funda&ccedil;&atilde;o, e dirigir&aacute; at&eacute; o dia do arrebatamento. No decorrer deste tempo, Satan&aacute;s investe contra a Noiva do cordeiro, mas jamais foi ou ser&aacute; bem sucedido, muito pelo contr&aacute;rio, as portas do inferno n&atilde;o prevalecem e nunca&nbsp;&nbsp;&nbsp; prevalecer&atilde;o&nbsp;&nbsp;&nbsp; contra&nbsp;&nbsp;&nbsp; a&nbsp;&nbsp;&nbsp; igreja.&nbsp;&nbsp;&nbsp; Leia&nbsp;&nbsp;&nbsp; Mateus&nbsp;&nbsp;&nbsp; 16.18</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Por isso, viver cheio do Esp&iacute;rito Santo significa ser dirigido pela terceira pessoa da trindade, com a certeza de que o crente marcha para a gl&oacute;ria, seguro e confiante que chegar&aacute; ao c&eacute;u, pois n&atilde;o &eacute; conduzido por simples seres humanos, mas por uma pessoas divina.</span></span></p>

<p style="margin-left:14.25pt">&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>#Dicas</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Nos dias atuais, viver cheio do Esp&iacute;rito Santo de Deus &eacute; mais do que uma necessidade. E a promessa do revestimento de poder est&aacute; &agrave; disposi&ccedil;&atilde;o de todos os que creem. Frequente os cultos, as reuni&otilde;es de ora&ccedil;&otilde;es, as vig&iacute;lias, e quando voc&ecirc; menos esperar, ser&aacute; cheio do Esp&iacute;rito Santo;</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ap&oacute;s receber esta ben&ccedil;&atilde;o, uma promessa de Deus para todos os que aceitam a Jesus como salvador, voc&ecirc; deve buscar diligentemente os dons espirituais, a fim de que seja um instrumento nas m&atilde;os de Deus para a edifica&ccedil;&atilde;o da Igreja;</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Cultive tamb&eacute;m o fruto do Esp&iacute;rito para que seus atos venham provas a todos que voc&ecirc; &eacute; uma nova criatura possuidora da natureza de Cristo.</span></span></p>

      `,
    imagem: require('@/assets/images/start9.png'),
  },
  {
    titulo: 'Lição 10 - Os dons do Espírito Santo',
    videoUrl: 'https://www.youtube.com/embed/ygEdcGRtvdY?si=8Uu12szTbR4sVWv5',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Os dons espirituais formam a base do crescimento espiritual e capacita o crente para o servi&ccedil;o na obra de Deus. Seu exerc&iacute;cio &eacute; fundamental, tanto na adora&ccedil;&atilde;o como na edifica&ccedil;&atilde;o da Igreja. S&atilde;o eles: Palavra de Sabedoria, Palavra de Ci&ecirc;ncia, Discernimento dos esp&iacute;ritos, Cura, Opera&ccedil;&atilde;o de Maravilhas, F&eacute;, Variedades de L&iacute;nguas, Interpreta&ccedil;&atilde;o de L&iacute;nguas e Profecia.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Segue uma breve explica&ccedil;&atilde;o de cada dom:</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Palavra da Sabedoria</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Muitas pessoas no mundo s&atilde;o conhecedoras de muitos assuntos, por&eacute;m poucas conseguem transformar conhecimento acumulado em falas e pr&aacute;ticas s&aacute;bias em sua vida e na vida dos outros.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A Palavra da Sabedoria &eacute; o dom dado pelo Esp&iacute;rito que capacita o crente a perceber, falar e agir de maneira que agrada a Deus e beneficia o pr&oacute;ximo. Leia Tiago 3.17 e 1 Cor&iacute;ntios 2.6-8.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Palavra de Ci&ecirc;ncia/ Conhecimento</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Esse dom capacita o crist&atilde;o a absorver conceitos profundos da Palavra de Deus. Conceitos esses que nem todos conseguem ao longo da caminhada crist&atilde;.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Observa&ccedil;&atilde;o: As Palavras de Ci&ecirc;ncia e de Sabedoria se completam.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3.Discernimento dos esp&iacute;ritos</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; uma capacita&ccedil;&atilde;o sobrenatural que permite conhecermos o car&aacute;ter dos esp&iacute;ritos. Ajuda o crente a separar o falso do verdadeiro, o puro do impuro, o santo do pecador. Leia 1 Jo&atilde;o 4.1.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">No Novo Testamento, este dom se manifesta revelando os esp&iacute;ritos maus e enganadores dos &uacute;ltimos tempos. Em Atos 16.16-18, Paulo enfrentou uma situa&ccedil;&atilde;o na qual precisou discernir os esp&iacute;ritos. Ele conheceu a origem de uma bajula&ccedil;&atilde;o e expulsou o dem&ocirc;nio em nome de Jesus Cristo. Os Crist&atilde;os precisam exercer este dom na atualidade, pois a cada dia mais esp&iacute;ritos vindo de Satan&aacute;s est&atilde;o presentes na sociedade.</span></span></p>
</div>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>4.Cura</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Os Dons de Cura s&atilde;o concedidos como uma solu&ccedil;&atilde;o divina capaz de amenizar o sofrimento humano, atrav&eacute;s da f&eacute; em Jesus Cristo. Existe uma limita&ccedil;&atilde;o por parte de alguns crist&atilde;os por acharem que esse dom est&aacute; relacionado apenas quando uma cura f&iacute;sica acontece. &Eacute; necess&aacute;rio entendermos que Deus pode curar o f&iacute;sico, mas o desejo dele sobre a humanidade &eacute; tamb&eacute;m curar o interior.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>5.Opera&ccedil;&atilde;o de Maravilhas</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Esse dom, tamb&eacute;m chamado de opera&ccedil;&atilde;o de milagres, prod&iacute;gios e sinais, se constitui em manifesta&ccedil;&atilde;o especiais do poder de Deus que superam as limita&ccedil;&otilde;es humanas. S&atilde;o superiores e inexplic&aacute;veis. Na opera&ccedil;&atilde;o dos poderosos sinais que envolvem os milagres, o supremo Senhor, apenas usa da forma que Ele quer as leis e for&ccedil;as por Ele mesmo criadas em socorro dos Seus filhos. Isso &eacute; milagre. Leia Atos 2.9-12.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>6.F&eacute;</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O dom da f&eacute; &eacute; uma capacita&ccedil;&atilde;o especial que o Esp&iacute;rito Santo d&aacute; a alguns crentes para exercer a f&eacute; al&eacute;m dos limites naturais: Manifestam-se em grandes confian&ccedil;as, grandes peti&ccedil;&otilde;es que geralmente s&atilde;o respondidas quando s&atilde;o produto desse dom, sempre em benef&iacute;cio da Igreja de Jesus Cristo. Leia 1 Co. 12.7-10. Ela se difere da F&eacute; Salvadora, que se manifesta como resposta da proclama&ccedil;&atilde;o do evangelho, e tamb&eacute;m da F&eacute; como Fruto do Esp&iacute;rito, que melhor traduzida seria &ldquo;fidelidade&rdquo;, pois esse fruto desenvolve a fidelidade e confian&ccedil;a que todos precisamos ter em Deus, como veremos na pr&oacute;xima aula.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>7.Variedades de L&iacute;nguas</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A B&iacute;blia faz men&ccedil;&atilde;o de Variedade de L&iacute;nguas. Para esse dom edificar a igreja, &eacute; necess&aacute;rio haver interpreta&ccedil;&atilde;o; caso contr&aacute;rio, somente a pessoa que fala se edificar&aacute;.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>8.Interpreta&ccedil;&atilde;o de L&iacute;nguas</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O Dom de Interpreta&ccedil;&atilde;o, portanto, complementa o Dom de L&iacute;nguas para que toda a igreja venha ser edificada. Leia 1 Co 14.13, 18, 28, 39, 40.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>9.Profecia</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Profetizar, como dom, &eacute; falar aos homens em nome de Deus, com a finalidade de edificar, exortar e consolar. Leia 1 Cor&iacute;ntios 14.3. O que fala em l&iacute;nguas, fala a Deus, a n&atilde;o ser que haja int&eacute;rprete; o que profetiza fala da parte de Deus aos homens e mulheres. De todos os dons, a profecia &eacute; o &uacute;nico sujeito ao julgamento da igreja. Leia 1 Cor&iacute;ntios 14.29. O Dom de Profecia n&atilde;o &eacute; um m&eacute;todo humano de adivinhar a sorte, de prever o futuro nem de tornar realidade os desejos dos crist&atilde;os. Leia 1 Cr&ocirc;nicas 17.1-4 e 1 Cor&iacute;ntios 14.</span></span></p>

<table align="left" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td>
			<p style="text-align: center;"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Dicas!&nbsp;</strong></span></span></p>

			<ol>
				<li><span style="color:#FFFFFF"><span style="font-size:18px">Ore a Deus, e pe&ccedil;a dons a Ele;</span></span></li>
				<li><span style="color:#FFFFFF"><span style="font-size:18px">Pe&ccedil;a a Deus para ser usado por Ele, mas lembre-se que o exerc&iacute;cio dos dons espirituais n&atilde;o o torna um &ldquo;super-crente&rdquo;, nem mais santo do que os outros.</span></span></li>
			</ol>
			</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
	</tbody>
</table>

      `,
    imagem: require('@/assets/images/start10.png'),
  },
  {
    titulo: 'Lição 11 - O Fruto do Espírito',
    videoUrl: 'https://www.youtube.com/embed/8DyAAH2Mv_k?si=tU_PrNElZudDek2-',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O Fruto do Esp&iacute;rito possibilita o crist&atilde;o aut&ecirc;ntico a viver de modo &iacute;ntegro diante de Deus e da humanidade. Naturalmente, a pessoa n&atilde;o consegue obter esta condi&ccedil;&atilde;o por esfor&ccedil;o pr&oacute;prio. O &ldquo;fruto&rdquo; de G&aacute;latas 5.22, conceituado como &ldquo;express&otilde;es do car&aacute;ter crist&atilde;o&rdquo;, est&aacute; no singular provavelmente por tratar-se de uma &uacute;nica not&aacute;vel virtude implantada pelo Esp&iacute;rito Santo de uma s&oacute; vez no crente. &Eacute; atrav&eacute;s do Fruto do Esp&iacute;rito que o crist&atilde;o participa em parte da natureza divina.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. A NATUREZA DO FRUTO DO ESP&Iacute;RITO</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O que representa e em que consiste o Fruto do Esp&iacute;rito na vida do Crente?</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O Fruto do Esp&iacute;rito consiste nas nove virtudes ou qualidades da personalidade de Deus implantadas pelo Esp&iacute;rito da verdade no interior do crente com a finalidade de conduzi-lo &agrave; maturidade, ou seja, &agrave; imagem de Cristo. Em suma, o Fruto do Esp&iacute;rito representa os atributos de Deus; os tra&ccedil;os do Seu car&aacute;ter. O crente precisa absorv&ecirc;-lo com a ajuda do Esp&iacute;rito Santo.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O car&aacute;ter crist&atilde;o verdadeiro expressa-se no Fruto do Esp&iacute;rito que &eacute; resumido no amor. Do amor, surgem todos os demais atributos de Deus que s&atilde;o desenvolvidos no crente pelo Esp&iacute;rito Santo que nele habita. &Eacute; por isso que o amor aparece encabe&ccedil;ando a lista das virtudes crist&atilde;s geradas pelo Esp&iacute;rito de Deus, por ser a fonte origin&aacute;ria de todas as demais virtudes.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O Esp&iacute;rito Santo produz o fruto do car&aacute;ter crist&atilde;o em nossa vida &agrave; medida que cooperamos com Ele. As l&iacute;nguas, a profecia, e at&eacute; mesmo o conhecimento s&atilde;o &uacute;teis, e s&atilde;o dons maravilhosos do Esp&iacute;rito Santo, mas sua presen&ccedil;a em nossa vida nem sempre &eacute; uma indica&ccedil;&atilde;o de nossa maturidade crist&atilde;. A medida de nossa maturidade em Deus depende de qu&atilde;o bem temos permitido que o Esp&iacute;rito Santo produza os tra&ccedil;os do car&aacute;ter de Jesus em nossas vidas. A maturidade espiritual envolve melhor entendimento do Esp&iacute;rito de Deus e das necessidades das pessoas. O Fruto do Esp&iacute;rito &eacute; o resultado na vida dos que participam da natureza divina, ou seja, dos que est&atilde;o ligados a Cristo, a Videira verdadeira. Leia Jo&atilde;o 15.1-5.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Baseado em Jo&atilde;o 15, a maturidade em Cristo envolve:</span></span></p>

<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Uni&atilde;o;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Limpeza ou a poda;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Frutifica&ccedil;&atilde;o.</span></span></li>
</ol>
</div>

<p>&nbsp;</p>

<div>
<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. VIRTUDES OU QUALIDADES DO FRUTO DO ESP&Iacute;RITO</strong></span></span></h3>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Amor - </strong>A palavra &ldquo;caridade ou &ldquo;amor&rdquo; neste trecho das Escrituras &eacute; a tradu&ccedil;&atilde;o da palavra grega &aacute;gape. Este &eacute; o amor que flui diretamente de Deus: &ldquo;O amor de Deus est&aacute; derramado em nossos cora&ccedil;&otilde;es pelo Esp&iacute;rito Santo que nos foi dado.&rdquo; (Romanos 5.5). &Eacute; um amor de tamanha profundidade que levou Deus a dar seu &uacute;nico Filho como sacrif&iacute;cio pelos nossos pecados (Jo&atilde;o 3.16). &Eacute; o amor de Jesus por n&oacute;s: &ldquo;conhecemos o amor nisto: que Ele deu a Sua vida por n&oacute;s, e n&oacute;s devemos dar a nossa pelos irm&atilde;os.&rdquo; Leia Jo&atilde;o 3.16; 15.11 -15. &Eacute; muito f&aacute;cil amar os seus entes queridos, como os pais, filhos, esposos, parentes, amigos etc. Mas somente pelo Esp&iacute;rito Santo voc&ecirc; &eacute; capaz de dedicar o amor aos seus inimigos de tal forma que lhes deseje o bem e perdoe as suas ofensas de todo o cora&ccedil;&atilde;o.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Gozo ou Alegria - </strong>Trata-se daquela qualidade resultante de um senso de bem-estar, sobretudo de um bem-estar espiritual, por causa de uma correta rela&ccedil;&atilde;o com Deus. Apesar das dificuldades financeiras, das enfermidades, das cal&uacute;nias, pela atua&ccedil;&atilde;o do Esp&iacute;rito Santo, o crente est&aacute; cheio de gozo em sua alma, como os ap&oacute;stolos Paulo e Silas, presos injustamente por causa do evangelho. Em vez de murmurarem, cantavam e oravam. Leia Atos 16.25.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Paz &ndash; </strong>Trata-se de uma qualidade espiritual produzida pela reconcilia&ccedil;&atilde;o, pelo perd&atilde;o dos pecados e pela convers&atilde;o da alma transformada segundo a imagem de Cristo (Romanos 12.18). A queda do homem e da mulher no pecado destruiu a paz com Deus, com outros homens e mulheres, com o pr&oacute;prio ser, com a pr&oacute;pria consci&ecirc;ncia. Foi por meio da instrumentalidade da cruz que Deus voltou a estabelecer a paz. Leia Colossenses 1.20 e Ef&eacute;sios 4.2-3.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Longanimidade &ndash; </strong>Essa palavra significa ter a habilidade de ser paciente. Essa qualidade &eacute; atribu&iacute;da a Deus. Ele tem tolerado pacientemente todas as iniquidades da humanidade. N&atilde;o se deixando levar pela ira nem pelo furor; n&atilde;o usando sua justa indigna&ccedil;&atilde;o. De n&oacute;s, os crist&atilde;os, &eacute; esperado que em nossas rela&ccedil;&otilde;es com os outros se caracterizem pela longanimidade do mesmo modo que Deus tem agido conosco. Leia 2 Co 6.6; Cl 1.11;</span></span></li>
</ol>

<p style="margin-left:50.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">3.12. Tg 1.19-20.</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Benignidade - </strong>Benignidade no original grego significa ter &ldquo;honestidade&rdquo; ou, em outras tradu&ccedil;&otilde;es, ter a inten&ccedil;&atilde;o de fazer o bem. Infelizmente muitos fazem o bem, por&eacute;m n&atilde;o tem a inten&ccedil;&atilde;o de faz&ecirc;-lo. Deus &eacute; a fonte dessa qualidade e Cristo &eacute; o melhor exemplo. Ele foi uma pessoa imensamente bem-intencionada conforme o evangelho o retrata. Essa virtude torna o crente benigno, desejoso do bem a todos, principalmente para os seus inimigos. Pv. 25.21</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Bondade - </strong>Ser bondoso &eacute; faz o bem. &Eacute; aquele que consegue canalizar toda inten&ccedil;&atilde;o boa numa pr&aacute;tica melhor ainda. Significa ser bom para todos, sem acep&ccedil;&atilde;o de pessoas. Leia Tiago 4.17</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>F&eacute; &ndash; </strong>No original grego significa tanto &ldquo;confian&ccedil;a&rdquo; quanto &ldquo;fidelidade&rdquo;. A f&eacute;, aqui, indica a confian&ccedil;a em Jesus Cristo. Mediante esta qualidade do fruto, podemos alcan&ccedil;ar a medida total da plenitude de Cristo (Ef&eacute;sios 4.13). &Agrave; medida que esse fruto amadurece em n&oacute;s, nossa confian&ccedil;a em Deus &eacute; fortalecida. &Eacute; a certeza de que Deus existe e est&aacute; sempre conosco para nos dar a vit&oacute;ria. Hb 11.6</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Mansid&atilde;o &ndash; </strong>Trata-se de uma submiss&atilde;o do homem para com Deus e, em seguida, para com o pr&oacute;prio homem. A mansid&atilde;o &eacute; o resultado da verdadeira humildade, que nos leva ao reconhecimento do valor alheio e a recusa de nos considerarmos superiores. Jesus</span></span></li>
</ol>
</div>

<p>&nbsp;</p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px">disse: &ldquo;Bem aventurados os mansos, porque eles herdar&atilde;o a terra&rdquo; (Mateus 5.5). Essa virtude torna voc&ecirc; manso e calmo, quando antes era agressivo e se irava por qualquer coisa que o contrariava.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;i)Temperan&ccedil;a ou Dom&iacute;nio Pr&oacute;prio</span></span></h3>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l) Nas palavras- </strong>H&aacute; um ditado popular que afirma: &ldquo;N&atilde;o devemos falar o que sabemos, mas sim, saber o que falamos&rdquo;. Isto &eacute; o que se pode chamar de temperan&ccedil;a, dom&iacute;nio pr&oacute;prio. Leia Tiago 3.2</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll) Nas a&ccedil;&otilde;es - </strong>Quatro jovens judeus, levados cativos para a babil&ocirc;nia, foram escolhidos por Nabucodonosor para realizarem um curso e depois servirem ao governo caldeu. O rei ordenou que os alimentasse com todas as iguarias da mesa real. Daniel e seus companheiros propuseram algo em seus cora&ccedil;&otilde;es (Leia Dan 1.8). Solicitaram, ent&atilde;o, ao despenseiro que lhes fornecesse apenas legumes durante dez dias. Se ap&oacute;s este per&iacute;odo seus semblantes estivessem abatidos, aceitariam o manjar do rei. No entanto, se apresentassem bom estado de sa&uacute;de, continuariam com a refei&ccedil;&atilde;o escolhida por eles at&eacute; o final daquele treinamento.</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px">Ap&oacute;s aquele per&iacute;odo de dez dias, seus semblantes eram melhores do que os dos demais jovens. Por isso continuaram com aquela alimenta&ccedil;&atilde;o &agrave; base de legumes at&eacute; o final do curso. Esta &eacute; uma demonstra&ccedil;&atilde;o de for&ccedil;a de vontade, temperan&ccedil;a e sobriedade dos quatro Judeus.</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll) Nos pensamentos &ndash; </strong>Por falta de dom&iacute;nio pr&oacute;prio, Davi cedeu &agrave; tenta&ccedil;&atilde;o que o naufragou no pecado e o fez pagar as consequ&ecirc;ncias pelo resto da vida. Era a &eacute;poca em que os reis sa&iacute;am para a guerra. No entanto, ele passeava no terra&ccedil;o de sua casa real. Seu pensamento vagava distante, em busca de algo que satisfizesse o seu ego. Repentinamente, deparou-se com uma cena que o devorou, como uma labareda de fogo a consumir algo inflam&aacute;vel: uma mulher banhava-se, nua, no quintal de sua casa. A chama da sensualidade acendeu o desejo incontido no cora&ccedil;&atilde;o do rei de Israel de possu&iacute;- la. Quando percebeu o que fizera, j&aacute; era tarde demais: havia se deitado com ela e tinha ordenado a morte do seu marido. Tudo isso aconteceu por falta do autocontrole do pensamento que o levou a cometer aquela loucura. Leia 2 Samuel 11.1-4.</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px">O crente deve sempre ocupar-se com coisas boas. E a melhor terapia &eacute; ler a B&iacute;blia, cantar hinos de louvor ao Senhor, visitar os novos convertidos, desviados e enfermos. A palavra de Deus tamb&eacute;m nos recomenda que devemos fugir da apar&ecirc;ncia do mal (leia 1 Tassalonicenses 5.22). S&oacute; assim venceremos as tenta&ccedil;&otilde;es e manteremos a nossa vontade carnal. Onde voc&ecirc; estiver, pense nas coisas celestiais e viva com Jesus, vitoriosamente.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>DISCIPULADO</strong></span></span></h2>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O fruto do Esp&iacute;rito n&atilde;o &eacute; produzido na vida de algu&eacute;m que vive de qualquer maneira. O crist&atilde;o precisa dedicar-se &agrave; ora&ccedil;&atilde;o, ao estudo da Palavra de Deus e passar por v&aacute;rias provas para alcan&ccedil;ar o seu crescimento espiritual. H&aacute; um pre&ccedil;o a ser pago para alcan&ccedil;&aacute;-lo, mas a alegria &eacute; imensur&aacute;vel e lhe sustenta at&eacute; a sua partida, ao encontro de Cristo.</span></span></p>

      `,
    imagem: require('@/assets/images/start11.png'),
  },
  {
    titulo: 'Lição 12 - Escatologia',
    videoUrl: 'https://www.youtube.com/embed/EHa57aT2WWE?si=Q8TnSbsSdVTNMYCB',
    descricao:
      `
      <div>
<h1><span style="font-size:18px"><span style="color:#FFFFFF">INTRODU&Ccedil;&Atilde;O</span></span></h1>

<p style="margin-left:14.25pt"><span style="font-size:18px"><span style="color:#FFFFFF">A Escatologia &eacute; uma palavra de origem grega, formada pelos termos <strong>escato </strong>(&uacute;ltimo) <strong>logia (</strong>estudo), significando, portanto, estudo das &uacute;ltimas coisas, dos &uacute;ltimos acontecimentos. Assim, quando estudamos e falamos &ldquo;NO POR VIR&rdquo;, estamos estudando sobre Escatologia B&iacute;blica. Desse modo, estamos falando e estudando sobre o fim das coisas que nos s&atilde;o compreendidas e percebidas, em especial a vida humana, corpo, alma e esp&iacute;rito, e at&eacute; mesmo sobre a natureza e nosso planeta.</span></span></p>

<p>&nbsp;</p>

<h3><span style="font-size:18px"><span style="color:#FFFFFF">l. COMO E PORQUE CREMOS ASSIM</span></span></h3>

<ol style="list-style-type:lower-alpha">
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>ARREBETAMENTO </strong>&ndash; Cremos na vinda pessoal do Senhor Jesus Cristo, sendo esta vinda iminente para arrebatar a Sua Noiva (A Igreja) &ndash; (l Tessalonicenses 4.13-18, l Cor&iacute;ntios 15.51- 52), e, este acontecimento, denominamos de arrebatamento, que significa retirada &agrave; for&ccedil;a algo ou algu&eacute;m que est&aacute; sob uma determinada condi&ccedil;&atilde;o ou posse para si (Jo&atilde;o 14.1-3).</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>MOMENTO DO ARREBATAMENTO &ndash; </strong>Cremos que o momento n&atilde;o deve ser nossa preocupa&ccedil;&atilde;o maior, mas, sim estarmos preparados (Mateus 24.36-44). Contudo, cremos que devemos observar os sinais apontados pelo Senhor Jesus Cristo, que seriam os sinalizadores que indicariam que a sua volta estaria pr&oacute;xima (eventos clim&aacute;ticos, terremotos, maremotos, cataclismos; guerras e rumores de guerras entre na&ccedil;&otilde;es &ldquo;Mateus 24.6-7&rdquo; &ndash; apostasias e prolifera&ccedil;&atilde;o de credos). Lucas 18.8, parte b, Mateus 24.10-12, l Tim&oacute;teo 4.1.</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>QUEM PARTICIPAR&Aacute; DO ARREBATAMENTO </strong>&ndash; Cremos que participar&aacute; do arrebatamento todos os crentes fi&eacute;is ao Senhor, que esteja eles vivos ou mortos (l Tessalonicenses 4:16-17; l Cor&iacute;ntios 15:51-52; Mateus 10:32; Romanos 10:9-10).</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>NOSSAS LEMBRAN&Ccedil;AS NO C&Eacute;U &ndash; </strong>Cremos que no c&eacute;u, teremos consci&ecirc;ncia sim, por&eacute;m, este estado de consci&ecirc;ncia n&atilde;o nos trar&aacute; sentimentos corrupt&iacute;veis (bons ou maus), pois seremos transformados fisiol&oacute;gica e psicologicamente (ll Cor&iacute;ntios 5:10; Mateus 17:1-6, 22:23- 32; l Cor&iacute;ntios 15:51-54). Este estado intermedi&aacute;rio &eacute; tempor&aacute;rio, pois o apogeu da esperan&ccedil;a crist&atilde; n&atilde;o &eacute; o C&eacute;u, mas nos Novos C&eacute;us e Nova Terra em corpos ressurretos.</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>ESTADO ATUAL DOS QUE MORRERAM NO SENHOR &ndash; </strong>Cremos que os que</span></span></li>
</ol>

<p style="margin-left:14.25pt"><span style="font-size:18px"><span style="color:#FFFFFF">morreram no Senhor Jesus Cristo, embora separados do corpo f&iacute;sico, est&atilde;o presente com Ele, desfrutando da gl&oacute;ria eterna, (Lucas 23.43; ll Cor&iacute;ntios 5.8), est&atilde;o aguardando a ressurrei&ccedil;&atilde;o, momento em que corpo f&iacute;sico, alma e esp&iacute;rito se unir&atilde;o e, por conseguinte transformados pelo Seu poder e pelo resplendor da Sua gl&oacute;ria (Filipenses 3.21, l Tessalonicenses 4.16-17, l Cor&iacute;ntios 15.51-52).</span></span></p>
</div>

<ol style="list-style-type:lower-alpha">
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>TRIBUNAL DE CRISTO - </strong>Cremos que ap&oacute;s o arrebatamento da Igreja pelo Senhor Jesus Cristo, aqueles que foram arrebatados estar&atilde;o com Ele em um momento muito especial, e este momento &eacute; o Tribunal de Cristo (ll Cor&iacute;ntios 5.10). O Tribunal de Cristo ser&aacute; t&atilde;o somente para presta&ccedil;&atilde;o de contas quanto ao que recebemos do Senhor e realizamos em seu Nome pela f&eacute;, pelo Seu Reino, e posteriormente seremos galardoados/recompensados (l Cor&iacute;ntios 3.10-14), contudo, este Tribunal n&atilde;o ter&aacute; o cond&atilde;o de condena&ccedil;&atilde;o, pois, estes, j&aacute; tem a garantia de que n&atilde;o sofrer&atilde;o o dano da segunda morte (Apocalipse 2.11, 20.6).</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>A GRANDE TRIBULA&Ccedil;&Atilde;O (ANG&Uacute;STIA DE JAC&Oacute;) </strong>&ndash; Cremos que haver&aacute; um per&iacute;odo de grande sofrimento, chamado a grande tribula&ccedil;&atilde;o, conforme (Jeremias 30.7-8; Daniel 9.27; Mateus 24.21; Apocalipse 12.6). Cremos que a &ldquo;Grande Tribula&ccedil;&atilde;o&rdquo; ser&aacute; um per&iacute;odo que a B&iacute;blia diz ser temporal, e de 7(sete) anos (Daniel 9.29 e Apocalipse 13.5), e, em seu desenrolar muitas coisas haver&atilde;o de acontecer (levante do Anticristo e marca&ccedil;&atilde;o de seus adoradores &ldquo;Apocalipse 13.11-18); reten&ccedil;&atilde;o da morte &ldquo;Apocalipse 9.6&rdquo;; etc.), que sofrimento igual nunca houve e jamais haver&aacute; depois. (Apocalipse 3.10, l Tessalonicenses 4 e 5.1-11 e ll Tessalonicenses 2, l Cor&iacute;ntios 15.51-52).</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>SOBRE O MIL&Ecirc;NIO &ndash; </strong>Cremos que o Mil&ecirc;nio ser&aacute; o per&iacute;odo em que o Senhor Jesus Cristo reinar&aacute; sobre a terra restaurando-a completamente (Apocalipse 20.1-6 e Isa&iacute;as 60). Cremos que durante o Mil&ecirc;nio a Igreja e todos os que participaram do arrebatamento estar&atilde;o reinando com Cristo por todo o per&iacute;odo do Reino Milenar (Apocalipse 20.4). Cremos que durante o Mil&ecirc;nio, Satan&aacute;s estar&aacute; preso sem nenhum poder de atua&ccedil;&atilde;o e influ&ecirc;ncia sobre a Humanidade (Apocalipse 20.1-3). Cremos que ap&oacute;s o Mil&ecirc;nio, Satan&aacute;s ser&aacute; solto por pouco tempo e tentar&aacute; mais uma vez a humanidade (Gogue e Magogue), por&eacute;m, ser&aacute; derrotado e lan&ccedil;ado no lago de fogo e enxofre com todos os que o seguiram (Apocalipse 20.7-10) para todo o sempre.</span></span></li>
</ol>

<ol style="list-style-type:lower-alpha">
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>SOBRE O JU&Iacute;ZO FINAL (JULGAMENTO DOS &Iacute;MPIOS) -&nbsp; </strong>Cremos que todos os</span></span></li>
</ol>

<p style="margin-left:14.25pt"><span style="font-size:18px"><span style="color:#FFFFFF">mortos desde o momento da queda homem (G&ecirc;nesis 3.1-19) ser&atilde;o julgados pelos escritos no livro das obras (Apocalipse 20.12-13), bem como aqueles que rejeitaram o perd&atilde;o em nosso Senhor Jesus Cristo e n&atilde;o foram encontrados seus nomes no Livro da Vida (Apocalipse 20.15).</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>SOBRE&nbsp; A&nbsp; ETERNIDADE,&nbsp; O&nbsp; &ldquo;ESTADO&nbsp; ETERNO&rdquo;&nbsp; &ndash;&nbsp; </strong>Cremos&nbsp; que&nbsp; ap&oacute;s&nbsp; o</span></span></li>
</ol>

<p style="margin-left:14.25pt"><span style="font-size:18px"><span style="color:#FFFFFF">Arrebatamento, ap&oacute;s a Grande Tribula&ccedil;&atilde;o, ap&oacute;s a Guerra de Armagedom, ap&oacute;s o Reino Milenar, ap&oacute;s a soltura e lan&ccedil;amento de Satan&aacute;s no Lago de Fogo e Enxofre, haver&aacute; Novos C&eacute;us e Nova Terra, ent&atilde;o ocorrer&aacute; o Estado Eterno. Cremos que no Estado Eterno n&atilde;o mais haver&aacute; qualquer tipo de corrup&ccedil;&atilde;o, pois, para sempre e eternamente, a presen&ccedil;a de Deus estar&aacute; conosco, na Cidade Santa a Nova Jerusal&eacute;m que foi Preparada por Deus para os seus filhos fi&eacute;is e a ali viveremos eternamente (Apocalipse 20-21).</span></span></p>

      `,
    imagem: require('@/assets/images/start12.png'),
  },

];

const cdv: Aula[] = [
  {
    titulo: 'Lição 1 - CDV: Visão e Pilares',
    videoUrl: 'https://www.youtube.com/embed/MkRQqATogCU?si=k2y1mzA92MtZTIrc',
    descricao:
      `
      <div>
<p><span style="color:#FFFFFF"><span style="font-size:18px">CLASSE</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">PERFIL</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">RESET</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para quem deseja se batizar</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">START</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para os batizados que v&ecirc;m do Reset ou de outra denomina&ccedil;&atilde;o</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">evang&eacute;lica</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">CDV</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para quem deseja entender o seu papel no Corpo de Cristo</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">INTRODU&Ccedil;&Atilde;O</span></span></h3>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Com o objetivo de auxiliar o povo de Deus na pr&aacute;tica dos dons e minist&eacute;rios, o C.D.V. (Centro de Despertamento Vocacional), se apresenta como uma estrat&eacute;gia para ajudar cada crist&atilde;o a descobrir a miss&atilde;o da sua vida e como usar seus dons e talentos em sua igreja local.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">I.A IMPORT&Acirc;NCIA DO C.D.V. PARA A IGREJA LOCAL</span></span></h3>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">H&aacute; pelos menos quatro raz&otilde;es que justificam a import&acirc;ncia do C.D.V. como estrat&eacute;gia que nos leva a ser uma igreja de dons e minist&eacute;rios que passamos a descrever abaixo:</span></span></p>

<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Ajuda na</strong> <strong>pr&aacute;tica de</strong> <strong>mandamentos</strong> <strong>b&iacute;blicos</strong> <strong>em rela&ccedil;&atilde;o aos dons</strong>. A import&acirc;ncia dos dons e minist&eacute;rios &eacute; claramente observada na B&iacute;blia atrav&eacute;s dos seguintes textos: Rm. 12.6-8, 1 Co. 12.4-7 e 1 Pe. 4.10-11.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Atua com uma vis&atilde;o da igreja onde cada membro &eacute; um ministro, refletindo no entendimento de que:</span></span>
	<ol style="list-style-type:lower-alpha">
		<li><span style="color:#FFFFFF"><span style="font-size:18px">Todo Crist&atilde;o &eacute; chamado por Deus; chamado para servir;</span></span></li>
		<li><span style="color:#FFFFFF"><span style="font-size:18px">Todo Crist&atilde;o tem pelo menos um dom espiritual. N&atilde;o h&aacute; crist&atilde;o sem dom;</span></span></li>
		<li><span style="color:#FFFFFF"><span style="font-size:18px">Todo Crist&atilde;o &eacute; um ministro, um sacerdote;</span></span></li>
		<li><span style="color:#FFFFFF"><span style="font-size:18px">Todo Crist&atilde;o precisa desenvolver seus dons e talentos, na &aacute;rea em que mais est&aacute; motivado para servir;</span></span></li>
		<li><span style="color:#FFFFFF"><span style="font-size:18px">Todo Crist&atilde;o precisa ser aprimorado continuamente no seu chamado e minist&eacute;rio.</span></span></li>
	</ol>
	</li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>&Eacute; um curso pr&aacute;tico, com conte&uacute;do did&aacute;tico e interativo </strong>que mobiliza a igreja local nos minist&eacute;rios, gerando maior participa&ccedil;&atilde;o das pessoas em aula e encorajando-as a desenvolverem seus dons e talentos atrav&eacute;s de relacionamentos intra e interpessoais. Ao final do curso, ap&oacute;s passarem pela Consultoria <em>(avalia&ccedil;&atilde;o dos resultados dos testes realizados durante as aulas &ndash; p&aacute;g. 90 e 91) </em>os alunos s&atilde;o encaminhados para os minist&eacute;rios em que est&atilde;o motivados a servir, sendo promovidos treinamentos especializados para a realiza&ccedil;&atilde;o das atividades espec&iacute;ficas de cada setor da Rede Ministerial.</span></span></li>
</ol>
</div>

<p>&nbsp;</p>

<div>
<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Promove</strong> <strong>uma</strong> <strong>nova</strong> <strong>cultura</strong> <strong>ministerial</strong> <strong>na</strong> <strong>igreja</strong>, em que ningu&eacute;m mais fica ocioso, pois identifica <strong>recursos </strong>aliando-os &agrave;s necessidades e direciona todos os servi&ccedil;os de acordo com os dons e talentos que foram concedidos por Deus, para serem exercidos a servi&ccedil;o do pr&oacute;ximo.</span></span></li>
</ol>

<p style="margin-left:35.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Desta forma, h&aacute; qualidade no crescimento de nossa igreja local, levando em considera&ccedil;&atilde;o a unidade e bom funcionamento do corpo de Cristo.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">II.A IGREJA E SUA ESTRUTURA</span></span></h3>

<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Supremo Conc&iacute;lio</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Diretoria Local</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Departamentos</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">P.G.</span></span></li>
</ol>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Atrav&eacute;s do CDV, buscamos criar oportunidade de reflex&atilde;o quanto aos talentos e dons espirituais para direcionamento dos irm&atilde;os ao servi&ccedil;o ministerial.</span></span></p>

<p>&nbsp;</p>

<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td style="height:27px; width:151px">
			<p style="margin-left: 0.45pt;"><span style="color:#FFFFFF"><span style="font-size:12px"><strong>CLASSE</strong></span></span></p>
			</td>
			<td style="height:27px; width:453px">
			<p style="margin-left: 0.4pt;"><span style="color:#FFFFFF"><span style="font-size:12px"><strong>PERFIL</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:26px; width:151px">
			<p style="margin-left: 0.45pt;"><span style="color:#FFFFFF"><span style="font-size:12px"><strong>RESET</strong></span></span></p>
			</td>
			<td style="height:26px; width:453px">
			<p style="margin-left: 0.4pt;"><span style="color:#FFFFFF"><span style="font-size:12px">Para quem deseja se batizar</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:45px; width:151px">
			<p style="margin-left: 0.45pt;"><span style="color:#FFFFFF"><span style="font-size:12px"><strong>START</strong></span></span></p>
			</td>
			<td style="height:45px; width:453px">
			<p style="margin-left: 0.4pt;"><span style="color:#FFFFFF"><span style="font-size:12px">Para os batizados que v&ecirc;m do Reset ou de outra denomina&ccedil;&atilde;o</span></span></p>

			<p style="margin-left: 0.4pt;"><span style="color:#FFFFFF"><span style="font-size:12px">evang&eacute;lica</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:26px; width:151px">
			<p style="margin-left: 0.45pt;"><span style="color:#FFFFFF"><span style="font-size:12px"><strong>CDV</strong></span></span></p>
			</td>
			<td style="height:26px; width:453px">
			<p style="margin-left: 0.4pt;"><span style="color:#FFFFFF"><span style="font-size:12px">Para quem deseja entender o seu papel no Corpo de Cristo</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Rede</strong> <strong>Ministerial:</strong> &Eacute; constitu&iacute;da de 9 minist&eacute;rios e suas subcategorias:</span></span></p>

<p>&nbsp;</p>

<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td style="height:33px; width:151px">
			<p style="margin-left:3.45pt"><span style="color:#FFFFFF"><span style="font-size:12px">ADMINISTRATIVOS</span></span></p>
			</td>
			<td style="height:33px; width:151px">
			<p style="margin-left:27.05pt"><span style="color:#FFFFFF"><span style="font-size:12px"><img src="file:///C:/Users/stanl/AppData/Local/Packages/oice_16_974fa576_32c1d314_2a83/AC/Temp/msohtmlclip1/01/clip_image001.gif" style="height:2px; width:142px" />ART&Iacute;STICOS</span></span></p>
			</td>
			<td style="height:33px; width:151px">
			<p style="margin-left:17.45pt"><span style="color:#FFFFFF"><span style="font-size:12px">EDUCACIONAIS</span></span></p>
			</td>
			<td style="height:33px; width:151px">
			<p style="margin-left:34.85pt"><span style="color:#FFFFFF"><span style="font-size:12px">ET&Aacute;RIOS</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:139px; width:151px">
			<p style="margin-left:18.05pt"><span style="color:#FFFFFF"><span style="font-size:12px"><img src="file:///C:/Users/stanl/AppData/Local/Packages/oice_16_974fa576_32c1d314_2a83/AC/Temp/msohtmlclip1/01/clip_image002.gif" style="height:3px; width:141px" />Diretoria Local Financeiro Patrimonial Recursos Jur&iacute;dico Manuten&ccedil;&atilde;o</span></span></p>
			</td>
			<td style="height:139px; width:151px">
			<p style="margin-left:40.35pt"><span style="color:#FFFFFF"><span style="font-size:12px">Dan&ccedil;a Teatro</span></span></p>
			</td>
			<td style="height:139px; width:151px">
			<p style="margin-left:9.4pt"><span style="color:#FFFFFF"><span style="font-size:12px"><img src="file:///C:/Users/stanl/AppData/Local/Packages/oice_16_974fa576_32c1d314_2a83/AC/Temp/msohtmlclip1/01/clip_image003.gif" style="height:3px; width:142px" />Discipulado Escola de Ministros</span></span></p>
			</td>
			<td style="height:139px; width:151px">
			<p style="margin-left:31.45pt"><span style="color:#FFFFFF"><span style="font-size:12px"><img src="file:///C:/Users/stanl/AppData/Local/Packages/oice_16_974fa576_32c1d314_2a83/AC/Temp/msohtmlclip1/01/clip_image002.gif" style="height:3px; width:141px" />Kids Jovens</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td style="height:33px; width:151px">
			<p style="margin-left:33.45pt"><span style="color:#FFFFFF"><span style="font-size:12px">EVENTOS</span></span></p>
			</td>
			<td style="height:33px; width:151px">
			<p style="margin-left:18.65pt"><span style="color:#FFFFFF"><span style="font-size:12px">MISSION&Aacute;RIOS</span></span></p>
			</td>
			<td style="height:33px; width:151px">
			<p style="margin-left:31.5pt"><span style="color:#FFFFFF"><span style="font-size:12px">MUSICAIS</span></span></p>
			</td>
			<td style="height:33px; width:151px">
			<p style="margin-left:34.85pt"><span style="color:#FFFFFF"><span style="font-size:12px">OFICIAIS</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:157px; width:151px">
			<p style="margin-left:33.9pt"><span style="color:#FFFFFF"><span style="font-size:12px"><img src="file:///C:/Users/stanl/AppData/Local/Packages/oice_16_974fa576_32c1d314_2a83/AC/Temp/msohtmlclip1/01/clip_image004.gif" style="height:2px; width:141px" />Homens Mulheres Casal</span></span></p>

			<p style="margin-left:.9pt"><span style="color:#FFFFFF"><span style="font-size:12px">Eventos em Geral</span></span></p>
			</td>
			<td style="height:157px; width:151px">
			<p style="margin-left:13.85pt"><span style="color:#FFFFFF"><span style="font-size:12px"><img src="file:///C:/Users/stanl/AppData/Local/Packages/oice_16_974fa576_32c1d314_2a83/AC/Temp/msohtmlclip1/01/clip_image001.gif" style="height:2px; width:142px" />Miss&otilde;es Evangelismo Assist&ecirc;ncia Social Capelania</span></span></p>

			<p style="margin-left:.5pt"><span style="color:#FFFFFF"><span style="font-size:12px">Culto nos lares</span></span></p>
			</td>
			<td style="height:157px; width:151px">
			<p style="margin-left:5.1pt"><span style="color:#FFFFFF"><span style="font-size:12px"><img src="file:///C:/Users/stanl/AppData/Local/Packages/oice_16_974fa576_32c1d314_2a83/AC/Temp/msohtmlclip1/01/clip_image005.gif" style="height:2px; width:142px" />Minist&eacute;rio de Louvor e</span></span></p>

			<p style="margin-left:5.1pt"><span style="color:#FFFFFF"><span style="font-size:12px">Adora&ccedil;&atilde;o</span></span></p>
			</td>
			<td style="height:157px; width:151px">
			<p style="margin-left:34.95pt"><span style="color:#FFFFFF"><span style="font-size:12px"><img src="file:///C:/Users/stanl/AppData/Local/Packages/oice_16_974fa576_32c1d314_2a83/AC/Temp/msohtmlclip1/01/clip_image006.gif" style="height:2px; width:141px" />Gansos M&iacute;dia &Aacute;udio Diaconia</span></span></p>

			<p style="margin-left:37.25pt"><span style="color:#FFFFFF"><span style="font-size:12px">Ora&ccedil;&atilde;o/Intercess&atilde;o Abra&ccedil;o Obreiro</span></span></p>
			</td>
		</tr>
	</tbody>
</table>
</div>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Pequenos Grupos (P.G.): </strong>S&atilde;o pequenos grupos com encontros que ocorrem semanalmente com a finalidade de aproximar as pessoas que moram no mesmo bairro ou cidade, gerando relacionamentos com qualidade para os que j&aacute; s&atilde;o crist&atilde;os, e principalmente uma oportunidade de convidar uma pessoa que nunca entraria numa igreja evang&eacute;lica.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Pastoral</strong>: Partindo do princ&iacute;pio que somos o Corpo de Cristo e cada pessoa tem a sua devida fun&ccedil;&atilde;o e valor no Reino de Deus, procuramos ter uma pastoral coesa e eficiente para atender as mais diversas demandas de uma Igreja Local com respaldo b&iacute;blico e espiritualidade. Nos organizamos como: presb&iacute;teros, evangelistas, pastores ministeriais, mission&aacute;rios, pastores locais e pastores conselheiros.</span></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<h4><span style="color:#FFFFFF"><span style="font-size:18px">III.OS 5C&acute;s</span></span></h4>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Para que haja e seja mantida esta estrutura e sustentabilidade, devemos compreender os 5 (cinco) C&acute;s:</span></span></p>

<p>&nbsp;</p>

<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td style="height:35px; width:150px">
			<p style="margin-left:.1pt"><span style="color:#FFFFFF"><span style="font-size:12px">C&rsquo;s</span></span></p>
			</td>
			<td style="height:35px; width:452px">
			<p style="margin-left:.55pt"><span style="color:#FFFFFF"><span style="font-size:12px"><strong>CARACTER&Iacute;STICAS</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:30px; width:150px">
			<p style="margin-left:1.0pt"><span style="color:#FFFFFF"><span style="font-size:12px">Car&aacute;ter</span></span></p>
			</td>
			<td style="height:30px; width:452px">
			<p style="margin-left:.2pt"><span style="color:#FFFFFF"><span style="font-size:12px">Ser verdadeiro, coerente, ter honestidade</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:30px; width:150px">
			<p style="margin-left:1.0pt"><span style="color:#FFFFFF"><span style="font-size:12px">Compet&ecirc;ncia</span></span></p>
			</td>
			<td style="height:30px; width:452px">
			<p style="margin-left:.05pt"><span style="color:#FFFFFF"><span style="font-size:12px">Possuir Habilidade, Conhecimento, Atividade</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:30px; width:150px">
			<p style="margin-left:1.0pt"><span style="color:#FFFFFF"><span style="font-size:12px">Comprometimento</span></span></p>
			</td>
			<td style="height:30px; width:452px">
			<p style="margin-left:.2pt"><span style="color:#FFFFFF"><span style="font-size:12px">Ser comprometido (Porco) e n&atilde;o somente estar envolvido (galinha)</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:31px; width:150px">
			<p style="margin-left:1.0pt"><span style="color:#FFFFFF"><span style="font-size:12px">Comunh&atilde;o</span></span></p>
			</td>
			<td style="height:31px; width:452px">
			<p><span style="color:#FFFFFF"><span style="font-size:12px">Devocionais que geram sintonia, identifica&ccedil;&atilde;o e o bem comum</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:30px; width:150px">
			<p style="margin-left:1.0pt"><span style="color:#FFFFFF"><span style="font-size:12px">Cultura</span></span></p>
			</td>
			<td style="height:30px; width:452px">
			<p style="margin-left:.2pt"><span style="color:#FFFFFF"><span style="font-size:12px">Viver a cultura da Igreja Local</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">CONCLUS&Atilde;O &ndash; A VIS&Atilde;O DA CRIEP</span></span></h3>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Nossa igreja local s&oacute; poder&aacute; realizar a sua miss&atilde;o partindo do princ&iacute;pio que sua rela&ccedil;&atilde;o com Deus e sua sinergia com as pessoas estejam firmadas nestes princ&iacute;pios e na palavra de Deus.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Somos uma igreja que adora a Deus, cr&ecirc; em Jesus Cristo, a atrav&eacute;s do Esp&iacute;rito Santo est&aacute; em miss&atilde;o para estabelecer o Reino dos c&eacute;us na terra.</span></span></p>

      `,
    imagem: require('@/assets/images/cdv1.png'),
  },
  {
    titulo: 'Lição 2 - A igreja e sua missão',
    videoUrl: 'https://www.youtube.com/embed/DK2qWOSDGic?si=AkwBsy4DFtCFGare',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ap&oacute;s termos aprendido sobre as convic&ccedil;&otilde;es da IPAF em rela&ccedil;&atilde;o ao Reino de Deus sobre a igreja como organismo e organiza&ccedil;&atilde;o, devemos nos atentar ao posicionamento que o disc&iacute;pulo de Cristo deve assumir perante Deus para que possa relacionar-se intimamente com Ele e como parte integrante do Corpo de Cristo, possa cumprir a miss&atilde;o de propagar a mensagem de salva&ccedil;&atilde;o e esperan&ccedil;a.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Para que isso ocorra, aprenderemos no CDV a nos preparar para esta miss&atilde;o, identificando a partir do nosso cotidiano nossa voca&ccedil;&atilde;o, talentos e dons, os quais possam qualificar nossa &ldquo;m&atilde;o de obra&rdquo; para nos tornarmos relevantes para estabelecer o Reino dos C&eacute;us na Terra.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>I.RELA&Ccedil;&Atilde;O&nbsp;&nbsp; E&nbsp;&nbsp;&nbsp; CONCEITOS&nbsp;&nbsp; HIST&Oacute;RICOS&nbsp; QUE&nbsp;&nbsp; ANTECEDERAM&nbsp; A FORMA&Ccedil;&Atilde;O DA IGREJA</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">A concep&ccedil;&atilde;o da palavra Igreja era utilizada anteriormente no grego para designar qualquer assembleia ou reuni&atilde;o, ganhando maior evid&ecirc;ncia a partir do NT ao ser aplicada a um contexto espiritual a fim de se entender com maior clareza a realidade da pr&aacute;tica Crist&atilde;.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Estudamos atrav&eacute;s do AT a origem e a heran&ccedil;a do pecado ap&oacute;s a queda do homem no &Eacute;den (Gn 3.1-24). Por conta deste evento, Deus passou a guiar seu povo estabelecendo com o homem uma rela&ccedil;&atilde;o de confian&ccedil;a, integridade e obedi&ecirc;ncia. Isto se comprova em No&eacute; quando recebeu a ordenan&ccedil;a para construir a arca para um novo mundo (Gn 2.32), quando Abra&atilde;o recebe a ordenan&ccedil;a de partir para a nova Terra (Gn 12.1) e Mois&eacute;s quando recebe a ordenan&ccedil;a para seguir para terra prometida (Ex 12.40-41), por exemplo.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ao longo da hist&oacute;ria, Deus realiza muitos prod&iacute;gios e estabelece uma rela&ccedil;&atilde;o intensa e instrutiva para com o homem. Vejamos o exemplo de Mois&eacute;s nos seguintes contextos: Nas leis dos 10 mandamentos (Ex. 20.3-17), a presen&ccedil;a de Deus no tabern&aacute;culo (Ex. 35.8 &ndash; 39:43), o sacerdote como respons&aacute;vel pelo templo e seus sacramentos (Ex. 28) e as festas judaicas, dentre elas, a p&aacute;scoa fazendo alus&atilde;o da liberta&ccedil;&atilde;o do Egito (Ex. 12.11,27,43,48).</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Posteriormente, o grande acontecimento da hist&oacute;rica Judaica foi o an&uacute;ncio messi&acirc;nico que resgataria a esperan&ccedil;a de Israel, a vinda do Salvador do mundo (Is. 53). Ao passar dos anos, a tradi&ccedil;&atilde;o oral manteve viva a mem&oacute;ria dos grandes feitos e promessas de Deus para com a</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">humanidade. Por&eacute;m, a vida religiosa do judeu e seus respectivos rituais e sacramentos foram se corrompendo pelo jugo pesado da lei judaica e influ&ecirc;ncias culturais.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Embora no tempo de Jesus Cristo o templo de Jerusal&eacute;m estivesse estabelecido, sua raz&atilde;o de ser e sua respectiva miss&atilde;o estavam longe de Deus, tanto que em Jo. 2, Jesus menciona que o templo seria destru&iacute;do e reconstru&iacute;do em tr&ecirc;s dias. A partir deste momento, Jesus d&aacute; um novo sentido &agrave; Igreja e atrav&eacute;s do Esp&iacute;rito Santo faz do cora&ccedil;&atilde;o do homem um templo, pelo qual deveria propagar o evangelho para toda humanidade.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">De acordo com este contexto, Jesus Cristo reconfigura a rela&ccedil;&atilde;o do homem com Deus e cumpre as profecias de Isa&iacute;as na hist&oacute;ria judaica tornando gratuita a salva&ccedil;&atilde;o do jugo condenat&oacute;rio do pecado (Jo. 5.24 e Rm. 8.1) e nos possibilitando compreender a &ldquo;profundidade da encarna&ccedil;&atilde;o e de sua obra redentora&rdquo;.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Nossa convic&ccedil;&atilde;o, como igreja CRIEP, em rela&ccedil;&atilde;o a Jesus Cristo, &eacute; a mesma da igreja do primeiro s&eacute;culo: 1) Foi Homem que amou, obedeceu e cumpriu integralmente a Lei (Lc. 24.44); 2) Cordeiro Pascal (2 Co. 5.17); 3) O perfeito Sumo Sacerdote (Hb. 4.14-16); 4) Mediador entre Deus e os homens (1 Tm. 2.5-6); 5) Deixou o Esp&iacute;rito Santo para nos ensinar e conduzir para o verdadeiro caminho (Jo. 14.26).</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Em resumo, uma vez que reconhecemos esta nova rela&ccedil;&atilde;o de Deus para com homem confessando Cristo como nosso &uacute;nico e suficiente salvador, e decidimos estabelecer atrav&eacute;s do Esp&iacute;rito Santo o Reino de Deus na Terra, nosso testemunho respons&aacute;vel vai al&eacute;m da tradi&ccedil;&atilde;o oral, vai ao encontro de nossas a&ccedil;&otilde;es e servi&ccedil;os do cotidiano.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>II.A IGREJA E SUA HIST&Oacute;RIA</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">A origem da palavra igreja vem do grego, do termo EK-KLESIA, que significa &ldquo;reuni&atilde;o de pessoas chamadas para fora&rdquo;, conceituando o corpo de Cristo (organismo) como casa de ora&ccedil;&atilde;o.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Temos por defini&ccedil;&atilde;o de Igreja: <strong><em>Povo</em></strong> <strong><em>redimido,</em></strong> <strong><em>santo,</em></strong> <strong><em>habitado</em></strong> <strong><em>por</em></strong> <strong><em>Cristo</em></strong> <strong><em>e</em></strong> <strong><em>submisso</em></strong> <strong><em>a</em></strong> <strong><em>Ele </em></strong><strong><em>como disc&iacute;pulos, para ador&aacute;-lo em comunidade no mundo. (Isa&iacute;as 62-12)</em></strong></span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Compreendida a defini&ccedil;&atilde;o acima, aprofundamos a reflex&atilde;o de Igreja denominando o Esp&iacute;rito Santo como o &ldquo;gestor&rdquo; da distribui&ccedil;&atilde;o dos dons e talentos e conduzindo atrav&eacute;s da gra&ccedil;a de Deus a sinergia entre as pessoas (disc&iacute;pulos) em prol da miss&atilde;o de propagar o Reino de Deus, desenvolvendo os seguintes aspectos:</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>A Igreja fundamentada em Cristo - </strong>A perspectiva desta palavra &ldquo;igreja&rdquo; aparece claramente no evangelho de Mateus como perspectiva espiritual, universal (16.18) e local (18.17). Nestes textos b&iacute;blicos percebemos que igreja pertence a Cristo &ldquo;<em>Minha igreja</em>&rdquo;, nele a igreja est&aacute; alicer&ccedil;ada &ldquo;<em>Sobre esta rocha</em>&rdquo;, edificada &ldquo;Eu edificarei&rdquo; e vitoriosa &ldquo;<em>As portas do inferno n&atilde;o v&atilde;o prevalecer</em>&rdquo;.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>A Igreja no primeiro s&eacute;culo - </strong>Estudar sobre a igreja do primeiro s&eacute;culo &eacute; fascinante, sua forma de viver integralmente os ensinos e ordenan&ccedil;as de Jesus Cristo sem d&uacute;vida &eacute; motivo de inspira&ccedil;&atilde;o para igreja de nosso tempo: Suas <strong><em>reuni&otilde;es </em></strong>de pessoas celebravam a comunh&atilde;o e partilha (At. 2.42-47; 4.32-35; 5.12-15); <strong><em>Grupos e Locais </em></strong>de disc&iacute;pulos se formavam gradativamente (At. 8.1; 11.22, 26; 13.1; 15.3-4) e alguns casos se tornavam</span></span></li>
</ul>
</div>

<p>&nbsp;</p>

<div>
<p style="margin-left:35.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">at&eacute; Igrejas (Comunidades Paulinas, Petrinas e Joaninas por exemplo); <strong><em>Organismo espiritual </em></strong>como corpo m&iacute;stico de Cristo (Ef. 1.22-23; 4.15-16) s&atilde;o milhares de disc&iacute;pulos de Jesus que transcendem o tempo, local e espa&ccedil;o.</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Igreja</strong> <strong>Universal</strong> <strong>e</strong> <strong>Espiritual</strong> <strong>e</strong> <strong>Igreja</strong> <strong>Local</strong> <strong>(vide</strong> <strong>quadro</strong> <strong>abaixo):</strong></span></span></li>
</ul>

<p>&nbsp;</p>

<table border="0" cellpadding="0" cellspacing="3">
	<tbody>
		<tr>
			<td style="height:28px; width:19px">
			<p>&nbsp;</p>
			</td>
			<td style="height:28px; width:88px">
			<p style="margin-left:17.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>IGREJA</strong></span></span></p>
			</td>
			<td style="height:28px; width:251px">
			<p style="margin-left:51.95pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CARACTER&Iacute;STICAS</strong></span></span></p>
			</td>
			<td style="height:28px; width:238px">
			<p style="margin-left:9.15pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>MISS&Atilde;O</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:218px; width:19px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:5.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">1</span></span></p>
			</td>
			<td style="height:218px; width:88px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:7.65pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>IGREJA UNIVERSAL</strong></span></span></p>
			</td>
			<td style="height:218px; width:251px">
			<ol>
				<li><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; invis&iacute;vel - um organismo vivo e espiritual, formado pelos salvos de todos os lugares e &eacute;pocas da hist&oacute;ria da salva&ccedil;&atilde;o.</span></span></li>
				<li><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o tem limita&ccedil;&otilde;es geogr&aacute;ficas, n&atilde;o est&aacute; sujeita a dias, meses e anos, na&ccedil;&atilde;o ou clero.</span></span></li>
				<li><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; a Igreja do arrebatamento, aquela que vai subir com o Senhor.</span></span></li>
			</ol>
			</td>
			<td style="height:218px; width:238px">
			<ol>
				<li><span style="color:#FFFFFF"><span style="font-size:18px">Se denomina como a miss&atilde;o da evangeliza&ccedil;&atilde;o e as pessoas que dela fazem parte, tornando- se agentes do Reino de Deus que refletem a imagem de Cristo.</span></span></li>
				<li><span style="color:#FFFFFF"><span style="font-size:18px">Pode ser entendido como aquela que desperta no homem a &ldquo;raz&atilde;o do ser&rdquo;, e atrav&eacute;s de suas a&ccedil;&otilde;es e servi&ccedil;os fazem Jesus Cristo conhecido.</span></span></li>
			</ol>
			</td>
		</tr>
		<tr>
			<td style="height:232px; width:19px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:5.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">2</span></span></p>
			</td>
			<td style="height:232px; width:88px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:16.65pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>IGREJA </strong><strong>LOCAL</strong></span></span></p>
			</td>
			<td style="height:232px; width:251px">
			<ol>
				<li><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; vis&iacute;vel - composta do povo de Deus de uma localidade, que se re&uacute;ne sistematicamente para ador&aacute;-Lo</span></span></li>
				<li><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; a forma organizacional onde as pessoas congregam, e pertencem a um rol de membros.</span></span></li>
				<li><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o podemos afirmar que todos seus membros s&atilde;o verdadeiramente salvos, que v&atilde;o subir no arrebatamento.</span></span></li>
			</ol>
			</td>
			<td style="height:232px; width:238px">
			<ol>
				<li><span style="color:#FFFFFF"><span style="font-size:18px">Tem a finalidade de organizar o &ldquo;envio&rdquo; dos seus membros e contribuir na luz da palavra Deus com a rela&ccedil;&atilde;o entre Igreja (Organiza&ccedil;&atilde;o) x Pessoas x Sociedade.</span></span></li>
				<li><span style="color:#FFFFFF"><span style="font-size:18px">Na Igreja Local aprendemos atrav&eacute;s de nossos pastores, professores e volunt&aacute;rios meios que potencializam a miss&atilde;o do nosso cotidiano.0</span></span></li>
			</ol>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>III.A IGREJA E SUA MISS&Atilde;O</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">A Igreja como organismo e organiza&ccedil;&atilde;o s&oacute; poder&aacute; realizar a sua miss&atilde;o de estabelecer o Reino de Deus na terra, partindo do princ&iacute;pio que sua rela&ccedil;&atilde;o com Deus e sua sinergia com as pessoas estejam firmadas e fundamentadas na palavra de Deus.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Na CRIEP, em nosso programa de integra&ccedil;&atilde;o, apresentamos os passos b&aacute;sicos da f&eacute; <strong>(Reset)</strong>; partilhamos nossas cren&ccedil;as <strong>(Start) </strong>e a Igreja que desejamos ser e direcionamos a m&atilde;o de obra das pessoas para o servi&ccedil;o do Reino de Deus <strong>(CDV)</strong>.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">O processo de integra&ccedil;&atilde;o da CRIEP e seus respectivos pilares buscam desconstruir um evangelho guiado por prop&oacute;sitos e interesses pessoais, para um evangelho genu&iacute;no que est&aacute; sens&iacute;vel &agrave; vontade de Deus, respons&aacute;vel e maduro, no que diz respeito &agrave; miss&atilde;o da Igreja.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Como organiza&ccedil;&atilde;o e institui&ccedil;&atilde;o, buscamos na luz da palavra de Deus o aperfei&ccedil;oamento para cumprir com excel&ecirc;ncia a miss&atilde;o e propaga&ccedil;&atilde;o do evangelho.</span></span></p>
</div>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Se os disc&iacute;pulos que fazem parte desta miss&atilde;o n&atilde;o estiverem devidamente orientados em rela&ccedil;&atilde;o a &ldquo;sua f&eacute;&rdquo; e ao &ldquo;seu lugar&rdquo; na miss&atilde;o evangelizadora da Igreja, dificilmente poder&atilde;o transmitir atrav&eacute;s dos seus talentos e dons, o amor de Deus, a riqueza da solidariedade e frutos do Esp&iacute;rito que refletem a imagem de Cristo.</span></span></p>

      `,
    imagem: require('@/assets/images/cdv2.png'),
  },
  {
    titulo: 'Lição 3 - O discípulo, a igreja e a cultura',
    videoUrl: 'https://www.youtube.com/embed/-ns29AeYozg?si=sLRQ-wKboJPTggNo',
    descricao:
      `
      <div>
<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">A brilhante trajet&oacute;ria dos disc&iacute;pulos est&aacute; condicionada ao processo de aprendizado, desenvolvimento e aplica&ccedil;&atilde;o de acordo com sua voca&ccedil;&atilde;o, talentos e dons. O CDV tem o papel vital de focar e direcionar o disc&iacute;pulo dentro do organismo vivo da Igreja, e atrav&eacute;s de m&eacute;todos pr&aacute;ticos, gerar no disc&iacute;pulo a confian&ccedil;a, satisfa&ccedil;&atilde;o e seguran&ccedil;a necess&aacute;rias para tornar suas a&ccedil;&otilde;es e servi&ccedil;os mais efetivos na grande miss&atilde;o de evangelizar o mundo.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Conforme refletimos no Start, o corpo de Cristo possui muitos membros e cada um deles &eacute; essencial para o funcionamento pleno no corpo. Se um dos seus membros est&aacute; doente, todos se ajudam mutuamente para cur&aacute;-lo, se existem dificuldades, todos contribuem com seu esfor&ccedil;o para super&aacute;-las, por fim, um corpo em constante movimento elimina a atrofia de qualquer membro de seu organismo.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>I.O DISC&Iacute;PULO E SUA MISS&Atilde;O</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Agrave; medida que o disc&iacute;pulo se compromete a ter Cristo como modelo de vida e atrav&eacute;s do Esp&iacute;rito Santo busca descobrir seu dom e talento, ele atinge a plena maturidade para atender a demanda da miss&atilde;o da igreja (universal e local) de evangelizar o mundo. A plena maturidade &eacute; constru&iacute;da e aperfei&ccedil;oada atrav&eacute;s das seguintes etapas:</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>A. Aprendizado</strong></span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">A palavra disc&iacute;pulo &eacute; de origem hebraica <em>&ldquo;Talmid&rdquo; </em>e seu conceito adv&ecirc;m da tradi&ccedil;&atilde;o educacional judaica, onde meninos e jovens eram aprendizes e estudavam aos p&eacute;s dos doutores da Lei (Rabis). Os &ldquo;Talmidin&rdquo; seguiam e imitavam a seus mestres.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Neste contexto, compreendemos melhor o que diz o ap&oacute;stolo Paulo em 1 Cor&iacute;ntios 1.11: <em>&ldquo;Sede meus imitadores, como tamb&eacute;m eu de Cristo&rdquo;</em>. Ser disc&iacute;pulo se resume em:</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Refletir a imagem de Cristo (2 Co. 3.18 e Rm. 8.29);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Ser submisso e obediente &agrave; Sua palavra (2 Tm. 3.16-17);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Amar ao pr&oacute;ximo como Ele nos amou (Jo. 13.34);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Propagar o evangelho com responsabilidade e ousadia (Mc.16.15).</span></span></li>
</ul>
</div>

<p>&nbsp;</p>

<div>
<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>B. Desenvolvimento</strong></span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">O processo de desenvolvimento do disc&iacute;pulo parte de sua rela&ccedil;&atilde;o com Deus (ora&ccedil;&atilde;o, obedi&ecirc;ncia e cumprimento de suas ordenan&ccedil;as) e da compreens&atilde;o pessoal atrav&eacute;s de seu chamado, sendo condi&ccedil;&otilde;es imprescind&iacute;veis para a descoberta e aperfei&ccedil;oamento dos dons e talentos adquiridos.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Nesse contexto, a igreja local pode oferecer muitas oportunidades para o desenvolvimento pessoal, ministerial e social, dinamizando as rela&ccedil;&otilde;es humanas atrav&eacute;s da manifesta&ccedil;&atilde;o da voca&ccedil;&atilde;o, talentos e dons de cada disc&iacute;pulo integrante do corpo de Cristo (1 Jo. 1.3).</span></span></p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Os dons s&atilde;o distribu&iacute;dos pelo Esp&iacute;rito Santo ao crist&atilde;o regenerado, que cr&ecirc; em sua atualidade, que se envolve na igreja e est&aacute; disposto a desenvolv&ecirc;-los a ponto de descobrir seu minist&eacute;rio.</strong></span></span></h2>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Entendemos que a distribui&ccedil;&atilde;o dos dons e talentos atende &agrave; demanda existente em nossa comunidade, pois faz com que cada disc&iacute;pulo funcione como deveria funcionar, ou seja, cada membro do Corpo torna-se o <em>&ldquo;disc&iacute;pulo certo para o servi&ccedil;o certo&rdquo; </em>(Mt. 28.19).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>C. Aplica&ccedil;&atilde;o e Pr&aacute;tica do Disc&iacute;pulo</strong></span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Aprendemos que todos os disc&iacute;pulos s&atilde;o vocacionados atrav&eacute;s de suas a&ccedil;&otilde;es em propagar o Reino de Deus e atrav&eacute;s da sua &ldquo;m&atilde;o de obra&rdquo; contribuem para a edifica&ccedil;&atilde;o do corpo de Cristo no &acirc;mbito pessoal e da igreja local (1 Co. 14.26).</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Conclui-se desta forma, que todo disc&iacute;pulo, al&eacute;m de representar a igreja universal e local como organismo vivo (1 Pe. 2.3-4), utiliza seus talentos e dons diretamente na promo&ccedil;&atilde;o da uni&atilde;o e adora&ccedil;&atilde;o m&uacute;tua da igreja e na constru&ccedil;&atilde;o de um ambiente saud&aacute;vel, promovendo atrav&eacute;s do Esp&iacute;rito Santo a vida e, na pessoa de Cristo, resgata a esperan&ccedil;a da humanidade quanto ao futuro como verdadeira miss&atilde;o (Mc. 16.15).</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>II.O DISC&Iacute;PULO E A IGREJA</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">A igreja como corpo de Cristo &eacute; um organismo vivo com uma intensa e din&acirc;mica atividade espiritual. &Eacute; na igreja como um corpo vivo que se explica melhor: relacionamento, vida e trabalho ao passo que h&aacute; a conviv&ecirc;ncia entre os irm&atilde;os.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Naturalmente, o corpo de Cristo ganha <strong>diversidade </strong>de seus membros ao mesmo tempo em que cria <strong>interdepend&ecirc;ncia </strong>para mant&ecirc;-lo unido e saud&aacute;vel. Em 1 Co. 12.14-30, o ap&oacute;stolo Paulo menciona que esta diversidade n&atilde;o pode ser prejudicial ao corpo de Cristo (v. 15-16) e todos est&atilde;o no mesmo patamar (v. 17), haja vista a busca pela <strong>unidade espiritual.</strong></span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">A sinergia do corpo, levando &agrave; diversidade de seus membros, est&aacute; diretamente ligada &agrave; <strong>aceita&ccedil;&atilde;o pessoal </strong>(1 Co 12.15-16) e <strong>coletiva </strong>do disc&iacute;pulo (1 Co. 12.17), que busca maturidade em assimilar a igreja no plural permitindo a diversidade do plano de Deus (1 Co. 12.18,28-30) e a diversidade da conviv&ecirc;ncia com as pessoas (1 Co. 12.19-20).</span></span></p>
</div>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Podemos afirmar que o disc&iacute;pulo, atrav&eacute;s do seu cuidado, amizade, humildade, gentileza e servi&ccedil;o, possui vital responsabilidade em contribuir com a constru&ccedil;&atilde;o de um ambiente equilibrado (1 Co. 12.21), valorizando e unindo as pessoas (1 Co. 12.22-24, 25-26).</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Por fim, como IPAF, buscamos exercer o discipulado de intera&ccedil;&atilde;o e di&aacute;logo em prol do pleno funcionamento do corpo de Cristo e s&oacute; assim, poderemos testemunhar o Reino de Deus sem exclusividade ou partidarismo.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>III.O DISC&Iacute;PULO E A CULTURA</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ser disc&iacute;pulo em nosso tempo n&atilde;o &eacute; somente estar entre as quatro paredes da igreja local, &eacute; mais do que isso, &eacute; estar ligado diretamente ao ciclo de nossas rela&ccedil;&otilde;es e consequentemente ir al&eacute;m dessas paredes.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Embora cada ser humano seja composto por sua &ldquo;pr&oacute;pria&rdquo; cultura, ideologia e vis&atilde;o de mundo, a igreja local &eacute; o lugar ideal para desenvolver o relacionamento crist&atilde;o com os irm&atilde;os, o que contribui para a cria&ccedil;&atilde;o de estrat&eacute;gias que facilitam compartilhar cren&ccedil;as, h&aacute;bitos e um sentido para uma cultura t&atilde;o carente e corrompida nos dias de hoje.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Nosso objetivo como igreja &eacute; explorar a voca&ccedil;&atilde;o, os talentos e dons como ponto de partida para formular um novo modelo de evangeliza&ccedil;&atilde;o, conduta e vida, independentemente das dificuldades interpessoais do nosso cotidiano, n&atilde;o se resumindo somente aos cultos de domingo e respectivos trabalhos na igreja local.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Agrave; luz da palavra de Deus, compreendemos que Cristo nos trouxe salva&ccedil;&atilde;o e nos elegeu como disc&iacute;pulos que levam adiante seu evangelho. A manifesta&ccedil;&atilde;o de talentos e dons faz parte do processo de maturidade do disc&iacute;pulo, em outras palavras, faz com que possamos assimilar nossa miss&atilde;o acerca da leg&iacute;tima voca&ccedil;&atilde;o de anunciar o reino de Deus e que o nosso &ldquo;minist&eacute;rio&rdquo; jamais ser&aacute; frustrado, pois nosso servi&ccedil;o estar&aacute; sempre em movimento com a Igreja Local e Universal.</span></span></p>

      `,
    imagem: require('@/assets/images/cdv3.png'),
  },
    {
    titulo: 'Lição 4 - Descobrindo os Dons Espirituais',
    videoUrl: 'https://www.youtube.com/embed/hHdynW5aNKU?si=zzO5XwjCZGM1LbKq',
    descricao:
      `
      <div>
<h3><span style="font-size:18px"><span style="color:#FFFFFF"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">No CDV a descoberta do dom &eacute; tratada em duas fases, a primeira na compreens&atilde;o do dom espiritual como a ess&ecirc;ncia da atua&ccedil;&atilde;o do Esp&iacute;rito Santo, e a segunda na correspond&ecirc;ncia do respectivo dom &agrave; demanda da igreja local, identificando em qual minist&eacute;rio pode se atuar. N&atilde;o h&aacute; crist&atilde;o, nascido de novo, sem dom.</span></span></p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Partindo do momento que reconhecemos a Jesus Cristo como Salvador e decidimos nos comprometer com a miss&atilde;o da igreja universal em propagar o Reino de Deus, o fruto do Esp&iacute;rito se manifesta atrav&eacute;s do testemunho no nosso cotidiano e na nossa respectiva &ldquo;m&atilde;o de obra&rdquo; que realizamos na igreja local.</span></span></p>

<p>&nbsp;</p>

<h3><span style="font-size:18px"><span style="color:#FFFFFF"><strong>I.A DESCOBERTA DOS DONS E TALENTOS NATURAIS</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Compreender o que &eacute; dom &eacute; fundamental, inclusive saber o que &eacute; talento tamb&eacute;m. Veja o quadro a seguir:</span></span></p>

<table border="0" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td style="height:32px; width:302px">
			<p style="margin-left:2.15pt"><span style="font-size:18px"><span style="color:#FFFFFF"><strong>DOM</strong></span></span></p>
			</td>
			<td style="height:32px; width:299px">
			<p><span style="font-size:18px"><span style="color:#FFFFFF"><strong>TALENTO</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:12px; width:302px">
			<p>&nbsp;</p>
			</td>
			<td style="height:12px; width:299px">
			<p>&nbsp;</p>
			</td>
		</tr>
		<tr>
			<td style="height:27px; width:302px">
			<p style="margin-left:2.75pt"><span style="font-size:18px"><span style="color:#FFFFFF">1. Donativo; d&aacute;diva; benef&iacute;cio.</span></span></p>
			</td>
			<td style="height:27px; width:299px">
			<p><span style="font-size:18px"><span style="color:#FFFFFF">1. Aptid&atilde;o natural ou adquirida.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:107px; width:302px">
			<p style="margin-left:2.75pt"><span style="font-size:18px"><span style="color:#FFFFFF">2. Prenda, dote natural.</span></span></p>

			<p style="margin-left:2.75pt"><span style="font-size:18px"><span style="color:#FFFFFF">Entendemos que dom &eacute; um presente de Deus; Vem na fase em que aceitamos a Jesus, e nos tornamos templo do Esp&iacute;rito Santo.</span></span></p>
			</td>
			<td style="height:107px; width:299px">
			<p>&nbsp;</p>

			<p><span style="font-size:18px"><span style="color:#FFFFFF">2 Engenho, disposi&ccedil;&atilde;o, habilidade;</span></span></p>

			<p><span style="font-size:18px"><span style="color:#FFFFFF">Na repeti&ccedil;&atilde;o &eacute; a habilidade de executar a tend&ecirc;ncia que h&aacute; em n&oacute;s;</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Cada ser humano est&aacute; sujeito a um determinado ciclo de vida. Thomas Edison, por exemplo, diz que talento &eacute; <em>&ldquo;1% inspira&ccedil;&atilde;o e 99% transpira&ccedil;&atilde;o&rdquo;. </em>Desta maneira, se crescemos em uma casa com grande fluxo de pessoas, certamente teremos o talento de organizar, acomodar e alimentar a todos. J&aacute; o dom, se manifesta na habilidade de receber pessoas, independente do fluxo na casa.</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Na CRIEP compreendemos que o &ldquo;ide&rdquo; de Jesus (Mc. 16.15) abrange a voca&ccedil;&atilde;o universal de pregar o evangelho, e atrav&eacute;s da combina&ccedil;&atilde;o de talentos e dons naturais dos disc&iacute;pulos, os dons espirituais s&atilde;o descobertos e desenvolvidos mediante o &ldquo;desempenho do servi&ccedil;o&rdquo; prestado em prol do Reino de Deus.</span></span></p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Devemos saber que os <strong><em>dons naturais v&ecirc;m de Deus </em></strong>e os talentos se desenvolvem ao longo do ciclo da vida. Embora estes dons e talentos ganhem corpo atrav&eacute;s da estrutura pessoal de cada indiv&iacute;duo e de suas respectivas rela&ccedil;&otilde;es familiares e sociais, o CDV traz o resgate da rota original dada por Deus para cada indiv&iacute;duo e determina que seus talentos e dons naturais sejam parte da miss&atilde;o de Deus para com a humanidade.</span></span></p>

<p>&nbsp;</p>

<h3><span style="font-size:18px"><span style="color:#FFFFFF"><strong>II.A DESCOBERTA DOS DONS ESPIRITUAIS</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Embora a B&iacute;blia n&atilde;o trate especificamente sobre a quest&atilde;o da descoberta dos dons espirituais (n&atilde;o h&aacute; na B&iacute;blia textos como: <em>&ldquo;E agora, irm&atilde;os, quero que sigais estes passos para poderdes descobrir os vossos dons espirituais&rdquo;</em>), n&atilde;o podemos esquecer que os dons s&atilde;o de grande import&acirc;ncia para o desempenho dos minist&eacute;rios na igreja local.</span></span></p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Para que isso ocorra, precisamos compreender a a&ccedil;&atilde;o vinda de Deus atrav&eacute;s do Esp&iacute;rito Santo nos ciclos da vida, e atrav&eacute;s do CDV tem-se uma &oacute;tima ferramenta pra favorecer comunidades locais com a finalidade de novas descobertas e reorienta&ccedil;&atilde;o do disc&iacute;pulo quanto &agrave; pr&aacute;tica do servi&ccedil;o crist&atilde;o.</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="font-size:18px"><span style="color:#FFFFFF">A din&acirc;mica de manifesta&ccedil;&atilde;o dos dons espirituais</span></span></li>
</ol>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Devemos saber que eles s&atilde;o direcionados a todos os disc&iacute;pulos de Cristo (nascidos de novo e que desejarem receb&ecirc;-los) e s&atilde;o aperfei&ccedil;oados atrav&eacute;s do Esp&iacute;rito Santo de Deus, n&atilde;o por nossos pr&oacute;prios m&eacute;ritos. &Eacute; nesta perspectiva que os dons espirituais s&atilde;o fundamentais para a edifica&ccedil;&atilde;o da igreja.</span></span></p>

<p>&nbsp;</p>

<ol style="list-style-type:lower-alpha">
	<li><span style="font-size:18px"><span style="color:#FFFFFF">Aspectos fundamentais dos dons espirituais</span></span></li>
</ol>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Em 1 Cor&iacute;ntios 12 encontramos cinco aspectos importantes acerca dos dons:</span></span></p>

<ul style="list-style-type:lower-alpha">
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>Diversidade </strong>(1 Co. 12.4-6) &ndash; Os dons visam suprir as necessidades da igreja, que &eacute; um corpo com muitos membros (disc&iacute;pulos de Jesus);</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>Utilidade </strong>(1 Co. 12.7) &ndash; Os dons existem n&atilde;o para nosso deleite particular, mas para proveito comum, para o crescimento da Igreja;</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>Origem </strong>(1 Co. 12.11) &ndash; Os dons v&ecirc;m &agrave; igreja, procedendo de Deus, por meio do Esp&iacute;rito Santo (Jo. 14.12,26; 16.13);</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>Distribui&ccedil;&atilde;o </strong>(1 Co. 12.11) &ndash; &Eacute; Deus quem distribui generosamente e de in&uacute;meros modos seus inesgot&aacute;veis dons ao ser humano;</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>Universalidade </strong>(1 Co. 12.8, 11, 28-30). Todos recebemos dons. N&atilde;o h&aacute; disc&iacute;pulos de Jesus sem dons.</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF">Condi&ccedil;&otilde;es pr&eacute;vias para descoberta dos dons espirituais</span></span></li>
</ul>
</div>

<p>&nbsp;</p>

<div>
<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Destacamos quatro condi&ccedil;&otilde;es pr&eacute;vias fundamentais para que se possa operar a descoberta dos dons espirituais:</span></span></p>

<ul>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>Ser</strong> <strong>crist&atilde;o</strong> <strong>regenerado:</strong> Os dons espirituais s&atilde;o conferidos exclusivamente aos membros do Corpo de Cristo.</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>Crer na atualidade dos dons espirituais: </strong>A maior parte dos crist&atilde;os que n&atilde;o creem nos dons espirituais est&aacute; nessa condi&ccedil;&atilde;o porque nunca recebeu instru&ccedil;&otilde;es, de maneira s&eacute;ria, a respeito.</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>Estar disposto a se envolver na igreja: </strong>H&aacute; um trabalho que Deus quer que voc&ecirc; cumpra no Corpo de Cristo, uma tarefa espec&iacute;fica para a qual Ele tem equipado voc&ecirc;.</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>Desenvolver</strong> <strong>seus</strong> <strong>dons:</strong> Busque a Deus sincera e intensamente, pedindo orienta&ccedil;&atilde;o, visto que Deus quer que voc&ecirc; descubra e desenvolva seus dons espirituais. Certamente, Ele o ajudar&aacute;.</span></span></li>
</ul>

<p>&nbsp;</p>

<h3><span style="font-size:18px"><span style="color:#FFFFFF"><strong>III.PASSOS PR&Aacute;TICOS PARA A DESCOBERTA DOS DONS ESPIRITUAIS</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">No CDV desenvolvemos um modelo pr&aacute;tico e moderno para descobrirmos nossos dons e encontrarmos nosso lugar no corpo de Cristo<em>, n&atilde;o se esquecendo da </em>busca em ora&ccedil;&atilde;o com humildade e submiss&atilde;o a Deus.</span></span></p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Na medida em que as demandas da igreja local v&atilde;o aparecendo, surgem oportunidades que nos possibilitam desenvolver os dons que possu&iacute;mos e promover a descoberta de novos dons. Abaixo destacamos alguns passos (dicas) para que voc&ecirc; possa &ldquo;encontrar&rdquo; seu dom:</span></span></p>

<ol>
	<li><span style="font-size:18px"><span style="color:#FFFFFF">Procure conhecer mais a respeito dos seus dons.</span></span>

	<ol style="list-style-type:lower-alpha">
		<li><span style="font-size:18px"><span style="color:#FFFFFF">Leia a B&iacute;blia com frequ&ecirc;ncia e observe que cada a&ccedil;&atilde;o tem um prop&oacute;sito de Deus.</span></span></li>
		<li><span style="font-size:18px"><span style="color:#FFFFFF">Leia livros sobre dons.</span></span></li>
		<li><span style="font-size:18px"><span style="color:#FFFFFF">Converse com pessoas que j&aacute; identificaram o seu dom.</span></span></li>
	</ol>
	</li>
</ol>

<p>&nbsp;</p>

<ol>
	<li><span style="font-size:18px"><span style="color:#FFFFFF">Envolva-se no maior n&uacute;mero poss&iacute;vel de &aacute;reas de modo que possa exercer seus dons.</span></span>

	<ol style="list-style-type:lower-alpha">
		<li><span style="font-size:18px"><span style="color:#FFFFFF">Fique atento no que mais &ldquo;te toca&rdquo; quanto ao cotidiano da igreja local.</span></span></li>
		<li><span style="font-size:18px"><span style="color:#FFFFFF">Se envolva com as atividades da igreja, mesmo sendo apenas um ponto de apoio.</span></span></li>
		<li><span style="font-size:18px"><span style="color:#FFFFFF">Olhe &agrave; sua volta, identificando necessidades, e depois tente fazer algo para supri-las.</span></span></li>
	</ol>
	</li>
</ol>

<p>&nbsp;</p>

<ol>
	<li><span style="font-size:18px"><span style="color:#FFFFFF">Observe se voc&ecirc; est&aacute; se realizando ao desempenhar seus dons.</span></span>

	<ol style="list-style-type:lower-alpha">
		<li><span style="font-size:18px"><span style="color:#FFFFFF">Nas atividades da igreja local, identifique o que voc&ecirc; faz com mais alegria e com bom desempenho (Sl. 37.4 e Fp. 2.13).</span></span></li>
		<li><span style="font-size:18px"><span style="color:#FFFFFF">Fazer o que Deus quer n&atilde;o &eacute; desagrad&aacute;vel, mas &eacute; obedi&ecirc;ncia. &Agrave;s vezes, come&ccedil;amos uma atividade em nossa igreja local que pode nos parecer desagrad&aacute;vel, mas logo adiante acaba se tornando apaixonante por descobrirmos aquilo que Deus quer de n&oacute;s!</span></span></li>
	</ol>
	</li>
</ol>

<p>&nbsp;</p>

<ol>
	<li><span style="font-size:18px"><span style="color:#FFFFFF">Adote avalia&ccedil;&atilde;o de resultados.</span></span>

	<ol style="list-style-type:lower-alpha">
		<li><span style="font-size:18px"><span style="color:#FFFFFF">Avalie os resultados da sua atividade.</span></span></li>
		<li><span style="font-size:18px"><span style="color:#FFFFFF">Bons resultados (continue!), maus resultados (aten&ccedil;&atilde;o!). Ex: Se voc&ecirc; tem o dom de evangelista, as pessoas aceitar&atilde;o a Cristo regularmente por meio do seu minist&eacute;rio.</span></span></li>
	</ol>
	</li>
</ol>
</div>

<p>&nbsp;</p>

<ol>
	<li><span style="font-size:18px"><span style="color:#FFFFFF">Confirma&ccedil;&atilde;o da Igreja &ndash; Observe os testemunhos.</span></span>

	<ol style="list-style-type:lower-alpha">
		<li><span style="font-size:18px"><span style="color:#FFFFFF">Cremos que, atrav&eacute;s da dire&ccedil;&atilde;o do Esp&iacute;rito Santo, cada disc&iacute;pulo possui pelo menos um dom. Assim, estar no banco pode ser uma oportunidade de exercer o dom da intercess&atilde;o, dar um abra&ccedil;o pode representar dom de miseric&oacute;rdia, um cumprimento de bom dia de forma alegre pode representar o dom de hospitalidade;</span></span></li>
		<li><span style="font-size:18px"><span style="color:#FFFFFF">Observe a confirma&ccedil;&atilde;o da igreja local quanto &agrave; atividade que voc&ecirc; exerce e seus resultados positivos a fim de confirmar o dom que possui.</span></span></li>
	</ol>
	</li>
</ol>

<p>&nbsp;</p>

<h3><span style="font-size:18px"><span style="color:#FFFFFF"><strong>CONCLUS&Atilde;O</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Conclu&iacute;mos nesta li&ccedil;&atilde;o que conhecer o dom, distribu&iacute;do atrav&eacute;s do Esp&iacute;rito Santo d&aacute; sentido &agrave; nossa pr&aacute;tica di&aacute;ria crist&atilde; e &agrave; continuidade do processo de servi&ccedil;o e evangeliza&ccedil;&atilde;o do mundo onde estamos inseridos.</span></span></p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Em outras palavras, como Christian A. Schwarz diz: &ldquo;<em>&Agrave; medida que os crist&atilde;os vivem de acordo com seus dons espirituais, eles n&atilde;o trabalham por seus pr&oacute;prios dons, mas pelo Esp&iacute;rito de Deus que trabalha neles&rdquo;. </em>Nas pr&oacute;ximas aulas trataremos especificamente sobre os dons espirituais e as respectivas ferramentas que auxiliar&atilde;o em seu desenvolvimento.</span></span></p>

      `,
    imagem: require('@/assets/images/cdv4.png'),
  },
  {
    titulo: 'Lição 5 - Os dons de serviço prático e a igreja',
    videoUrl: 'https://www.youtube.com/embed/0cNAqvWIqxQ?si=yb7fj2tCwGfUDpoI',
    descricao:
      `
      <div>
<h3><span style="font-size:18px"><span style="color:#FFFFFF"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Albert Einstein diz que. <em>&ldquo;[...]</em> <em>Todas</em> <em>as</em> <em>grandes</em> <em>descobertas</em> <em>realizam</em> <em>um</em> <em>salto</em>&rdquo;. Descobertas <em>&ldquo;do </em><em>que &eacute; o novo, ou do que pode ser aperfei&ccedil;oado&rdquo; </em>nos levam a um n&iacute;vel de excel&ecirc;ncia que qualifica nossa &ldquo;m&atilde;o de obra&rdquo; e gera em n&oacute;s a satisfa&ccedil;&atilde;o de fazer parte da miss&atilde;o de estabelecer o Reino de Deus na Terra.</span></span></p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">O desafio da igreja local &eacute; organizar uma estrutura que viabiliza a pr&aacute;tica dos dons de cada disc&iacute;pulo. Por este motivo nosso processo de integra&ccedil;&atilde;o e CDV buscam prover uma cultura que prepara os disc&iacute;pulos na luz da palavra de Deus para atender a demanda da sociedade e de alguma forma ser relevante no seu cotidiano.</span></span></p>

<p>&nbsp;</p>

<h3><span style="font-size:18px"><span style="color:#FFFFFF"><strong>I.CONHECENDO OS DONS NA PR&Aacute;TICA DE SERVI&Ccedil;OS</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">As principais passagens b&iacute;blicas sobre dons espirituais s&atilde;o:</span></span></p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Romanos 12.6-8; 2) 1 Cor&iacute;ntios 12.1-11, 3) 28-31; 4) Ef&eacute;sios 4.11; 5) Hebreus 2.4; e 6) 1 Pedro 4.10-11. Vamos refletir sobre cada um desses dons e suas respectivas caracter&iacute;sticas, conforme quadro a seguir:</span></span></p>

<p>&nbsp;</p>

<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td style="height:18px; width:30px">
			<p>&nbsp;</p>
			</td>
			<td style="height:18px; width:130px">
			<p style="margin-left:.35pt"><span style="font-size:18px"><span style="color:#FFFFFF"><strong>DONS</strong></span></span></p>
			</td>
			<td style="height:18px; width:211px">
			<p style="margin-left:29.8pt"><span style="font-size:18px"><span style="color:#FFFFFF"><strong>FORMA DE ATUA&Ccedil;&Atilde;O</strong></span></span></p>
			</td>
			<td style="height:18px; width:232px">
			<p style="margin-left:45.95pt"><span style="font-size:18px"><span style="color:#FFFFFF"><strong>CARACTER&Iacute;STICAS</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:174px; width:30px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:5.35pt"><span style="font-size:18px"><span style="color:#FFFFFF">1</span></span></p>
			</td>
			<td style="height:174px; width:130px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:.35pt"><span style="font-size:18px"><span style="color:#FFFFFF">Profecia</span></span></p>
			</td>
			<td style="height:174px; width:211px">
			<p style="margin-left:5.2pt"><span style="font-size:18px"><span style="color:#FFFFFF">Ouve a Deus e transmite uma mensagem p&uacute;blica que revela a justi&ccedil;a e/ou injusti&ccedil;a, atrav&eacute;s de uma revela&ccedil;&atilde;o especial ou atrav&eacute;s da B&iacute;blia.</span></span></p>
			</td>
			<td style="height:174px; width:232px">
			<p style="margin-left:9.8pt"><span style="font-size:18px"><span style="color:#FFFFFF">Conduz as pessoas a verem Cristo e as realidades espirituais com mais clareza; Ajuda as pessoas a receberem as orienta&ccedil;&otilde;es de Deus, fortalecendo sua convic&ccedil;&atilde;o na perspectiva b&iacute;blica para superar momentos dif&iacute;ceis.</span></span></p>
			</td>
		</tr>
	</tbody>
</table>
</div>

<p>&nbsp;</p>

<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td style="height:176px; width:30px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p><span style="font-size:18px"><span style="color:#FFFFFF">2</span></span></p>
			</td>
			<td style="height:176px; width:130px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:.35pt"><span style="font-size:18px"><span style="color:#FFFFFF">Servi&ccedil;o</span></span></p>
			</td>
			<td style="height:176px; width:211px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:5.8pt"><span style="font-size:18px"><span style="color:#FFFFFF">Supre as necessidades da igreja atrav&eacute;s de realiza&ccedil;&atilde;o de projetos e servi&ccedil;os na igreja.</span></span></p>
			</td>
			<td style="height:176px; width:232px">
			<p style="margin-left:9.3pt"><span style="font-size:18px"><span style="color:#FFFFFF">Compreende as necessidades pr&aacute;ticas e toma iniciativa para supri-las rapidamente. Fica frustrado quando isto n&atilde;o &eacute; poss&iacute;vel; Assume a responsabilidade para fazer do seu jeito e se envolve em outras atividades por &ldquo;n&atilde;o saber dizer</span></span></p>

			<p style="margin-left:6.55pt"><span style="font-size:18px"><span style="color:#FFFFFF">n&atilde;o&rdquo;.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:117px; width:30px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p><span style="font-size:18px"><span style="color:#FFFFFF">3</span></span></p>
			</td>
			<td style="height:117px; width:130px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:.35pt"><span style="font-size:18px"><span style="color:#FFFFFF">Ensino</span></span></p>
			</td>
			<td style="height:117px; width:211px">
			<p>&nbsp;</p>

			<p style="margin-left:5.55pt"><span style="font-size:18px"><span style="color:#FFFFFF">Procura sistematizar e explicar a verdade b&iacute;blica para as pessoas apreci&aacute;-las, entend&ecirc;-</span></span></p>

			<p style="margin-left:5.55pt"><span style="font-size:18px"><span style="color:#FFFFFF">las e us&aacute;-las.</span></span></p>
			</td>
			<td style="height:117px; width:232px">
			<p style="margin-left:10.65pt"><span style="font-size:18px"><span style="color:#FFFFFF">Cria alicerce e ajuda no crescimento e amadurecimento da f&eacute; crist&atilde;; Incentiva o discipulado entre as pessoas.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:206px; width:30px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p><span style="font-size:18px"><span style="color:#FFFFFF">4</span></span></p>
			</td>
			<td style="height:206px; width:130px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:.35pt"><span style="font-size:18px"><span style="color:#FFFFFF">Exorta&ccedil;&atilde;o</span></span></p>
			</td>
			<td style="height:206px; width:211px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:8.2pt"><span style="font-size:18px"><span style="color:#FFFFFF">Estimula e encoraja as pessoas a seguirem os prop&oacute;sitos de Deus e a experimentar verdades divinas.</span></span></p>
			</td>
			<td style="height:206px; width:232px">
			<p style="margin-left:10.0pt"><span style="font-size:18px"><span style="color:#FFFFFF">Dirige palavras de &acirc;nimo, consolo, conforto mediante &agrave;s fragilidades emocional e espiritual estimulando &agrave; a&ccedil;&atilde;o (1 Ts. 5. 11 e 2.12);</span></span></p>

			<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Participa de aconselhamentos com frequ&ecirc;ncia, fortalece o novo convertido e tem otimismo mediante as tribula&ccedil;&otilde;es que conduzem &agrave; maturidade.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:152px; width:30px">
			<p>&nbsp;</p>

			<p><span style="font-size:18px"><span style="color:#FFFFFF">5</span></span></p>
			</td>
			<td style="height:152px; width:130px">
			<p>&nbsp;</p>

			<p style="margin-left:.35pt"><span style="font-size:18px"><span style="color:#FFFFFF">Contribui&ccedil;&atilde;o</span></span></p>
			</td>
			<td style="height:152px; width:211px">
			<p style="margin-left:5.45pt"><span style="font-size:18px"><span style="color:#FFFFFF">Doa&ccedil;&atilde;o e liberalidade para contribuir com recursos pessoais para ajudar a superar dificuldades e realiza&ccedil;&otilde;es ministeriais.</span></span></p>
			</td>
			<td style="height:152px; width:232px">
			<p style="margin-left:7.5pt"><span style="font-size:18px"><span style="color:#FFFFFF">Partilha aquilo que tem com alegria e sua primeira rea&ccedil;&atilde;o sempre &eacute; de contribuir mediante a necessidade material; Percebe quando e onde Deus quer usar os bens que est&atilde;o sob sua responsabilidade.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:147px; width:30px">
			<p>&nbsp;</p>

			<p><span style="font-size:18px"><span style="color:#FFFFFF">6</span></span></p>
			</td>
			<td style="height:147px; width:130px">
			<p>&nbsp;</p>

			<p style="margin-left:18.1pt"><span style="font-size:18px"><span style="color:#FFFFFF">Presidir (Lideran&ccedil;a)</span></span></p>
			</td>
			<td style="height:147px; width:211px">
			<p style="margin-left:7.85pt"><span style="font-size:18px"><span style="color:#FFFFFF">Lideran&ccedil;a para ajudar a equipe a perceber seus prop&oacute;sitos e vis&atilde;o de Deus, e mobiliza-os para execu&ccedil;&atilde;o.</span></span></p>
			</td>
			<td style="height:147px; width:232px">
			<p style="margin-left:5.7pt"><span style="font-size:18px"><span style="color:#FFFFFF">Assume sua lideran&ccedil;a que &eacute; reconhecida pelos seus liderados; &Eacute; uma pessoa de vis&atilde;o, que estrutura e esclarece para as pessoas e tem disposi&ccedil;&atilde;o para se responsabilizar por outras pessoas.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:154px; width:30px">
			<p>&nbsp;</p>

			<p><span style="font-size:18px"><span style="color:#FFFFFF">7</span></span></p>
			</td>
			<td style="height:154px; width:130px">
			<p>&nbsp;</p>

			<p style="margin-left:.35pt"><span style="font-size:18px"><span style="color:#FFFFFF">Miseric&oacute;rdia</span></span></p>
			</td>
			<td style="height:154px; width:211px">
			<p style="margin-left:8.2pt"><span style="font-size:18px"><span style="color:#FFFFFF">Identifica-se e Responde &agrave;s car&ecirc;ncias de pessoas aflitas ou necessitadas.</span></span></p>
			</td>
			<td style="height:154px; width:232px">
			<p style="margin-left:5.7pt"><span style="font-size:18px"><span style="color:#FFFFFF">Tem alegria de trabalhar com pessoas marginalizadas e/ou ignoradas pela maioria; Gosta de visitar hospitais ou lares de pessoas necessitadas se sentindo agente aben&ccedil;oado e aben&ccedil;oador.</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<div style="clear:both;">&nbsp;</div>

<p>&nbsp;</p>

<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td style="height:141px; width:30px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:5.35pt"><span style="font-size:18px"><span style="color:#FFFFFF">8</span></span></p>
			</td>
			<td style="height:141px; width:130px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:24.7pt"><span style="font-size:18px"><span style="color:#FFFFFF">Administra&ccedil;&atilde;o (Governo)</span></span></p>
			</td>
			<td style="height:141px; width:211px">
			<p style="margin-left:8.2pt"><span style="font-size:18px"><span style="color:#FFFFFF">Tra&ccedil;a e executa planos eficazes para resolver problemas.</span></span></p>
			</td>
			<td style="height:141px; width:232px">
			<p style="margin-left:7.0pt"><span style="font-size:18px"><span style="color:#FFFFFF">Tem facilidade para organizar ideias visando um servi&ccedil;o mais eficaz; Procura solu&ccedil;&otilde;es pr&aacute;ticas para os problemas enfrentados e interpreta ideias e objetivos do grupo, pensando em meios de coloc&aacute;-los em pr&aacute;tica.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:154px; width:30px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:5.35pt"><span style="font-size:18px"><span style="color:#FFFFFF">9</span></span></p>
			</td>
			<td style="height:154px; width:130px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:29.7pt"><span style="font-size:18px"><span style="color:#FFFFFF">Socorro</span></span></p>
			</td>
			<td style="height:154px; width:211px">
			<p>&nbsp;</p>

			<p style="margin-left:5.55pt"><span style="font-size:18px"><span style="color:#FFFFFF">Ajuda as pessoas investindo tempo, talento para o corpo de Cristo permanecer sadio e produtivo (1 Co 12.28).</span></span></p>
			</td>
			<td style="height:154px; width:232px">
			<p style="margin-left:9.2pt"><span style="font-size:18px"><span style="color:#FFFFFF">Ajuda l&iacute;deres sobrecarregados e fica &agrave; vontade em fazer tarefas auxiliares; Providencia certos trabalhos para a igreja atingir seus objetivos.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:209px; width:30px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:5.35pt"><span style="font-size:18px"><span style="color:#FFFFFF">10</span></span></p>
			</td>
			<td style="height:209px; width:130px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:5.25pt"><span style="font-size:18px"><span style="color:#FFFFFF">Hospitalidade</span></span></p>
			</td>
			<td style="height:209px; width:211px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:.3pt"><span style="font-size:18px"><span style="color:#FFFFFF">Acolhe com alegria as pessoas calorosamente e providencia abrigo e alimentos.</span></span></p>
			</td>
			<td style="height:209px; width:232px">
			<p style="margin-left:6.2pt"><span style="font-size:18px"><span style="color:#FFFFFF">Abre sua casa e faz a pessoa se sentir da fam&iacute;lia. Procura meios para acolher bem as pessoas at&eacute; elas se sentirem a vontade; Preocupa-se com os visitantes da igreja e procura atender as necessidades daqueles que chegam &agrave; igreja ou em casa. (1 Pe. 4.9; Rm. 12.13).</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:135px; width:30px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:5.35pt"><span style="font-size:18px"><span style="color:#FFFFFF">11</span></span></p>
			</td>
			<td style="height:135px; width:130px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:5.25pt"><span style="font-size:18px"><span style="color:#FFFFFF">Intercess&atilde;o</span></span></p>
			</td>
			<td style="height:135px; width:211px">
			<p>&nbsp;</p>

			<p style="margin-left:5.6pt"><span style="font-size:18px"><span style="color:#FFFFFF">Ora&ccedil;&atilde;o e s&uacute;plica por extensos per&iacute;odos de tempo e recebem respostas &agrave;s ora&ccedil;&otilde;es</span></span></p>
			</td>
			<td style="height:135px; width:232px">
			<p style="margin-left:6.55pt"><span style="font-size:18px"><span style="color:#FFFFFF">Desejo de orar frequentemente, seja em casa ou &ldquo;informalmente&rdquo; durante o dia; Separa um tempo a s&oacute;s com Deus e intercede pelas pessoas.</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

      `,
    imagem: require('@/assets/images/cdv5.png'),
  },
  {
    titulo: 'Lição 6 - Os dons de ministério e a prática excelente',
    videoUrl: 'https://www.youtube.com/embed/UGEjmcza0aI?si=IJ0UdOHPU5A9sVyl',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">A igreja &eacute; composta por pessoas que se re&uacute;nem na luz da palavra de Deus para definir local, espa&ccedil;o e estrutura organizacional e eclesial e como comunidade de disc&iacute;pulos de Jesus Cristo, caminha rumo &agrave; perfei&ccedil;&atilde;o.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Mas para que isso aconte&ccedil;a, torna-se necess&aacute;rio que alguns disc&iacute;pulos sejam formadores espirituais para desenvolver servi&ccedil;os com excel&ecirc;ncia, gerando atrav&eacute;s dos minist&eacute;rios um ambiente acolhedor, agrad&aacute;vel e saud&aacute;vel.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>I.CONHECENDO OS CINCO DONS NA &Aacute;REA DE MINIST&Eacute;RIO</strong></span></span></h3>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Em Ef&eacute;sios 4.11 s&atilde;o apresentadas as cinco &aacute;reas-chave de minist&eacute;rios da igreja. Vamos refletir sobre cada uma delas:</span></span></p>

<p>&nbsp;</p>

<table border="0" cellpadding="0" cellspacing="6">
	<tbody>
		<tr>
			<td style="height:19px; width:25px">
			<p>&nbsp;</p>
			</td>
			<td style="height:19px; width:117px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>DONS</strong></span></span></p>
			</td>
			<td style="height:19px; width:221px">
			<p style="margin-left:29.7pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>FORMA</strong> <strong>DE</strong> <strong>ATUA&Ccedil;&Atilde;O</strong></span></span></p>
			</td>
			<td style="height:19px; width:223px">
			<p style="margin-left:37.75pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CARACTER&Iacute;STICAS</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:215px; width:25px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:1.85pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1</strong></span></span></p>
			</td>
			<td style="height:215px; width:117px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:11.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ap&oacute;stolo (N&atilde;o consagramos Ap&oacute;stolo)</span></span></p>
			</td>
			<td style="height:215px; width:221px">
			<p style="margin-left:5.2pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; o obreiro apost&oacute;lico enviado com autoridade e poder para comunicar as Boas-Novas do Reino de Deus resultando na forma&ccedil;&atilde;o e funda&ccedil;&atilde;o de igrejas. Este apostolado tamb&eacute;m pode contribuir com outras igrejas com fundamentos bons quanto &agrave; s&atilde; doutrina e ao governo saud&aacute;vel.</span></span></p>

			<p style="margin-left:.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">(Ef. 4.11; 1 Co. 12.28).</span></span></p>
			</td>
			<td style="height:215px; width:223px">
			<p>&nbsp;</p>

			<p style="margin-left:5.1pt"><span style="color:#FFFFFF"><span style="font-size:18px">Fica empolgado com trabalhos mission&aacute;rios urbanos, regionais e no exterior. Adapta-se em situa&ccedil;&otilde;es diferentes para evangelizar; coopera com trabalhos pioneiros e atrav&eacute;s da ampla vis&atilde;o do Reino de Deus, olha al&eacute;m da sua denomina&ccedil;&atilde;o.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:176px; width:25px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:1.85pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2</strong></span></span></p>
			</td>
			<td style="height:176px; width:117px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p><span style="color:#FFFFFF"><span style="font-size:18px">Profeta</span></span></p>
			</td>
			<td style="height:176px; width:221px">
			<p style="margin-left:7.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Prega&ccedil;&atilde;o e/ou declara&ccedil;&atilde;o inspirada por algu&eacute;m chamado para proclamar a verdade de Deus. Este chamado acontece atrav&eacute;s da Prega&ccedil;&atilde;o, (1 Co.</span></span></p>

			<p><span style="color:#FFFFFF"><span style="font-size:18px">14.24-25), revela&ccedil;&atilde;o espec&iacute;fica</span></span></p>

			<p style="margin-left:.05pt"><span style="color:#FFFFFF"><span style="font-size:18px">(1 Tm. 4.14), conselhos</span></span></p>

			<p style="margin-left:30.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">profundos (At 15.32), advert&ecirc;ncia acerca de</span></span></p>
			</td>
			<td style="height:176px; width:223px">
			<p style="margin-left:3.5pt"><span style="color:#FFFFFF"><span style="font-size:18px">Sua mensagem &eacute; baseada na escritura, aceita, discernida e anunciada rigorosamente; mensageiro designado por Deus com poder e autoridade; sua express&atilde;o &eacute; incisiva, franca e persuasiva; usa a B&iacute;blia como b&uacute;ssola para repreens&atilde;o e</span></span></p>

			<p><span style="color:#FFFFFF"><span style="font-size:18px">corre&ccedil;&atilde;o do caminho.</span></span></p>
			</td>
		</tr>
	</tbody>
</table>
</div>

<p>&nbsp;</p>

<table border="0" cellpadding="0" cellspacing="6">
	<tbody>
		<tr>
			<td style="height:156px; width:25px">
			<p>&nbsp;</p>
			</td>
			<td style="height:156px; width:117px">
			<p>&nbsp;</p>
			</td>
			<td style="height:156px; width:221px">
			<p style="margin-left:4.6pt"><span style="color:#FFFFFF"><span style="font-size:18px">problemas futuros (At. 11.27-30; 21.10-26) e at&eacute; mesmo ora&ccedil;&atilde;o (1 Tm. 4.14).</span></span></p>

			<p style="margin-left:3.4pt"><span style="color:#FFFFFF"><span style="font-size:18px">No Novo Testamento n&atilde;o tem car&aacute;ter preditivo (primariamente). Objetivo: exortar, consolar e edificar (1 Co.</span></span></p>

			<p><span style="color:#FFFFFF"><span style="font-size:18px">14.3).</span></span></p>
			</td>
			<td style="height:156px; width:223px">
			<p style="margin-left:2.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">Note uma diferen&ccedil;a: o profeta &eacute; uma pessoa dada &agrave; igreja e profecia &eacute; um dom dado &agrave; pessoa (vide li&ccedil;&atilde;o anterior).</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:156px; width:25px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:1.85pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3</strong></span></span></p>
			</td>
			<td style="height:156px; width:117px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p><span style="color:#FFFFFF"><span style="font-size:18px">Evangelista</span></span></p>
			</td>
			<td style="height:156px; width:221px">
			<p style="margin-left:7.95pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; o pregador que tem paix&atilde;o em partilhar as boas novas com pessoas n&atilde;o evang&eacute;licas de tal forma que se tornem disc&iacute;pulos e respons&aacute;veis para evangelizar outros.</span></span></p>
			</td>
			<td style="height:156px; width:223px">
			<p style="margin-left:4.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Tem facilidade em iniciar conversas com estranhos e gosta de conduzi-la &agrave; convers&atilde;o; se preocupa com parentes, vizinhos e colegas que n&atilde;o conhecem a Cristo e gosta de cooperar com trabalhos</span></span></p>

			<p style="margin-left:2.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">evangel&iacute;sticos.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:137px; width:25px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:1.85pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>4</strong></span></span></p>
			</td>
			<td style="height:137px; width:117px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:.1pt"><span style="color:#FFFFFF"><span style="font-size:18px">Pastor</span></span></p>
			</td>
			<td style="height:137px; width:221px">
			<p style="margin-left:10.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o ministro do amor de Deus, ele possui paix&atilde;o em discipular, equipar, guiar a ovelha no caminho saud&aacute;vel individual e m&uacute;tuo, e a se reproduzirem.</span></span></p>
			</td>
			<td style="height:137px; width:223px">
			<p style="margin-left:5.55pt"><span style="color:#FFFFFF"><span style="font-size:18px">Preocupa-se em restabelecer o indiv&iacute;duo e sente a necessidade de levar o crescimento individual e coletivo das pessoas; tem prazer de prover alimento ao pr&oacute;ximo atrav&eacute;s da</span></span></p>

			<p style="margin-left:2.65pt"><span style="color:#FFFFFF"><span style="font-size:18px">palavra de Deus.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:262px; width:25px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:1.85pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>5</strong></span></span></p>
			</td>
			<td style="height:262px; width:117px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:.05pt"><span style="color:#FFFFFF"><span style="font-size:18px">Mestre</span></span></p>
			</td>
			<td style="height:262px; width:221px">
			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p style="margin-left:4.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; o mestre que procura, sistematiza e apresenta as verdades da Palavra de Deus, de tal forma que outros aprendam.</span></span></p>
			</td>
			<td style="height:262px; width:223px">
			<p style="margin-left:4.5pt"><span style="color:#FFFFFF"><span style="font-size:18px">Tem discernimento pedag&oacute;gico da palavra de Deus e juntamente com a busca profunda do conhecimento das escrituras, formula uma mensagem de ensino atraente e respons&aacute;vel. N&atilde;o gosta de ficar preso ao ensino preparado por outros, preferindo expor o assunto baseado no seu pr&oacute;prio estudo.</span></span></p>

			<p style="margin-left:10.6pt"><span style="color:#FFFFFF"><span style="font-size:18px">Note uma diferen&ccedil;a: O mestre &eacute; uma pessoa dada &agrave; igreja e o ensino &eacute; um dom dado &agrave; pessoa</span></span></p>

			<p style="margin-left:2.55pt"><span style="color:#FFFFFF"><span style="font-size:18px">(vide li&ccedil;&atilde;o anterior).</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Com efeito, quando estes dons de lideran&ccedil;a s&atilde;o exercitados pela comunidade local, s&atilde;o gerados os seguintes resultados pr&aacute;ticos (Ef. 4.13-16):</strong></span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Uma vis&atilde;o espiritual &uacute;nica (v. 13);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Maturidade espiritual dos disc&iacute;pulos (v. 14);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Relacionamentos saud&aacute;veis, marcados pelo amor e verdade (v.15).</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Responsabilidade m&uacute;tua (v. 16).</span></span></li>
</ol>

      `,
    imagem: require('@/assets/images/cdv6.png'),
  },
  {
    titulo: 'Lição 7 - A importância dos talentos naturais',
    videoUrl: 'https://www.youtube.com/embed/LGVvLI1cmjU?si=mkpPo-_JGbBJn-nG',
    descricao:
      `
      <div>
<h5><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Benjamim Franklin disse: <em>&ldquo;N&atilde;o esconda os seus talentos. Para o uso eles foram feitos.&rdquo; </em>Em Mateus 25.14-30, Jesus conta a par&aacute;bola de um homem que ao sair em viagem chama seus tr&ecirc;s servos e confia-lhes seus bens (talentos) de forma diversa a cada um.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ao retornar depois de muito tempo, este homem verifica que o servo que havia recebido cinco talentos os multiplicou por mais cinco, o que recebera dois talentos os investiu obtendo mais dois e o &uacute;ltimo servo, este com muito medo, cavou o &uacute;nico talento que recebeu, e por consequ&ecirc;ncia desta atitude acabou ficando sem talento algum.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Devemos saber que os talentos que possu&iacute;mos n&atilde;o devem ser negligenciados e sim utilizados em prol do Reino. Nesta li&ccedil;&atilde;o voc&ecirc; aprender&aacute; sobre os conceitos certos e errados a respeito dos talentos naturais al&eacute;m de identificar as principais habilidades que possui.</span></span></p>

<p>&nbsp;</p>

<h5><span style="color:#FFFFFF"><span style="font-size:18px"><strong>I.TALENTO X DOM</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Talento &eacute; habilidade, destreza, intelig&ecirc;ncia. &Eacute; a aptid&atilde;o natural que nos faz agir de determinadas maneiras diante de situa&ccedil;&otilde;es do dia a dia. Durante a constitui&ccedil;&atilde;o do feto, bilh&otilde;es de conex&otilde;es neuronais s&atilde;o formadas no c&eacute;rebro. At&eacute; os 3 anos de idade muitas dessas conex&otilde;es s&atilde;o naturalmente eliminadas, de acordo com est&iacute;mulos dos primeiros anos de vida. Esse conjunto de conex&otilde;es que persiste &eacute; respons&aacute;vel pelas possibilidades de comportamento, atitudes, pensamentos e sensa&ccedil;&otilde;es do indiv&iacute;duo, ou seja, s&atilde;o seus talentos mais dominantes.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Dom n&atilde;o &eacute; talento! Todas as pessoas possuem talentos, mas s&oacute; os <strong>crist&atilde;os regenerados (Aula 4) </strong>t&ecirc;m dons espirituais. Veja, cantar &eacute; um talento natural, encorajar os outros por meio do louvor &eacute; um dom. Ensinar &eacute; um talento, mas o ensino de maneira que as pessoas entendam e vivam a revela&ccedil;&atilde;o da Palavra &eacute; dom. Dom e Talento em opera&ccedil;&atilde;o conjunta, proezas acontecer&atilde;o na igreja local.</span></span></p>
</div>

<p>&nbsp;</p>

<h5><span style="color:#FFFFFF"><span style="font-size:18px"><strong>II.4 CONCEITOS ERRADOS SOBRE TALENTOS/HABILIDADES</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o &eacute; mais importante distinguir dons de talentos, do que us&aacute;-los para edifica&ccedil;&atilde;o do Corpo de Cristo e gl&oacute;ria de Deus (Cl. 3.17; 1 Pe. 4.10-11). No entanto, algumas pessoas possuem <strong>conceitos</strong> <strong>errados</strong> sobre talentos e habilidades, os quais passamos a destacar:</span></span></p>

<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong><em>As pessoas n&atilde;o nascem com habilidades, elas aprendem a partir da experi&ecirc;ncia. </em></strong>Simplesmente isto n&atilde;o &eacute; verdade. Existe um bom n&uacute;mero de habilidades que parecem ser cong&ecirc;nitas e desenvolvidas muito cedo na inf&acirc;ncia. Quando as pessoas dizem: &ldquo;Ele parece ter um talento natural&rdquo;. Isto provavelmente &eacute; verdade.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong><em>Se</em></strong> <strong><em>voc&ecirc;</em></strong> <strong><em>tem</em></strong> <strong><em>certas</em></strong> <strong><em>habilidades,</em></strong> <strong><em>voc&ecirc;</em></strong> <strong><em>percebe</em></strong> <strong><em>que</em></strong> <strong><em>as</em></strong> <strong><em>t&ecirc;m. </em></strong>Isto tamb&eacute;m n&atilde;o &eacute; verdade. Provavelmente voc&ecirc; usa alguns talentos ou habilidades os quais n&atilde;o percebe que possui. Voc&ecirc; precisa de um processo para identific&aacute;-las.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong><em>Habilidades que eu uso para trabalhar s&atilde;o usadas somente naquele ambiente, </em></strong><strong><em>n&atilde;o poderia us&aacute;-las no minist&eacute;rio. </em></strong>Ao final deste curso, voc&ecirc; ver&aacute; o engano desta ideia. Seja criativo.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong><em>Muitas pessoas t&ecirc;m poucas habilidades.</em></strong> Isto tamb&eacute;m n&atilde;o &eacute; verdade! A verdade &eacute; que muitas pesquisas t&ecirc;m demonstrado certa propor&ccedil;&atilde;o de pessoas que possuem de 500-700 habilidades diferentes.</span></span></li>
</ol>

      `,
    imagem: require('@/assets/images/cdv7.png'),
  },
  {
    titulo: 'Lição 8 - A vocação e o chamado divino',
    videoUrl: 'https://www.youtube.com/embed/mzxQ6vxRwUI?si=Xo57p5F4LnsIJHcx',
    descricao:
      `
      <div>
<h5><span style="font-size:18px"><span style="color:#FFFFFF"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Voca&ccedil;&atilde;o &eacute; um termo derivado do verbo no latim &ldquo;vocare&rdquo; que significa &ldquo;chamar&rdquo;. &Eacute; uma inclina&ccedil;&atilde;o ou tend&ecirc;ncia que leva o indiv&iacute;duo a exercer uma determinada carreira ou profiss&atilde;o. &Eacute; uma compet&ecirc;ncia que estimula &agrave; pr&aacute;tica de atividades que est&atilde;o associadas aos seus desejos de seguir determinado caminho.</span></span></p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Na B&iacute;blia, o termo voca&ccedil;&atilde;o &eacute; sin&ocirc;nimo de chamado (procedente de Deus) e aparece no Novo Testamento 148 vezes possuindo origem no voc&aacute;bulo grego &ldquo;kaleo&rdquo;, al&eacute;m de ter o mesmo significado de que a vontade de Deus.</span></span></p>

<p>&nbsp;</p>

<h5><span style="font-size:18px"><span style="color:#FFFFFF"><strong>I.DEDICADOS &Agrave; VOCA&Ccedil;&Atilde;O DIVINA</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Cada crist&atilde;o &eacute; vocacionado para um servi&ccedil;o espiritual<em>, </em>mas a principal <em>&ldquo;voca&ccedil;&atilde;o divina&rdquo; </em>&eacute; ser disc&iacute;pulo de Jesus. O disc&iacute;pulo &eacute; vocacionado para o servi&ccedil;o, havendo grande necessidade da implementa&ccedil;&atilde;o dessa ideia central por parte da comunidade crist&atilde;.</span></span></p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Em rela&ccedil;&atilde;o ao servi&ccedil;o crist&atilde;o, <strong><em>nosso</em></strong> <strong><em>chamado &eacute; definido</em></strong> <strong><em>pelo dom</em></strong> <strong><em>espiritual que temos</em></strong>. Assim, a voca&ccedil;&atilde;o apresenta-se como a reinterpreta&ccedil;&atilde;o da vontade de Deus para n&oacute;s, em harmonia com a maneira humana livre de agir implicando na auto realiza&ccedil;&atilde;o do disc&iacute;pulo de Cristo.</span></span></p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Desta forma, quando decidimos fazer de nossa vida uma voca&ccedil;&atilde;o, aceitamos a inspira&ccedil;&atilde;o divina como op&ccedil;&atilde;o de vida ao inv&eacute;s de viver um ju&iacute;zo de filosofia e passamos a viver como pessoas <strong>chamadas </strong>e <strong>n&atilde;o obrigadas</strong>!</span></span></p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF"><strong>Quando vivemos como pessoas obrigadas:</strong></span></span></p>

<ol>
	<li><span style="font-size:18px"><span style="color:#FFFFFF">Nos sentimos pressionados por outros;</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF">N&atilde;o sabemos onde encontrar a for&ccedil;a para fazer tudo o que precisa fazer, e</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF">Temos o desejo de escapar do compromisso de alguma maneira. J&aacute; quando passamos a viver como pessoas chamadas:</span></span>
	<ol>
		<li><span style="font-size:18px"><span style="color:#FFFFFF">Sentimos a dire&ccedil;&atilde;o clara de Deus, nos trazendo for&ccedil;a, orienta&ccedil;&atilde;o e alegria na vida;</span></span></li>
	</ol>
	</li>
</ol>
</div>

<p>&nbsp;</p>

<div>
<ol>
	<li><span style="font-size:18px"><span style="color:#FFFFFF">Percebemos que o tempo acompanha os prop&oacute;sitos de Deus;</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF">Come&ccedil;amos e terminamos o dia com alegria, certos do que Deus nos orientou a fazer e agradecendo a Ele pelo que nos confiou como tarefa.</span></span></li>
</ol>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Hoje, o grande desafio do disc&iacute;pulo de Cristo &eacute; viver como uma pessoa chamada. Na maioria das vezes nos sentimos &ldquo;obrigados&rdquo; a servir aos outros em virtude de vivermos a &ldquo;tirania do urgente&rdquo; que faz com que percamos a import&acirc;ncia do que realmente &eacute; prioridade em nossas vidas.</span></span></p>

<p>&nbsp;</p>

<h5><span style="font-size:18px"><span style="color:#FFFFFF"><strong>II.O CHAMADO DA SALVA&Ccedil;&Atilde;O E DO SERVI&Ccedil;O</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Mas quantos chamados existem? Um? Dois? Existe um chamado geral que &eacute; para o arrependimento ou salva&ccedil;&atilde;o e outro espec&iacute;fico que &eacute; para o servi&ccedil;o? Veja abaixo em 2 Co. 5.18-20:</span></span></p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF"><em>&ldquo;Mas todas as coisas prov&ecirc;m de Deus, que nos reconciliou consigo mesmo por Cristo, e nos confiou o minist&eacute;rio da reconcilia&ccedil;&atilde;o; pois que Deus estava em Cristo reconciliando consigo o mundo, n&atilde;o imputando aos homens as suas transgress&otilde;es; e nos encarregou da palavra da reconcilia&ccedil;&atilde;o. De sorte que somos embaixadores por Cristo, como se Deus por n&oacute;s vos exortasse. Rogamos-vos, pois, por Cristo que vos reconcilieis com Deus&rdquo; (2 Co. 5.18-20).</em></span></span></p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Existe apenas um chamado divino, mas que &eacute; duplo, pois ocorrem:</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>Salva&ccedil;&atilde;o: </strong>(&ldquo;Deus, que nos reconciliou consigo mesmo&rdquo;) e;</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>Servi&ccedil;o: </strong>(&ldquo;nos confiou o minist&eacute;rio da reconcilia&ccedil;&atilde;o&rdquo;, &ldquo;nos encarregou da palavra de reconcilia&ccedil;&atilde;o&rdquo;)</span></span></li>
</ol>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">Diante disto, n&atilde;o pode haver um chamado para a salva&ccedil;&atilde;o sem que haja o chamado para o servi&ccedil;o. Somos embaixadores de Cristo e temos uma miss&atilde;o: ser e fazer disc&iacute;pulos!</span></span></p>

<p>&nbsp;</p>

<h5><span style="font-size:18px"><span style="color:#FFFFFF"><strong>III.O PAPEL DE DEUS EM NOSSA VOCA&Ccedil;&Atilde;O</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">&Eacute; Deus quem toma a <strong>iniciativa,</strong> nos <strong>capacita</strong> e nos <strong>delega</strong> autoridade. Ele leva em conta nossas caracter&iacute;sticas individuais, como &ldquo;temperamento&rdquo; e &ldquo;personalidade&rdquo; (Jo. 15.16; Ef. 1.11), valoriza nossos talentos e dons (2 Co. 3.4-6; Cl. 1.27), al&eacute;m de nos legitimar para anunciar as boas novas do evangelho (Jo 12.49-50; Mt 16.19-20).</span></span></p>

<p>&nbsp;</p>

<h5><span style="font-size:18px"><span style="color:#FFFFFF"><strong>CONCLUS&Atilde;O</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF">A nossa voca&ccedil;&atilde;o &eacute; uma a&ccedil;&atilde;o da vontade livre e pessoal de Deus, &eacute; a manifesta&ccedil;&atilde;o do ato de sua vontade benevolente e que jamais anula nosso livre-arb&iacute;trio.</span></span></p>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF"><em>&ldquo;Ningu&eacute;m</em> <em>pode</em> <em>jamais</em> <em>fazer</em> <em>todo</em> <em>o</em> <em>seu</em> <em>trabalho</em> <em>por</em> <em>voc&ecirc;.</em> <em>Deus</em> <em>lhe</em> <em>deu</em> <em>um</em> <em>ambiente</em> <em>especial </em><em>e um conjunto espec&iacute;fico de experi&ecirc;ncias da Sua fidelidade, al&eacute;m de uma personalidade, e Ele investiu a Sua miseric&oacute;rdia e gra&ccedil;a em voc&ecirc; de modo que possa aben&ccedil;oar algumas pessoas mais do que qualquer outro poderia. Voc&ecirc; &eacute; o instrumento mais perfeito de Deus para algumas&nbsp;</em><em>tarefas. Voc&ecirc; tem seu pr&oacute;prio papel a desempenhar no plano de Deus, e ningu&eacute;m mais pode substituir voc&ecirc;.</em></span></span></p>
</div>

<p style="margin-left:7.15pt"><span style="font-size:18px"><span style="color:#FFFFFF"><em>Deus precisa de voc&ecirc; para a tarefa para a qual Ele o est&aacute; preparando. Ser&aacute; necess&aacute;rio todo o seu amor, ora&ccedil;&atilde;o e fidelidade para cumprir o chamado e a vontade de Deus para voc&ecirc;. Se eu deixar parte do meu trabalho sem fazer e voc&ecirc; preencher o meu lugar, deixar&aacute;, ent&atilde;o, vazio o lugar que Deus queria que voc&ecirc; ocupasse, a parte do trabalho que Deus queria que voc&ecirc; fizesse ficar&aacute; inacabada. Nenhum de n&oacute;s tem o direito de concluir: &ldquo;Se eu n&atilde;o obedecer a Deus, algum outro me substituir&aacute;. Se voc&ecirc; deixar de obedecer a Deus, haver&aacute; uma brecha no trabalho de Deus (Ez. 22.30). Existem muitas brechas abertas na obra de Deus ao redor do mundo hoje&rdquo;. </em>Wesley Duewel, Deixe Deus Gui&aacute;-lo Diariamente (1996, p. 213).</span></span></p>

      `,
    imagem: require('@/assets/images/cdv8.png'),
  },
  {
    titulo: 'Lição 9 - Motivação: Servindo melhor',
    videoUrl: 'https://www.youtube.com/embed/CThlekbyqiQ?si=C-mBpNN_2LwNh7z0',
    descricao:
      `
      <div>
<h5><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Motiva&ccedil;&atilde;o &eacute; o ato ou efeito de motivar; motivo, causa; conjunto de processos que d&atilde;o ao comportamento uma intensidade, uma dire&ccedil;&atilde;o determinada e uma forma de desenvolvimento pr&oacute;prias da atividade individual.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Etimologicamente, motiva&ccedil;&atilde;o vem do latim <em>movere</em>, que significa deslocar, fazer mudar de lugar e &eacute; a jun&ccedil;&atilde;o dos termos <em>motivo + a&ccedil;&atilde;o</em>, significando causa, raz&atilde;o ou fim espec&iacute;fico. &Eacute; aquilo que impulsiona a pessoa de dentro para fora, sendo os motivos que levam a pessoa a agir.<sup>1</sup></span></span></p>

<p>&nbsp;</p>

<h5><span style="color:#FFFFFF"><span style="font-size:18px"><strong>I.MOTIVA&Ccedil;&Atilde;O (A&Ccedil;&Atilde;O) &ndash; A FERRAMENTA ADEQUADA</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Abraham Maslow, psic&oacute;logo atuante no s&eacute;culo XX, disse que a motiva&ccedil;&atilde;o se dinamiza atrav&eacute;s de necessidades humanas. No entanto, devemos levar em considera&ccedil;&atilde;o o motivo e a a&ccedil;&atilde;o praticada, at&eacute; mesmo a ferramenta utilizada para que tais necessidades sejam atendidas.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Se sentir alegre e feliz n&atilde;o &eacute; condi&ccedil;&atilde;o b&aacute;sica para ter certeza de que se tem a motiva&ccedil;&atilde;o correta. Muitas pessoas investem em boas coisas, no entanto com as motiva&ccedil;&otilde;es erradas. Outras possuem as motiva&ccedil;&otilde;es corretas, mas andam com pessoas erradas.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Para descobrirmos nossa real motiva&ccedil;&atilde;o dever&iacute;amos nos fazer as seguintes perguntas:</span></span></p>

<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Por que fa&ccedil;o o que fa&ccedil;o?</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Em que lugar desejo chegar?</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Fa&ccedil;o isso com a ferramenta adequada?</span></span></li>
</ol>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Imagine um pedreiro que foi contratado para derrubar uma pequena parede e tem 3 dias para isso. N&atilde;o precisamos entender de obras para saber que este servi&ccedil;o &eacute; plenamente poss&iacute;vel de ser realizado neste tempo, n&atilde;o &eacute;? Agora, imagine que o mesmo pedreiro, ao inv&eacute;s de receber uma marreta, recebe uma colher de pedreiro para derrubar a parede. Ser&aacute; que ele conseguir&aacute; terminar o servi&ccedil;o no prazo solicitado?</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Um l&iacute;der conseguiria liderar sua equipe com qualidade n&atilde;o se utilizando de clareza e objetividade? Provavelmente n&atilde;o.</span></span></p>

<table align="left" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td><span style="color:#FFFFFF"><span style="font-size:18px"><img src="file:///C:/Users/stanl/AppData/Local/Packages/oice_16_974fa576_32c1d314_2a83/AC/Temp/msohtmlclip1/01/clip_image001.gif" style="height:1px; width:192px" /></span></span></td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">1&nbsp;<em>Etimologia</em> <em>e</em> <em>Motiva&ccedil;&atilde;o,</em> <em>ARTIGO</em> <em>/</em> <em>13</em> <em>DE</em> <em>FEVEREIRO</em> <em>DE</em> <em>2012</em> <em>/</em> <em>POR</em> <em>PROF.</em> <em>LUIZ</em> <em>MACHADO,</em> <em>PHD</em></span></span></p>
</div>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Igualmente aos exemplos acima, apesar da motiva&ccedil;&atilde;o correta, muitas pessoas n&atilde;o se atentam &agrave; ferramenta adequada para cumprimento de seus objetivos ou prop&oacute;sitos, fazendo com que se sintam como se estivessem no lugar errado, at&eacute; desanimando no meio do caminho.</span></span></p>

<h5><span style="color:#FFFFFF"><span style="font-size:18px"><strong>II.MOTIVA&Ccedil;&Atilde;O EMOCIONAL &ndash; PAIX&Atilde;O</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Para indicar maior interesse, utilizaremos o termo &ldquo;paix&atilde;o&rdquo; ao inv&eacute;s de motiva&ccedil;&atilde;o. <strong>Paix&atilde;o &eacute; motiva&ccedil;&atilde;o emocional. </strong>Motiva&ccedil;&atilde;o significa um estado psicol&oacute;gico caracterizado por elevado grau de disposi&ccedil;&atilde;o ou vontade de realizar uma meta, um sonho, um projeto.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Qual &eacute; a sua paix&atilde;o? Voc&ecirc; consegue se sair bem ou se entrega de cora&ccedil;&atilde;o &agrave;quilo que faz?</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">A motiva&ccedil;&atilde;o surge do nosso &iacute;ntimo, nos motivando, orientando e dando energia para prosseguirmos. &Eacute; um desejo do meu cora&ccedil;&atilde;o, <strong><em>dado</em></strong> <strong><em>por</em></strong> <strong><em>Deus,</em></strong> <strong><em>pessoal</em></strong> e que me impele a fazer diferen&ccedil;a num &ldquo;lugar&rdquo; espec&iacute;fico respondendo &agrave; pergunta: <strong><em>O</em></strong> <strong><em>que</em></strong> <strong><em>estou</em></strong> <strong><em>equipado</em></strong> <strong><em>para</em></strong> <strong><em>fazer?</em></strong></span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Devemos prestar aten&ccedil;&atilde;o naquilo que est&aacute; por tr&aacute;s da nossa motiva&ccedil;&atilde;o (aquilo que realmente queremos) e com qual ferramenta iremos atingir o objetivo planejado.</span></span></p>

      `,
    imagem: require('@/assets/images/cdv9.png'),
  },
  {
    titulo: 'Lição 10 - Descobrindo seu estilo pessoal',
    videoUrl: 'https://www.youtube.com/embed/N01LKNkT4r0?si=UumwXY425D1vErKB',
    descricao:
      `
      <div>
<h5><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;<em>Voc&ecirc; &eacute; um ser diferente, n&atilde;o h&aacute; ningu&eacute;m igual a voc&ecirc;. S&oacute; h&aacute; &lsquo;um voc&ecirc;&rsquo; no mundo. H&aacute; um lugar no Corpo de Cristo em que somente voc&ecirc;, com seu chamado, pode ocupar.&rdquo;</em></span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Cada ser humano constitui uma individualidade, sendo &uacute;nico em seu modo de ser e pensar. Assim, o homem &eacute; distinto e superior aos animais por possuir autoconsci&ecirc;ncia e autodetermina&ccedil;&atilde;o, personalidade e o que o irracional n&atilde;o tem: intelecto, vontade e emo&ccedil;&otilde;es.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">O evangelho, que leva a pessoa a conhecer a Deus como Pai amoroso, n&atilde;o despersonaliza o indiv&iacute;duo. Com efeito, a proposta do cristianismo n&atilde;o suprime nada que seja bom e saud&aacute;vel na cultura e no indiv&iacute;duo.</span></span></p>

<p style="margin-left:7.15pt">&nbsp;</p>

<h5><span style="color:#FFFFFF"><span style="font-size:18px"><strong>I.O ESTILO PESSOAL &ndash; A PERSONALIDADE DO SER HUMANO</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Nesta li&ccedil;&atilde;o, trataremos sobre estilo pessoal, o modo pelo qual o ser humano se motiva e se organiza. Para come&ccedil;ar a entender e descobrir qual &eacute; o seu estilo pessoal, devemos falar um pouco sobre a personalidade do ser humano.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">A personalidade humana &eacute; o conjunto de qualidades que define a individualidade de uma pessoa moral. Ela &eacute; formada durante as etapas do desenvolvimento psicoafetivo pelas quais passa a crian&ccedil;a desde a gesta&ccedil;&atilde;o. Para a sua forma&ccedil;&atilde;o, incluem tanto os elementos geneticamente herdados (temperamentos), como tamb&eacute;m os adquiridos do meio ambiente no qual a crian&ccedil;a est&aacute; inserida (car&aacute;ter).</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Deus tem um prop&oacute;sito especial para cada um de n&oacute;s e &eacute; o maior interessado pelas necessidades psicol&oacute;gicas do indiv&iacute;duo apanhado pelas aterrorizantes complexidades da vida. Ele leva em considera&ccedil;&atilde;o nossa personalidade, mas &eacute; Ele quem transforma nosso car&aacute;ter (Mt. 5.8; Gl. 4.19; Ef. 1.4; 2 Tm. 3.17; 2 Pe. 1.3).</span></span></p>

<p>&nbsp;</p>

<h5><span style="color:#FFFFFF"><span style="font-size:18px"><strong>II.ELEMENTOS B&Aacute;SICOS DO ESTILO PESSOAL</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Os elementos b&aacute;sicos do nosso estilo pessoal s&atilde;o motiva&ccedil;&atilde;o e organiza&ccedil;&atilde;o. Em rela&ccedil;&atilde;o &agrave; motiva&ccedil;&atilde;o, assunto tratado na aula anterior, o ser humano pode ser motivado por tarefas ou por pessoas.</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<h6><span style="color:#FFFFFF"><span style="font-size:18px">1.COMO VOC&Ecirc; SE MOTIVA?</span></span></h6>

<p>&nbsp;</p>

<table border="0" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td style="height:35px; width:296px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Motivado por tarefas</strong></span></span></p>
			</td>
			<td style="height:35px; width:305px">
			<p style="margin-left:49.6pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Motivado por Pessoas</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:60px; width:296px">
			<p style="margin-left:.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; estimulado ao realizar tarefas</span></span></p>
			</td>
			<td style="height:60px; width:305px">
			<p style="margin-left:91.55pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; estimulado ao relacionar-se com pessoas</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Esta escala descreve como voc&ecirc; recebe e concentra sua energia emocional e a maneira como voc&ecirc; prefere interagir com pessoas e tarefas.</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px">No fim da Escala de Tarefas est&aacute; a pessoa que se estimula realizando coisas. No final da Escala de Pessoas est&aacute; a pessoa que se sente motivada interagindo com outros.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Isto n&atilde;o quer dizer que as pessoas motivadas por pessoas n&atilde;o estejam preocupadas com as realiza&ccedil;&otilde;es de tarefas, ou que as pessoas motivadas por tarefas n&atilde;o estejam preocupadas com relacionamentos. &Eacute; mais uma quest&atilde;o de prioridade e abordagem.</span></span></li>
</ol>

<p>&nbsp;</p>

<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td style="height:41px; width:302px">
			<p style="margin-left:36.8pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>MOTIVADO POR TAREFAS, REALIZA </strong><strong>ATIVIDADE MELHOR QUANDO:</strong></span></span></p>
			</td>
			<td style="height:41px; width:302px">
			<p style="margin-left:37.05pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>MOTIVADO</strong> <strong>POR</strong> <strong>PESSOAS,</strong> <strong>REALIZA </strong><strong>ATIVIDADE MELHOR QUANDO:</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:302px">
			<p style="margin-left:53.85pt"><span style="color:#FFFFFF"><span style="font-size:18px">Seu enfoque ministerial se d&aacute; pelo cumprimento de tarefas.</span></span></p>
			</td>
			<td style="height:39px; width:302px">
			<p style="margin-left:23.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Seu enfoque ministerial s&atilde;o pessoas.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:302px">
			<p style="margin-left:95.65pt"><span style="color:#FFFFFF"><span style="font-size:18px">Voc&ecirc; tem oportunidades para realizar tarefas.</span></span></p>
			</td>
			<td style="height:39px; width:302px">
			<p style="margin-left:71.0pt"><span style="color:#FFFFFF"><span style="font-size:18px">Voc&ecirc; tem oportunidades para desenvolver relacionamentos.</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<h5><span style="color:#FFFFFF"><span style="font-size:18px">1.1. AVALIA&Ccedil;&Atilde;O DE COMO VOC&Ecirc; SE MOTIVA:</span></span></h5>

<p>&nbsp;</p>

<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td style="height:57px; width:163px">
			<p style="margin-left:.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Sinto-me melhor</span></span></p>
			</td>
			<td style="height:57px; width:183px">
			<p style="margin-left:47.1pt"><span style="color:#FFFFFF"><span style="font-size:18px">Fazendo algo para as pessoas</span></span></p>
			</td>
			<td style="height:57px; width:84px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">1 2 3 4 5</span></span></p>
			</td>
			<td style="height:57px; width:170px">
			<p style="margin-left:41.85pt"><span style="color:#FFFFFF"><span style="font-size:18px">Estando com as pessoas</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:56px; width:163px">
			<p style="margin-left:41.6pt"><span style="color:#FFFFFF"><span style="font-size:18px">Quando realizo tarefas</span></span></p>
			</td>
			<td style="height:56px; width:183px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Focalizo no alvo</span></span></p>
			</td>
			<td style="height:56px; width:84px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">1 2 3 4 5</span></span></p>
			</td>
			<td style="height:56px; width:170px">
			<p style="margin-left:18.9pt"><span style="color:#FFFFFF"><span style="font-size:18px">Focalizo nos relacionamentos</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:57px; width:163px">
			<p style="margin-left:.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Fico empolgado com</span></span></p>
			</td>
			<td style="height:57px; width:183px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">O avan&ccedil;o de uma causa</span></span></p>
			</td>
			<td style="height:57px; width:84px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">1 2 3 4 5</span></span></p>
			</td>
			<td style="height:57px; width:170px">
			<p style="margin-left:29.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">O sentido de comunidade</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:56px; width:163px">
			<p style="margin-left:25.75pt"><span style="color:#FFFFFF"><span style="font-size:18px">Sinto que realizei algo quando</span></span></p>
			</td>
			<td style="height:56px; width:183px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Termino uma tarefa</span></span></p>
			</td>
			<td style="height:56px; width:84px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">1 2 3 4 5</span></span></p>
			</td>
			<td style="height:56px; width:170px">
			<p style="margin-left:40.5pt"><span style="color:#FFFFFF"><span style="font-size:18px">Aprofundo uma amizade</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:57px; width:163px">
			<p style="margin-left:36.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; mais importante come&ccedil;ar</span></span></p>
			</td>
			<td style="height:57px; width:183px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Na hora</span></span></p>
			</td>
			<td style="height:57px; width:84px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">1 2 3 4 5</span></span></p>
			</td>
			<td style="height:57px; width:170px">
			<p style="margin-left:36.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Esperar todos chegarem</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:56px; width:163px">
			<p style="margin-left:27.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">Estou mais preocupado</span></span></p>
			</td>
			<td style="height:56px; width:183px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Em cumprir um prazo</span></span></p>
			</td>
			<td style="height:56px; width:84px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">1 2 3 4 5</span></span></p>
			</td>
			<td style="height:56px; width:170px">
			<p style="margin-left:.4pt"><span style="color:#FFFFFF"><span style="font-size:18px">Manter a equipe A</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:34px; width:163px">
			<p style="margin-left:.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Valorizo mais</span></span></p>
			</td>
			<td style="height:34px; width:183px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">A a&ccedil;&atilde;o</span></span></p>
			</td>
			<td style="height:34px; width:84px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">1 2 3 4 5</span></span></p>
			</td>
			<td style="height:34px; width:170px">
			<p style="margin-left:.4pt"><span style="color:#FFFFFF"><span style="font-size:18px">Comunica&ccedil;&atilde;o</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Total de pontos: B = &nbsp;&nbsp;&nbsp;</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<h5><span style="color:#FFFFFF"><span style="font-size:18px">2.COMO VOC&Ecirc; SE ORGANIZA?</span></span></h5>

<p>&nbsp;</p>

<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td style="height:24px; width:299px">
			<p style="margin-left:2.15pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; N&atilde;o Estruturado&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </u></strong></span></span></p>
			</td>
			<td style="height:24px; width:299px">
			<p style="margin-left:3.5pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Estruturado</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:44px; width:299px">
			<p style="margin-left:3.5pt"><span style="color:#FFFFFF"><span style="font-size:18px">Prefere ter muitas op&ccedil;&otilde;es e flexibilidade</span></span></p>
			</td>
			<td style="height:44px; width:299px">
			<p style="margin-left:82.95pt"><span style="color:#FFFFFF"><span style="font-size:18px">Prefere planejar e por todas as coisas em ordem</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px">No final da escala est&atilde;o as pessoas <em>n&atilde;o-estruturadas, </em>que preferem ter muitas op&ccedil;&otilde;es e flexibilidade. Elas s&atilde;o mais inclinadas a se mover entre uma variedade de atividades. Gostam de criatividade e oportunidade.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">No final da escala est&atilde;o as pessoas <em>estruturadas, </em>que preferem planejar e p&ocirc;r ordem em suas vidas. Elas s&atilde;o mais inclinadas a buscar decis&otilde;es e conclus&otilde;es. S&atilde;o detalhistas.</span></span></li>
</ol>

<h5><span style="color:#FFFFFF"><span style="font-size:18px">2.1.AVALIA&Ccedil;&Atilde;O DE COMO VOC&Ecirc; SE ORGANIZA:</span></span></h5>

<p>&nbsp;</p>

<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td style="height:45px; width:160px">
			<p style="margin-left:.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Nas f&eacute;rias prefiro</span></span></p>
			</td>
			<td style="height:45px; width:180px">
			<p style="margin-left:.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ser espont&acirc;neo</span></span></p>
			</td>
			<td style="height:45px; width:104px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px">1 2 3 4 5</span></span></p>
			</td>
			<td style="height:45px; width:152px">
			<p style="margin-left:46.9pt"><span style="color:#FFFFFF"><span style="font-size:18px">Seguir um plano fixo</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:45px; width:160px">
			<p style="margin-left:35.6pt"><span style="color:#FFFFFF"><span style="font-size:18px">Prefiro tra&ccedil;ar diretrizes</span></span></p>
			</td>
			<td style="height:45px; width:180px">
			<p style="margin-left:.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Gerais</span></span></p>
			</td>
			<td style="height:45px; width:104px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px">1 2 3 4 5</span></span></p>
			</td>
			<td style="height:45px; width:152px">
			<p style="margin-left:.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Espec&iacute;ficas</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:45px; width:160px">
			<p style="margin-left:40.75pt"><span style="color:#FFFFFF"><span style="font-size:18px">Prefiro deixar op&ccedil;&otilde;es</span></span></p>
			</td>
			<td style="height:45px; width:180px">
			<p style="margin-left:.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Em aberto</span></span></p>
			</td>
			<td style="height:45px; width:104px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px">1 2 3 4 5</span></span></p>
			</td>
			<td style="height:45px; width:152px">
			<p style="margin-left:.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Resolver logo</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:45px; width:160px">
			<p style="margin-left:39.55pt"><span style="color:#FFFFFF"><span style="font-size:18px">Prefiro projetos que tenham</span></span></p>
			</td>
			<td style="height:45px; width:180px">
			<p style="margin-left:.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Variedade</span></span></p>
			</td>
			<td style="height:45px; width:104px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px">1 2 3 4 5</span></span></p>
			</td>
			<td style="height:45px; width:152px">
			<p style="margin-left:.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Rotina</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:45px; width:160px">
			<p style="margin-left:.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Gosto de</span></span></p>
			</td>
			<td style="height:45px; width:180px">
			<p style="margin-left:.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Improvisar</span></span></p>
			</td>
			<td style="height:45px; width:104px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px">1 2 3 4 5</span></span></p>
			</td>
			<td style="height:45px; width:152px">
			<p style="margin-left:.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Seguir um plano</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:45px; width:160px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">Acho a rotina</span></span></p>
			</td>
			<td style="height:45px; width:180px">
			<p style="margin-left:.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Chata</span></span></p>
			</td>
			<td style="height:45px; width:104px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px">1 2 3 4 5</span></span></p>
			</td>
			<td style="height:45px; width:152px">
			<p style="margin-left:28.55pt"><span style="color:#FFFFFF"><span style="font-size:18px">Segura (posso descansar)</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:45px; width:160px">
			<p style="margin-left:22.4pt"><span style="color:#FFFFFF"><span style="font-size:18px">Realizo melhor a tarefa quando</span></span></p>
			</td>
			<td style="height:45px; width:180px">
			<p style="margin-left:22.05pt"><span style="color:#FFFFFF"><span style="font-size:18px">Resolvo as coisas ao longo do projeto</span></span></p>
			</td>
			<td style="height:45px; width:104px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px">1 2 3 4 5</span></span></p>
			</td>
			<td style="height:45px; width:152px">
			<p style="margin-left:.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Sigo um plano</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Total de pontos: A = &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<h5><span style="color:#FFFFFF"><span style="font-size:18px">III.DESCOBRINDO SEU ESTILO PESSOAL</span></span></h5>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Na grade abaixo, coloque um <strong>X </strong>na escala <strong>A </strong>que corresponde ao seu total de <strong>A </strong>na p&aacute;gina anterior.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Na grade abaixo, coloque um X na escala B que corresponde ao seu total de B na p&aacute;gina anterior.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Desenhe uma linha vertical passando pelo <strong>X </strong>marcado na escala <strong>A</strong>.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Desenhe uma linha horizontal passando pelo <strong>X </strong>marcado na escala B.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Seu Estilo Pessoal &eacute; indicado pelo cruzamento das duas linhas.</span></span></li>
</ol>

<table align="left" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p>&nbsp;</p>
</div>

<h5><span style="color:#FFFFFF"><span style="font-size:18px">DESCRI&Ccedil;&Otilde;ES CHAVES</span></span></h5>

<p>&nbsp;</p>

<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td colspan="2" style="height:24px; width:607px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>TAREFAS</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:20px; width:304px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>N&Atilde;O-</strong><strong>ESTRUTURADO</strong></span></span></p>
			</td>
			<td style="height:20px; width:304px">
			<p style="margin-left:.1pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ESTRUTURADO</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:49px; width:304px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Diretrizes gerais</span></span></p>
			</td>
			<td style="height:49px; width:304px">
			<p style="margin-left:.1pt"><span style="color:#FFFFFF"><span style="font-size:18px">Cumpre a tarefa at&eacute; o fim</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:49px; width:304px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Vers&aacute;til</span></span></p>
			</td>
			<td style="height:49px; width:304px">
			<p style="margin-left:.05pt"><span style="color:#FFFFFF"><span style="font-size:18px">Focaliza nos resultados</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:49px; width:304px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Aprecia ajudar quando for necess&aacute;rio</span></span></p>
			</td>
			<td style="height:49px; width:304px">
			<p style="margin-left:.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Prefere seguir uma agenda</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:49px; width:304px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Gosta de resultados concretos</span></span></p>
			</td>
			<td style="height:49px; width:304px">
			<p style="margin-left:.05pt"><span style="color:#FFFFFF"><span style="font-size:18px">Aprecia orienta&ccedil;&atilde;o clara</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:64px; width:304px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Considere o tipo de minist&eacute;rio que lhe possibilite cumprir uma ampla variedade de responsabilidades.</span></span></p>
			</td>
			<td style="height:64px; width:304px">
			<p style="margin-left:6.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Considere o tipo de minist&eacute;rio que lhe permita saber exatamente quais s&atilde;o os alvos e como a tarefa deve ser realizada.</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td colspan="2" style="height:24px; width:607px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>PESSOAS</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:20px; width:304px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>N&Atilde;O-</strong><strong>ESTRUTURADO</strong></span></span></p>
			</td>
			<td style="height:20px; width:304px">
			<p style="margin-left:.2pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ESTRUTURADO</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:49px; width:304px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Situa&ccedil;&otilde;es espont&acirc;neas</span></span></p>
			</td>
			<td style="height:49px; width:304px">
			<p style="margin-left:.2pt"><span style="color:#FFFFFF"><span style="font-size:18px">Relacionamentos definidos</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:49px; width:304px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Gosta de conversar</span></span></p>
			</td>
			<td style="height:49px; width:304px">
			<p style="margin-left:.2pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ambiente conhecido</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:49px; width:304px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Relaciona-se bem com pessoas</span></span></p>
			</td>
			<td style="height:49px; width:304px">
			<p style="margin-left:.2pt"><span style="color:#FFFFFF"><span style="font-size:18px">Transmite calor humano</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:49px; width:304px">
			<p style="margin-left:1.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Tende a ser flex&iacute;vel</span></span></p>
			</td>
			<td style="height:49px; width:304px">
			<p style="margin-left:.2pt"><span style="color:#FFFFFF"><span style="font-size:18px">Gosta de relacionamentos conhecidos</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:64px; width:304px">
			<p style="margin-left:8.95pt"><span style="color:#FFFFFF"><span style="font-size:18px">Considere o tipo de minist&eacute;rio que lhe d&ecirc; a liberdade de responder &agrave;s pessoas espontaneamente.</span></span></p>
			</td>
			<td style="height:64px; width:304px">
			<p style="margin-left:17.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">Considere o tipo de minist&eacute;rio que lhe capacite a interagir com pessoas em situa&ccedil;&otilde;es mais est&aacute;veis ou definidas.</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Qual &eacute; o seu estilo pessoal e o que mais chama a sua aten&ccedil;&atilde;o nesse estilo?</span></span></p>

      `,
    imagem: require('@/assets/images/cdv10.png'),
  },
  {
    titulo: 'Lição 11 - Compreendendo o temperamento pessoal',
    videoUrl: 'https://www.youtube.com/embed/4S2NmIkARpE?si=-VHqPWIHsie5FBSe',
    descricao:
      `
      <div>
<h5><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px"><em>&ldquo;N&atilde;o existe nada mais fascinante a respeito do homem do que o seu temperamento. &Eacute; o temperamento que supre cada ser humano com as qualidades marcantes de singularidade que o tornam t&atilde;o individualmente diferente de seus semelhantes como os diferentes contornos que Deus deu aos flocos de neve. &Eacute; a for&ccedil;a invis&iacute;vel que alicer&ccedil;a a a&ccedil;&atilde;o humana, uma for&ccedil;a que pode destruir um ser humano normal e eficiente, a menos que seja disciplinada e controlada.&rdquo;</em></span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">2. Segundo o dicion&aacute;rio, temperamento &eacute;: &ldquo;<em>Estado</em> <em>fisiol&oacute;gico</em> <em>ou</em> <em>constitui&ccedil;&atilde;o</em> <em>particular</em> <em>do</em> <em>corpo; </em><em>complei&ccedil;&atilde;o. O conjunto dos tra&ccedil;os psicofisiol&oacute;gicos de uma pessoa, e que lhe determinam as rea&ccedil;&otilde;es emocionais, os estados de humor, o car&aacute;ter (T&ecirc;mpera). Mistura proporcional de coisas, combina&ccedil;&atilde;o, mescla.&rdquo;</em></span></span></p>

<h5><span style="color:#FFFFFF"><span style="font-size:18px"><strong>I.APRENDENDO MAIS SOBRE OS TEMPERAMENTOS</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">A palavra &ldquo;TEMPERAMENTO&rdquo; vem do latim e quer dizer: &ldquo;Mistura correta&rdquo;. Relaciona-se com a ideia da medicina antiga (Hip&oacute;crates, h&aacute; cerca de 2.500 anos) de que o corpo continha quatro l&iacute;quidos ou seiva: SANGUIS (Sangue), CHOLOS (B&iacute;lis Amarela), MELANCHOLOS (B&iacute;lis Negra) e FLEUMA (Mucosidade).</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Compreenda uma coisa sobre o temperamento: seu temperamento nunca muda. Tal como sua apar&ecirc;ncia, sua altura e seu quociente de intelig&ecirc;ncia, seu temperamento ser&aacute; uma parte de voc&ecirc; enquanto viver. O temperamento influencia tudo o que voc&ecirc; faz, desde os h&aacute;bitos do sono, estudo, estilo de alimenta&ccedil;&atilde;o, at&eacute; a maneira de como voc&ecirc; se relaciona com outras pessoas.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Humanamente falando, n&atilde;o existe outra influ&ecirc;ncia mais poderosa em sua vida do que seu temperamento ou a combina&ccedil;&atilde;o deles. &Eacute; dif&iacute;cil haver uma fun&ccedil;&atilde;o que n&atilde;o seja influenciada pelo nosso temperamento.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">O temperamento &eacute; a combina&ccedil;&atilde;o de caracter&iacute;sticas que herdamos de nossos pais (bagagem gen&eacute;tica). Naturalmente, o temperamento n&atilde;o &eacute; a &uacute;nica influ&ecirc;ncia sobre nossa conduta. A vida</span></span></p>

<p>&nbsp;</p>

<table align="left" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td><span style="color:#FFFFFF"><span style="font-size:18px"><img src="file:///C:/Users/stanl/AppData/Local/Packages/oice_16_974fa576_32c1d314_2a83/AC/Temp/msohtmlclip1/01/clip_image001.gif" style="height:1px; width:192px" /></span></span></td>
		</tr>
	</tbody>
</table>
&nbsp;

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px"><sup>2</sup> LAHAYE, Tim. <em>Temperamentos controlados pelo Esp&iacute;rito. </em>S&atilde;o Paulo: Loyola, 1983. p. 9</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">dom&eacute;stica, o treinamento, a educa&ccedil;&atilde;o e a motiva&ccedil;&atilde;o, por igual modo, exercem poderosas influ&ecirc;ncias sobre nossas a&ccedil;&otilde;es por toda a vida.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">O temperamento, entretanto, &eacute; a principal influ&ecirc;ncia na vida de uma pessoa, n&atilde;o somente por ser a primeira coisa que nos afeta, mas porque, como a estrutura corporal, a cor dos olhos e outras caracter&iacute;sticas f&iacute;sicas, ele nos acompanha por toda a vida. O temperamento estabelece fortes diretrizes no comportamento de todo indiv&iacute;duo.</span></span></p>

<h5><span style="color:#FFFFFF"><span style="font-size:18px"><strong>II.VANTAGENS DE CONHECER O TEMPERAMENTO PESSOAL PREDOMINANTE</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Primeiramente precisamos entender que o temperamento &eacute; herdado e cong&ecirc;nito, e n&atilde;o pode mudar. Pode sim, ser controlado pelo Esp&iacute;rito Santo, mediante a santifica&ccedil;&atilde;o, mas n&atilde;o transformado. Os estudiosos do assunto ensinam que o temperamento &eacute; herdado: 1) 50% dos pais; 2) 25% dos av&oacute;s; 3) 20% dos bisav&ocirc;s; e 4) 5% dos trisav&ocirc;s.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">A falta de conhecimento do temperamento &eacute; uma das causas geradoras de conflitos de personalidade (geralmente chamada de incompatibilidade). Portanto, precisamos conhecer nosso temperamento predominante para melhor entendermos a n&oacute;s mesmos, para nos aceitarmos e nos relacionarmos bem com os outros.</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o podemos, jamais, confundir temperamento com m&aacute; educa&ccedil;&atilde;o, m&aacute; forma&ccedil;&atilde;o social, disfun&ccedil;&otilde;es org&acirc;nicas do indiv&iacute;duo, falhas de car&aacute;ter; sen&atilde;o vamos querer justificar nossas defici&ecirc;ncias temperamentais, ao inv&eacute;s de nos deixar encher do Esp&iacute;rito Santo (Ef. 5.18).</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Portanto, &eacute; necess&aacute;rio conhecermos nosso temperamento predominante para melhor nos conhecermos (Por que somos assim ou por que agimos como agimos?), al&eacute;m de conhecer melhor tamb&eacute;m nosso pr&oacute;ximo e saber de qual modo podemos compreend&ecirc;-lo melhor. O temperamento d&aacute; ao homem for&ccedil;as e fraquezas. Embora gostemos apenas de pensar em nossas for&ccedil;as, todos n&oacute;s temos fraquezas.</span></span></p>

<h5><span style="color:#FFFFFF"><span style="font-size:18px"><strong>III.AUTO AVALIA&Ccedil;&Atilde;O DOS TEMPERAMENTOS</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">A seguir, voc&ecirc; vai responder a um teste sobre os 4 temperamentos. Assinale em cada um dos 4 temperamentos, aqueles itens em que voc&ecirc; se enquadra - tanto os pontos fortes, quanto os fracos. Abaixo o desenho mostra for&ccedil;as e fraquezas de cada temperamento.</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<p style="margin-left:7.1pt"><span style="color:#FFFFFF"><span style="font-size:18px"><img src="data:image/jpeg;base64,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" style="height:644px; width:591px" /></span></span></p>
</div>

<p>&nbsp;</p>

<div>
<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td colspan="5" style="height:21px; width:607px">
			<p style="margin-left:4.65pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>A - SANGU&Iacute;NEO</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:21px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">1</span></span></p>
			</td>
			<td style="height:21px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Cordial</span></span></p>
			</td>
			<td rowspan="25" style="height:21px; width:19px">
			<p>&nbsp;</p>
			</td>
			<td style="height:21px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">26</span></span></p>
			</td>
			<td style="height:21px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Vive para o presente</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">2</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Alegre</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">27</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o se sente temeroso pelo futuro</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">3</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Contagiante</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">28</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o gosta de estar s&oacute;</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">4</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Bem humorado</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">29</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Fala antes de pensar</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">5</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Extrovertido</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">30</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Terno e compassivo</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">6</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Estimulante</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">31</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Pouco pr&aacute;tico e desorganizado</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">7</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Bondoso</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">32</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Age sem pensar</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">8</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Emotivo</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">33</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Tend&ecirc;ncia &agrave; lasc&iacute;via</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">9</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Espont&acirc;neo</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">34</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:7.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">Dificuldade para concentrar-se em leitura ou tarefas que exijam aten&ccedil;&atilde;o</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">10</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ing&ecirc;nuo</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">35</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Pouca produtividade</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">11</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Faz amizade com facilidade</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">36</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Indisciplinado</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">12</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:51.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Tem relacionamento profundo com as pessoas</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">37</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Come&ccedil;a e n&atilde;o termina seus planos</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">13</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Mais cora&ccedil;&atilde;o do que raz&atilde;o</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">38</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:46.65pt"><span style="color:#FFFFFF"><span style="font-size:18px">Responde e se compromete sem pensar. N&atilde;o cumpre.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">14</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Relaciona-se bem</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">39</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Turbulento</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">15</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Gosta de crian&ccedil;as</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">40</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o conhece suas limita&ccedil;&otilde;es</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">16</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:63.85pt"><span style="color:#FFFFFF"><span style="font-size:18px">Esquece as coisas desagrad&aacute;veis facilmente</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">41</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:64.05pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o cumpre hor&aacute;rio ou compromisso</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">17</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Sincero</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">42</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:18.75pt"><span style="color:#FFFFFF"><span style="font-size:18px">Pode alterar seus princ&iacute;pios morais, devido ao ambiente que o cerca</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">18</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Anima as pessoas</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">43</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o &eacute; leal</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">19</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:57.0pt"><span style="color:#FFFFFF"><span style="font-size:18px">Participa com entusiasmo de novos planos</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">44</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ego&iacute;sta</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">20</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Barulhento</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">45</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:70.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Dominador da conversa. N&atilde;o d&aacute; vez aos outros.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">21</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Espalhafatoso</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">46</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Inst&aacute;vel emocionalmente</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">22</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Curiosidade infantil</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">47</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Desanima facilmente</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">23</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:68.9pt"><span style="color:#FFFFFF"><span style="font-size:18px">Sens&iacute;vel com as necessidades do pr&oacute;ximo</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">48</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:34.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Tem explos&otilde;es de ira e em seguida esquece, afetando outros.</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">24</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Desperta de bom humor</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">49</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:65.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Arrepende-se v&aacute;rias vezes pela mesma coisa</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:24px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">25</span></span></p>
			</td>
			<td style="height:24px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Otimista</span></span></p>
			</td>
			<td style="height:24px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">50</span></span></p>
			</td>
			<td style="height:24px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Vontade fraca o faz ceder &agrave; tenta&ccedil;&atilde;o</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Total de Itens A: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td colspan="5" style="height:21px; width:607px">
			<p style="margin-left:4.75pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>B - COL&Eacute;RICO</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:21px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">1</span></span></p>
			</td>
			<td style="height:21px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Temperamento ardente</span></span></p>
			</td>
			<td rowspan="25" style="height:21px; width:19px">
			<p>&nbsp;</p>
			</td>
			<td style="height:21px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">26</span></span></p>
			</td>
			<td style="height:21px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o se abala facilmente com cr&iacute;ticas</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">2</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ativo</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">27</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Autodisciplinado</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">3</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Pr&aacute;tico</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">28</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Geralmente otimista</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">4</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Voluntarioso</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">29</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Gosta do desafio do desconhecido</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">5</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Suficiente</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">30</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:86.85pt"><span style="color:#FFFFFF"><span style="font-size:18px">Interessa-se pelo aspecto pr&aacute;tico da vida</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">6</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Independente</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">31</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Insens&iacute;vel</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">7</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Decidido</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">32</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Irado</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">8</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Facilidade de tomar decis&otilde;es</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">33</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Com impetuosidade danosa</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">9</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Vibra com muitas atividades</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">34</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Sem compaix&atilde;o crist&atilde;</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">10</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Pouco influenciado pelo meio</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">35</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:77.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Indiferente aos anseios das outras pessoas</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">11</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Influenciador do meio</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">36</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Agressivo</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:59px; width:47px">
			<p>&nbsp;</p>

			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">12</span></span></p>
			</td>
			<td style="height:59px; width:236px">
			<p style="margin-left:29.0pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o se amedronta nas adversidades, torna as adversidades um desafio</span></span></p>
			</td>
			<td style="height:59px; width:47px">
			<p>&nbsp;</p>

			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">37</span></span></p>
			</td>
			<td style="height:59px; width:257px">
			<p>&nbsp;</p>

			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Guarda rancor</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">13</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o &eacute; dado a detalhes</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">38</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Vingativo</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">14</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">C&eacute;rebro perspicaz</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">39</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Tende a ter &uacute;lcera</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">15</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o vacila sob press&atilde;o</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">40</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Cruel</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:58px; width:47px">
			<p>&nbsp;</p>

			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">16</span></span></p>
			</td>
			<td style="height:58px; width:236px">
			<p style="margin-left:8.6pt"><span style="color:#FFFFFF"><span style="font-size:18px">Seu sucesso resulta de determina&ccedil;&atilde;o e persist&ecirc;ncia mais</span></span></p>

			<p style="margin-left:29.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">do que de planejamento</span></span></p>
			</td>
			<td style="height:58px; width:47px">
			<p>&nbsp;</p>

			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">41</span></span></p>
			</td>
			<td style="height:58px; width:257px">
			<p style="margin-left:60.65pt"><span style="color:#FFFFFF"><span style="font-size:18px">Mete-se em apuros pela sua impetuosidade</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">17</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Objetivo</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">42</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:33.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">Infringe a lei ou direitos dos outros para atingir seus objetivos</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">18</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Apresenta sugest&otilde;es, ideias</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">43</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Dificilmente pede desculpas</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">19</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">L&iacute;der nato</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">44</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:71.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">Profere declara&ccedil;&otilde;es cru&eacute;is, sarc&aacute;sticas</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">20</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Insistente</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">45</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:39.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Age tiranicamente sobre os sentimentos dos outros</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">21</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Intuitivo</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">46</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Orgulhoso</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">22</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o liga muito para artes</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">47</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Arrogante</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">23</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Mais raz&atilde;o do que cora&ccedil;&atilde;o</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">48</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:36.2pt"><span style="color:#FFFFFF"><span style="font-size:18px">Tem dificuldade para se concentrar quando ora ou l&ecirc; a B&iacute;blia</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">24</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Extrovertido</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">49</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:71.6pt"><span style="color:#FFFFFF"><span style="font-size:18px">Frustra os outros porque nunca o satisfazem</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:24px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">25</span></span></p>
			</td>
			<td style="height:24px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Firme</span></span></p>
			</td>
			<td style="height:24px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">50</span></span></p>
			</td>
			<td style="height:24px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Prepotente</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Total de Itens B: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td colspan="5" style="height:21px; width:607px">
			<p style="margin-left:1.6pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>C - MELANC&Oacute;LICO</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:25px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">1</span></span></p>
			</td>
			<td style="height:25px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Anal&iacute;tico</span></span></p>
			</td>
			<td rowspan="25" style="height:25px; width:19px">
			<p>&nbsp;</p>
			</td>
			<td style="height:25px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">26</span></span></p>
			</td>
			<td style="height:25px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Evita ficar em evid&ecirc;ncia</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:35px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">2</span></span></p>
			</td>
			<td style="height:35px; width:236px">
			<p style="margin-left:68.05pt"><span style="color:#FFFFFF"><span style="font-size:18px">Abnegado (que n&atilde;o age por interesse)</span></span></p>
			</td>
			<td style="height:35px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">27</span></span></p>
			</td>
			<td style="height:35px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Reservado quanto a expor suas ideias</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:35px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">3</span></span></p>
			</td>
			<td style="height:35px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Perfeccionista</span></span></p>
			</td>
			<td style="height:35px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">28</span></span></p>
			</td>
			<td style="height:35px; width:257px">
			<p style="margin-left:90.45pt"><span style="color:#FFFFFF"><span style="font-size:18px">Fala pouco, mas &eacute; muito preciso no que diz</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:35px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">4</span></span></p>
			</td>
			<td style="height:35px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Apreciador de artes</span></span></p>
			</td>
			<td style="height:35px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">29</span></span></p>
			</td>
			<td style="height:35px; width:257px">
			<p style="margin-left:85.5pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o se compromete a fazer mais do que pode</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:26px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">5</span></span></p>
			</td>
			<td style="height:26px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Introvertido</span></span></p>
			</td>
			<td style="height:26px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">30</span></span></p>
			</td>
			<td style="height:26px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Introspectivo (retra&iacute;do)</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:35px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">6</span></span></p>
			</td>
			<td style="height:35px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; todo cora&ccedil;&atilde;o</span></span></p>
			</td>
			<td style="height:35px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">31</span></span></p>
			</td>
			<td style="height:35px; width:257px">
			<p style="margin-left:79.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Egoc&ecirc;ntrico (preocupa-se com si mesmo)</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:35px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">7</span></span></p>
			</td>
			<td style="height:35px; width:236px">
			<p style="margin-left:79.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o desaponta os que dependem dele</span></span></p>
			</td>
			<td style="height:35px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">32</span></span></p>
			</td>
			<td style="height:35px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Inclinado &agrave; autoan&aacute;lise, complacente</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:36px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">8</span></span></p>
			</td>
			<td style="height:36px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o faz amigos com facilidade</span></span></p>
			</td>
			<td style="height:36px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">33</span></span></p>
			</td>
			<td style="height:36px; width:257px">
			<p style="margin-left:85.85pt"><span style="color:#FFFFFF"><span style="font-size:18px">Interesse excessivo pela sua condi&ccedil;&atilde;o f&iacute;sica</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:26px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">9</span></span></p>
			</td>
			<td style="height:26px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Amigo fiel</span></span></p>
			</td>
			<td style="height:26px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">34</span></span></p>
			</td>
			<td style="height:26px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Fica alimentando desejos de vingan&ccedil;a</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:35px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">10</span></span></p>
			</td>
			<td style="height:35px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Bom diagnosticador de problemas</span></span></p>
			</td>
			<td style="height:35px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">35</span></span></p>
			</td>
			<td style="height:35px; width:257px">
			<p style="margin-left:81.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">Hipocondr&iacute;aco (sempre acha que est&aacute; doente</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:27px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">11</span></span></p>
			</td>
			<td style="height:27px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Pessoa de confian&ccedil;a</span></span></p>
			</td>
			<td style="height:27px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">36</span></span></p>
			</td>
			<td style="height:27px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ofende-se muito facilmente</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:35px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">12</span></span></p>
			</td>
			<td style="height:35px; width:236px">
			<p style="margin-left:53.5pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o procura as pessoas. Deixa que elas o procurem</span></span></p>
			</td>
			<td style="height:35px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">37</span></span></p>
			</td>
			<td style="height:35px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Desconfiado</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:35px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">13</span></span></p>
			</td>
			<td style="height:35px; width:236px">
			<p style="margin-left:64.55pt"><span style="color:#FFFFFF"><span style="font-size:18px">Consegue prever os obst&aacute;culos de um projeto</span></span></p>
			</td>
			<td style="height:35px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">38</span></span></p>
			</td>
			<td style="height:35px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Dado a suposi&ccedil;&otilde;es desfavor&aacute;veis</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:26px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">14</span></span></p>
			</td>
			<td style="height:26px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Tem confian&ccedil;a em sua capacidade</span></span></p>
			</td>
			<td style="height:26px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">39</span></span></p>
			</td>
			<td style="height:26px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Dificilmente perdoa</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:35px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">15</span></span></p>
			</td>
			<td style="height:35px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Sensibilidade e talento art&iacute;stico</span></span></p>
			</td>
			<td style="height:35px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">40</span></span></p>
			</td>
			<td style="height:35px; width:257px">
			<p style="margin-left:74.85pt"><span style="color:#FFFFFF"><span style="font-size:18px">Dotado de autocomisera&ccedil;&atilde;o (se faz de &quot;coitado&quot;)</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:35px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">16</span></span></p>
			</td>
			<td style="height:35px; width:236px">
			<p style="margin-left:48.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Varia sua disposi&ccedil;&atilde;o de esp&iacute;rito conforme situa&ccedil;&atilde;o</span></span></p>
			</td>
			<td style="height:35px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">41</span></span></p>
			</td>
			<td style="height:35px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Pessimista</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:26px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">17</span></span></p>
			</td>
			<td style="height:26px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; correto na profiss&atilde;o</span></span></p>
			</td>
			<td style="height:26px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">42</span></span></p>
			</td>
			<td style="height:26px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Inseguro</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:26px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">18</span></span></p>
			</td>
			<td style="height:26px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Sacrifica-se pessoalmente</span></span></p>
			</td>
			<td style="height:26px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">43</span></span></p>
			</td>
			<td style="height:26px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Temeroso</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:27px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">19</span></span></p>
			</td>
			<td style="height:27px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Esquiva-se de conflitos</span></span></p>
			</td>
			<td style="height:27px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">44</span></span></p>
			</td>
			<td style="height:27px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Cr&iacute;tico inflex&iacute;vel</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:26px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">20</span></span></p>
			</td>
			<td style="height:26px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o ocioso</span></span></p>
			</td>
			<td style="height:26px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">45</span></span></p>
			</td>
			<td style="height:26px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Depressivo</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:27px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">21</span></span></p>
			</td>
			<td style="height:27px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Criativo</span></span></p>
			</td>
			<td style="height:27px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">46</span></span></p>
			</td>
			<td style="height:27px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Foge da realidade e entra em devaneio</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:26px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">22</span></span></p>
			</td>
			<td style="height:26px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Sens&iacute;vel emocionalmente</span></span></p>
			</td>
			<td style="height:26px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">47</span></span></p>
			</td>
			<td style="height:26px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Mal-humorado</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:35px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">23</span></span></p>
			</td>
			<td style="height:35px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Pensador</span></span></p>
			</td>
			<td style="height:35px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">48</span></span></p>
			</td>
			<td style="height:35px; width:257px">
			<p style="margin-left:56.0pt"><span style="color:#FFFFFF"><span style="font-size:18px">Deixa-se levar a m&oacute;rbidas (doentias) condi&ccedil;&otilde;es mentais</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:35px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">24</span></span></p>
			</td>
			<td style="height:35px; width:236px">
			<p style="margin-left:69.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Revive acontecimentos e decis&otilde;es passadas</span></span></p>
			</td>
			<td style="height:35px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">49</span></span></p>
			</td>
			<td style="height:35px; width:257px">
			<p style="margin-left:75.05pt"><span style="color:#FFFFFF"><span style="font-size:18px">Acha que sempre est&atilde;o conspirando contra ele</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:28px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">25</span></span></p>
			</td>
			<td style="height:28px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Cumpridor de suas responsabilidades</span></span></p>
			</td>
			<td style="height:28px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">50</span></span></p>
			</td>
			<td style="height:28px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Tudo que o afeta &eacute; algo capital</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Total de Itens C: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<table border="1" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td colspan="5" style="height:23px; width:607px">
			<p style="margin-left:1.6pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>D - FLEUM&Aacute;TICO</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:37px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">1</span></span></p>
			</td>
			<td style="height:37px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Calmo</span></span></p>
			</td>
			<td rowspan="25" style="height:37px; width:19px">
			<p>&nbsp;</p>
			</td>
			<td style="height:37px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">26</span></span></p>
			</td>
			<td style="height:37px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Cumpridor de suas obriga&ccedil;&otilde;es e</span></span></p>

			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">hor&aacute;rios</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">2</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Frio</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">27</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Conciliador</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">3</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Bem equilibrado</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">28</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Pacificador nato</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">4</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; todo raz&atilde;o</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">29</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Sabe ouvir com paci&ecirc;ncia e aten&ccedil;&atilde;o</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">5</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Mant&eacute;m as emo&ccedil;&otilde;es sob controle</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">30</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Bom conselheiro</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">6</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Racional</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">31</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Moroso</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">7</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:80.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">Raramente explode em raiva ou riso</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">32</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Indolente</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">8</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Aprecia artes</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">33</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Sem motiva&ccedil;&atilde;o</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">9</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Fino gosto pelas coisas</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">34</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Provocador</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">10</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Controlado</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">35</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Distante e g&eacute;lido (frio, insens&iacute;vel)</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">11</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Gosta do conv&iacute;vio social</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">36</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Obstinado (persistente e teimoso)</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">12</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:33.2pt"><span style="color:#FFFFFF"><span style="font-size:18px">Despreocupado com as circunst&acirc;ncias ao redor</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">37</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ego&iacute;sta</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">13</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:63.0pt"><span style="color:#FFFFFF"><span style="font-size:18px">Sente mais emo&ccedil;&otilde;es do que demonstra</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">38</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Indeciso</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">14</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Pr&aacute;tico e eficiente</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">39</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Resistente</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">15</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:36.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Senso de humor mordaz (sarc&aacute;stico, agressivo)</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">40</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Avarento</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">16</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:63.5pt"><span style="color:#FFFFFF"><span style="font-size:18px">Provoca gargalhada sem esbo&ccedil;ar um sorriso</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">41</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Descompromissado</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">17</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">C&eacute;rebro organizado</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">42</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:62.0pt"><span style="color:#FFFFFF"><span style="font-size:18px">Quando se sente for&ccedil;ado torna-se mais vagaroso</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">18</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Trabalha bem sob tens&atilde;o</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">43</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Expectador da vida sem se envolver</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">19</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:34.9pt"><span style="color:#FFFFFF"><span style="font-size:18px">Pouco se envolve com as atividades do pr&oacute;ximo</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">44</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Acomodado</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">20</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Vida regrada</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">45</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Usa seu humor contra outros</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:23px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">21</span></span></p>
			</td>
			<td style="height:23px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Tende a rotina</span></span></p>
			</td>
			<td style="height:23px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">46</span></span></p>
			</td>
			<td style="height:23px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">Conservador por comodismo</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">22</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:47.75pt"><span style="color:#FFFFFF"><span style="font-size:18px">Mais espectador que modificador de circunst&acirc;ncias</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">47</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:80.85pt"><span style="color:#FFFFFF"><span style="font-size:18px">Disfar&ccedil;a sua obstina&ccedil;&atilde;o com seu humor</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">23</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:43.9pt"><span style="color:#FFFFFF"><span style="font-size:18px">Met&oacute;dico. Suas coisas est&atilde;o sempre arrumadas</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">48</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:2.7pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o se envolve</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:39px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">24</span></span></p>
			</td>
			<td style="height:39px; width:236px">
			<p style="margin-left:58.9pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; de bom cora&ccedil;&atilde;o, mas n&atilde;o deixa transparecer</span></span></p>
			</td>
			<td style="height:39px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">49</span></span></p>
			</td>
			<td style="height:39px; width:257px">
			<p style="margin-left:41.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Vacila entre o desejo de fazer e de n&atilde;o fazer alguma coisa</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:41px; width:47px">
			<p style="margin-left:.3pt"><span style="color:#FFFFFF"><span style="font-size:18px">25</span></span></p>
			</td>
			<td style="height:41px; width:236px">
			<p style="margin-left:2.8pt"><span style="color:#FFFFFF"><span style="font-size:18px">Capaz</span></span></p>
			</td>
			<td style="height:41px; width:47px">
			<p style="margin-left:.35pt"><span style="color:#FFFFFF"><span style="font-size:18px">50</span></span></p>
			</td>
			<td style="height:41px; width:257px">
			<p style="margin-left:3.0cm"><span style="color:#FFFFFF"><span style="font-size:18px">Procrastinador (&quot;enrola&quot;, demora adia)</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Total de Itens D: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<h5><span style="color:#FFFFFF"><span style="font-size:18px">O C&Aacute;LCULO DA PERCENTAGEM DOS TEMPERAMENTOS</span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">1&ordm;) Conte o n&uacute;mero de itens assinalados em cada tabela de temperamento e some todos os resultados.</span></span></p>

<h5><span style="color:#FFFFFF"><span style="font-size:18px"><img src="file:///C:/Users/stanl/AppData/Local/Packages/oice_16_974fa576_32c1d314_2a83/AC/Temp/msohtmlclip1/01/clip_image004.gif" style="height:162px; width:79px" />Total de Itens A &ndash; Sangu&iacute;neo Total de Itens B - Col&eacute;rico Total de Itens C - Melanc&oacute;lico Total de Itens D - Fleum&aacute;tico</span></span></h5>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Total</strong><strong> [S]</strong></span></span></p>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Tabela 1</span></span></p>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">2&ordm;) Divida o n&uacute;mero de cada temperamento (A, B, C e D) pela soma e multiplique por</span></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">100. Com isto voc&ecirc; obter&aacute; a percentagem de cada temperamento em voc&ecirc;. Calculando a Porcentagem:</span></span></p>

<p>&nbsp;</p>

<table border="0" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td style="height:27px; width:225px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Totais</strong></span></span></p>
			</td>
			<td style="height:27px; width:84px">
			<p>&nbsp;</p>
			</td>
			<td style="height:27px; width:70px">
			<p>&nbsp;</p>
			</td>
			<td style="height:27px; width:96px">
			<p>&nbsp;</p>
			</td>
			<td style="height:27px; width:110px">
			<p>&nbsp;</p>
			</td>
		</tr>
		<tr>
			<td style="height:40px; width:225px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Tab. 1</strong></span></span></p>
			</td>
			<td style="height:40px; width:84px">
			<p>&nbsp;</p>
			</td>
			<td style="height:40px; width:70px">
			<p>&nbsp;</p>
			</td>
			<td style="height:40px; width:96px">
			<p style="margin-left:43.55pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>[S]</strong></span></span></p>
			</td>
			<td style="height:40px; width:110px">
			<p style="margin-left:48.4pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>%</strong></span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:34px; width:225px">
			<p style="margin-left:6.8pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Sangu&iacute;neo (A)</strong></span></span></p>
			</td>
			<td style="height:34px; width:84px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px">x 100 =</span></span></p>
			</td>
			<td style="height:34px; width:70px">
			<p>&nbsp;</p>
			</td>
			<td style="height:34px; width:96px">
			<p style="margin-left:7.9pt"><span style="color:#FFFFFF"><span style="font-size:18px">&divide;</span></span></p>
			</td>
			<td style="height:34px; width:110px">
			<p style="margin-left:8.65pt"><span style="color:#FFFFFF"><span style="font-size:18px">=</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:32px; width:225px">
			<p>&nbsp;</p>
			</td>
			<td style="height:32px; width:84px">
			<p>&nbsp;</p>
			</td>
			<td style="height:32px; width:70px">
			<p>&nbsp;</p>
			</td>
			<td style="height:32px; width:96px">
			<p>&nbsp;</p>
			</td>
			<td style="height:32px; width:110px">
			<p>&nbsp;</p>
			</td>
		</tr>
		<tr>
			<td style="height:34px; width:225px">
			<p style="margin-left:14.95pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Col&eacute;rico (B)</strong></span></span></p>
			</td>
			<td style="height:34px; width:84px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px">x 100 =</span></span></p>
			</td>
			<td style="height:34px; width:70px">
			<p>&nbsp;</p>
			</td>
			<td style="height:34px; width:96px">
			<p style="margin-left:7.9pt"><span style="color:#FFFFFF"><span style="font-size:18px">&divide;</span></span></p>
			</td>
			<td style="height:34px; width:110px">
			<p style="margin-left:8.65pt"><span style="color:#FFFFFF"><span style="font-size:18px">=</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:30px; width:225px">
			<p>&nbsp;</p>
			</td>
			<td style="height:30px; width:84px">
			<p>&nbsp;</p>
			</td>
			<td style="height:30px; width:70px">
			<p>&nbsp;</p>
			</td>
			<td style="height:30px; width:96px">
			<p>&nbsp;</p>
			</td>
			<td style="height:30px; width:110px">
			<p>&nbsp;</p>
			</td>
		</tr>
		<tr>
			<td style="height:34px; width:225px">
			<p style="margin-left:2.5pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Melanc&oacute;lico (C)</strong></span></span></p>
			</td>
			<td style="height:34px; width:84px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px">x 100 =</span></span></p>
			</td>
			<td style="height:34px; width:70px">
			<p>&nbsp;</p>
			</td>
			<td style="height:34px; width:96px">
			<p style="margin-left:7.9pt"><span style="color:#FFFFFF"><span style="font-size:18px">&divide;</span></span></p>
			</td>
			<td style="height:34px; width:110px">
			<p style="margin-left:8.65pt"><span style="color:#FFFFFF"><span style="font-size:18px">=</span></span></p>
			</td>
		</tr>
		<tr>
			<td style="height:32px; width:225px">
			<p>&nbsp;</p>
			</td>
			<td style="height:32px; width:84px">
			<p>&nbsp;</p>
			</td>
			<td style="height:32px; width:70px">
			<p>&nbsp;</p>
			</td>
			<td style="height:32px; width:96px">
			<p>&nbsp;</p>
			</td>
			<td style="height:32px; width:110px">
			<p>&nbsp;</p>
			</td>
		</tr>
		<tr>
			<td style="height:34px; width:225px">
			<p style="margin-left:5.6pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Fleum&aacute;tico (D)</strong></span></span></p>
			</td>
			<td style="height:34px; width:84px">
			<p><span style="color:#FFFFFF"><span style="font-size:18px">x 100 =</span></span></p>
			</td>
			<td style="height:34px; width:70px">
			<p>&nbsp;</p>
			</td>
			<td style="height:34px; width:96px">
			<p style="margin-left:7.9pt"><span style="color:#FFFFFF"><span style="font-size:18px">&divide;</span></span></p>
			</td>
			<td style="height:34px; width:110px">
			<p style="margin-left:8.65pt"><span style="color:#FFFFFF"><span style="font-size:18px">=</span></span></p>
			</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<h5><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;<em>Com temperamentos reconhecidos, &eacute; infinitamente mais f&aacute;cil lidar com as pessoas, pois o nosso comportamento &eacute; diretamente manipulado pelo nosso temperamento</em>&rdquo;<sup>3</sup>. Devemos saber que nem todas as pessoas entendem uma palavra da mesma maneira, ou seja, cada indiv&iacute;duo possui um padr&atilde;o de entendimento.</span></span></p>

<p>&nbsp;</p>

<table align="left" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td><span style="color:#FFFFFF"><span style="font-size:18px"><img src="file:///C:/Users/stanl/AppData/Local/Packages/oice_16_974fa576_32c1d314_2a83/AC/Temp/msohtmlclip1/01/clip_image001.gif" style="height:1px; width:192px" /></span></span></td>
		</tr>
	</tbody>
</table>
&nbsp;

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">3&nbsp;BRUNET, Tiago. <em>12</em> <em>Dias</em> <em>para</em> <em>Atualizar</em> <em>sua</em> <em>Vida.</em> S&atilde;o Paulo: Vida, 2017. p. 123</span></span></p>
</div>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF"><span style="font-size:18px">Desta maneira, torna-se imprescind&iacute;vel o aprendizado sobre os temperamentos para que haja maior intera&ccedil;&atilde;o e comunica&ccedil;&atilde;o mais efetiva com outras pessoas.</span></span></p>

      `,
    imagem: require('@/assets/images/cdv11.png'),
  },
  {
    titulo: 'Lição 12 Qual é a sua missão',
    videoUrl: 'https://www.youtube.com/embed/kFIYzCqkIqs?si=C_u7H0trsNawCHi2',
    descricao:
      `
      <div>
<h5><span style="color:#FFFFFF"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">O chamado ao discipulado e ao servi&ccedil;o no Reino de Deus &eacute; intencional. Ser intencional significa trabalhar com prop&oacute;sito - fazer valer a pena cada a&ccedil;&atilde;o de servi&ccedil;o ao Senhor.</span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">Em 1 Pe. 4.10, verifica-se que os dons espirituais s&atilde;o totalmente funcionais, ou seja, devemos exercer o dom que recebemos pois &eacute; ele que define o tipo de servi&ccedil;o que empenharemos no Reino de Deus. Descoberto o prop&oacute;sito, nossa miss&atilde;o se torna vis&iacute;vel e concreta, resultando no crescimento pessoal de cada disc&iacute;pulo e na edifica&ccedil;&atilde;o do Corpo de Cristo.</span></p>

<p>&nbsp;</p>

<h5><span style="color:#FFFFFF"><strong>I.SERVINDO COM PROP&Oacute;SITO</strong></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">A B&iacute;blia nos ensina que fomos criados por Deus para cumprir seus prop&oacute;sitos na Terra (Gn. 1.26-28). No entanto, n&atilde;o basta somente saber que h&aacute; um prop&oacute;sito, mas descobrir qual &eacute; este prop&oacute;sito.</span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">Em primeiro lugar, precisamos saber o que significa prop&oacute;sito. De acordo com dicion&aacute;rio, prop&oacute;sito &eacute;: <em>&ldquo;inten&ccedil;&atilde;o</em> <em>(de</em> <em>fazer</em> <em>algo),</em> <em>projeto,</em> <em>des&iacute;gnio;</em> <em>aquilo</em> <em>que</em> <em>se</em> <em>busca</em> <em>alcan&ccedil;ar;</em> <em>objetivo, </em><em>finalidade, intuito; aquilo a que algu&eacute;m se prop&ocirc;s ou por que se decidiu; decis&atilde;o, determina&ccedil;&atilde;o, resolu&ccedil;&atilde;o.&rdquo;</em></span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">Em segundo lugar, &eacute; necess&aacute;rio e importante descobrir para que nascemos e para qual finalidade Deus nos chamou. Esta descoberta pode at&eacute; parecer &oacute;bvia, mas est&aacute; intrinsicamente ligada &agrave; evidencia&ccedil;&atilde;o e ao desenvolvimento de nossos dons e talentos, os quais devem ser usados para a gl&oacute;ria de Deus.</span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">Deus reafirma Seu compromisso com nosso plano e destino (Sl. 139.13-18) e est&aacute; intimamente envolvido na forma&ccedil;&atilde;o de cada indiv&iacute;duo, pois todos os nossos dias est&atilde;o escritos, mesmo antes que eles aconte&ccedil;am.</span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">S&oacute; conseguiremos servir com finalidade (prop&oacute;sito) ap&oacute;s saber o que o Criador deseja que realizemos nesta vida, e isso implica em saber que:</span></p>
</div>

<div>
<ol>
	<li><span style="color:#FFFFFF">Entender sua identidade &eacute; o primeiro passo que levar&aacute; voc&ecirc; a descobrir seu prop&oacute;sito;</span></li>
	<li><span style="color:#FFFFFF">O prop&oacute;sito est&aacute; enraizado na sua hist&oacute;ria e na descoberta de seus dons;</span></li>
	<li><span style="color:#FFFFFF">Suas motiva&ccedil;&otilde;es (paix&atilde;o), metas e seu relacionamento com Deus s&atilde;o importantes para descoberta de seu prop&oacute;sito;</span></li>
	<li><span style="color:#FFFFFF">O objetivo do CDV &eacute; auxiliar o aluno a explorar estes elementos.</span></li>
</ol>

<p>&nbsp;</p>

<h5><span style="color:#FFFFFF"><strong>II.AVALIANDO AS POSSIBLIDADES E OPORTUNIDADES</strong></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">Todos os crist&atilde;os que s&atilde;o nascidos de novo devem encontrar seu lugar no Corpo de Cristo, e avaliar as oportunidades e suas possibilidades (especialmente de tempo) que v&atilde;o surgindo &eacute; uma tarefa necess&aacute;ria e importante, n&atilde;o tendo que se falar na falta de dons e talentos para servir a Deus.</span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">O tempo, tal como o conhecemos &ndash; os segundos, minutos, horas, dias, meses, anos que transcorrem desde o come&ccedil;o do Universo e continuar&atilde;o at&eacute; o fim do mundo, diz respeito a n&oacute;s seres humanos, e n&atilde;o a Deus. Todo o tempo - passado, presente e futuro - est&aacute; presente para Deus, por assim dizer, comprimido nesse &uacute;nico e infinito instante a que chamamos de eternidade.<sup>4</sup> Mas para n&oacute;s, o tempo se traduz em oportunidades.</span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">A Palavra de Deus diz que devemos aproveitar ao m&aacute;ximo todas as oportunidades, no entanto, devemos avali&aacute;-las para que n&atilde;o nos desviemos de nosso prop&oacute;sito.</span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">Quando falamos de possibilidades, encontramos em Lev&iacute;tico (Lv. 1.1-17) um sistema em que as ofertas eram dadas de acordo com as condi&ccedil;&otilde;es de cada israelita e dedicadas a Deus atrav&eacute;s de sacrif&iacute;cios de animais de forma <strong>volunt&aacute;ria </strong>(Lv. 1.2), <strong>sem defeito </strong>(Lv. 1.3,10) e como <strong>aroma suave </strong>(vs. 9, 13 e 17).</span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">Nossa doa&ccedil;&atilde;o (de tempo, energia, talentos etc.) torna-se agrad&aacute;vel a Deus na medida em que nos exercitamos em todo o tipo de servi&ccedil;o desinteressado &ndash; com a motiva&ccedil;&atilde;o correta, visando a gl&oacute;ria de Deus. Em 1 Cor&iacute;ntios 3.13, a B&iacute;blia afirma que o fogo vai provar qual a obra, e n&atilde;o quanto &agrave; obra. A motiva&ccedil;&atilde;o que nos levou &agrave; pr&aacute;tica de um determinado servi&ccedil;o &eacute; que ser&aacute; trazida &agrave; luz.</span></p>

<p>&nbsp;</p>

<h5><span style="color:#FFFFFF"><strong>III.MISS&Atilde;O X VIS&Atilde;O</strong></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">Miss&atilde;o &eacute; o pr&oacute;ximo passo, aquilo que voc&ecirc; deve fazer diariamente para que o futuro chegue no prazo determinado.<sup>5</sup> Qual &eacute; a sua miss&atilde;o?</span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">Sem vis&atilde;o, n&atilde;o h&aacute; miss&atilde;o. Imagine um soldado que diante de uma guerra lutar&aacute; contra o ex&eacute;rcito inimigo a fim de que n&atilde;o perca seu territ&oacute;rio e seu povo n&atilde;o seja escravizado. Neste caso, o soldado tem a miss&atilde;o de guerrear e lutar, mas s&oacute; a far&aacute; por ter em sua mente a clara vis&atilde;o do desejo de ver seu povo livre e seu territ&oacute;rio protegido.</span></p>

<p>&nbsp;</p>

<table align="left" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td><span style="color:#FFFFFF"><img src="file:///C:/Users/stanl/AppData/Local/Packages/oice_16_974fa576_32c1d314_2a83/AC/Temp/msohtmlclip1/01/clip_image001.gif" style="height:1px; width:192px" /></span></td>
		</tr>
	</tbody>
</table>
&nbsp;

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">4 &ldquo;A eternidade &eacute; simplesmente um perpetuo agora. Poder&iacute;amos dizer que &eacute; um &lsquo;&uacute;nico instante&rsquo;... seja como for, na eternidade n&atilde;o h&aacute; passado nem futuro. Tudo est&aacute; contido nesse agora que abarca tudo&rdquo; (Leo J. Trese).</span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">5&nbsp;BRUNET, Tiago. <em>12</em> <em>Dias</em> <em>para</em> <em>atualizar</em> <em>sua</em> <em>vida.</em> S&atilde;o Paulo: Vida, 2017. p. 37</span></p>
</div>

<p>&nbsp;</p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">Nos dias de hoje, &eacute; muito comum existirem pessoas sem certeza de sua miss&atilde;o. Isso acontece porque elas n&atilde;o t&ecirc;m vis&atilde;o do que almejam, e na maioria das vezes ainda n&atilde;o descobriram seu prop&oacute;sito. Em G&ecirc;nesis 25.31-34, encontramos o epis&oacute;dio em que Esa&uacute; vende a Jac&oacute; sua primogenitura em troca de um prato de lentilhas. Claramente Esa&uacute; n&atilde;o tinha vis&atilde;o, e trocou seu direito por uma necessidade (fome) deixando de exercer sua miss&atilde;o como filho mais velho.</span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">Quando h&aacute; vis&atilde;o, h&aacute; futuro; quando se tem miss&atilde;o, h&aacute; produ&ccedil;&atilde;o; quando se tem prop&oacute;sito, a vida passa a ter sentido.</span></p>

<p>&nbsp;</p>

<h5><span style="color:#FFFFFF"><strong>CONCLUS&Atilde;O</strong></span></h5>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">Todo disc&iacute;pulo precisar ser a pessoa certa, no lugar certo, com a motiva&ccedil;&atilde;o certa. Ningu&eacute;m deve estar ensinando se o seu dom n&atilde;o &eacute; ensino. Ningu&eacute;m deve estar administrando se o seu dom n&atilde;o &eacute; administra&ccedil;&atilde;o. Aquele que n&atilde;o utiliza seus dons e talentos para servir em determinada &aacute;rea da igreja, facilmente se desencoraja e, &agrave;s vezes, at&eacute; desiste da igreja. O mais grave &eacute; quando desiste tamb&eacute;m da f&eacute;.</span></p>

<p style="margin-left:7.15pt"><span style="color:#FFFFFF">Nenhum disc&iacute;pulo deve ficar sobrecarregado de atividades com duas, tr&ecirc;s ou mais fun&ccedil;&otilde;es, e em duas ou tr&ecirc;s &aacute;reas diferentes. Com efeito, um disc&iacute;pulo bem posicionado, consciente de seu prop&oacute;sito e de sua miss&atilde;o, ser&aacute; relevante e impactante no Reino de Deus!</span></p>

      `,
    imagem: require('@/assets/images/cdv12.png'),
  },

];

const AulasScreen: React.FC = () => {
  const [aulaSelecionada, setAulaSelecionada] = useState<Aula | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!aulaSelecionada ? (
        <View>
          {/* Logo no topo */}
          <Image
            source={require('@/assets/images/avancai.jpg')}
            style={styles.logo}
          />
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
            onPress={() => setAulaSelecionada(null)}>
            <Text style={styles.buttonText}>Aula Concluída</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setAulaSelecionada(null)}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          {/* <Text style={styles.descricao}>{aulaSelecionada.descricao}</Text> */}
          {/* <WebView
            originWhitelist={['*']}
            source={{ html: aulaSelecionada.descricao }}
            style={styles.webview}
            scrollEnabled={false} // Desativa scroll dentro do WebView
            containerStyle={{ backgroundColor: "transparent" }}
            setBackgroundColor={"transparent"} // Android: Remove fundo branco
            javaScriptEnabled={true} // Permite executar JavaScript
          /> */}
          <AutoHeightWebView
            originWhitelist={['*']}
            source={{ html: aulaSelecionada.descricao || "<p>Sem descrição disponível</p>" }}
            style={{ width: '100%', backgroundColor: 'transparent', marginTop: 10 }}
            scrollEnabled={false}
            javaScriptEnabled={true}
          />

        </View>
      )}
    </ScrollView>
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
  video: {
    height: 200,
    marginBottom: 16,
  },
  descricao: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
    color: '#FFF', // Texto branco
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
  webview: {
    marginTop: 20,
    height: 2500,
    backgroundColor: "transparent", // Garante fundo transparente no iOS
    color: 'white',
  },
});
