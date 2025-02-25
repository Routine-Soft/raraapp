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
<h1><span style="font-size:48px"><span style="color:#FFFFFF">INTRODU&Ccedil;&Atilde;O</span></span></h1>

<p style="margin-left:64.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">A experi&ecirc;ncia mais importante de sua vida &eacute; conhecer Jesus Cristo pessoalmente e relacionar- se com Ele. Jesus veio ao mundo para nos mostrar quem &eacute; Deus e como podemos conhec&ecirc;-lo. Se voc&ecirc; quer que o seu relacionamento com Cristo cres&ccedil;a, voc&ecirc; precisa conhec&ecirc;-lo melhor. Para isso &eacute; preciso compreender melhor quem Ele &eacute;, porqu&ecirc; Ele veio e o que Ele deseja fazer em sua vida.</span></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<h2><span style="font-size:48px"><span style="color:#FFFFFF">QUEM &Eacute; JESUS?</span></span></h2>

<p style="margin-left:64.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">Muitas pessoas tem uma vis&atilde;o distorcida ou limitada sobre Jesus. De acordo com as passagens abaixo, quem &eacute; Jesus?</span></span></p>

<p style="margin-left:108.25pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; Mateus 16:16</span></span></p>

<p style="margin-left:106.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; Colossenses 1:15-17</span></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<h2><span style="font-size:48px"><span style="color:#FFFFFF">POR QUE JESUS VEIO?</span></span></h2>

<p style="margin-left:64.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">Nas passagens abaixo, quais s&atilde;o as raz&otilde;es da vinda de Cristo?</span></span></p>

<p style="margin-left:106.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; Lucas 4:16-19</span></span></p>

<p style="margin-left:106.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; 1 Tim&oacute;teo 2:5-6</span></span></p>

<p style="margin-left:106.1pt">&nbsp;</p>

<h3><span style="font-size:48px"><span style="color:#FFFFFF"><strong>Por que precisamos nos reconciliar com Deus?</strong></span></span></h3>

<p style="margin-left:103.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; Isa&iacute;as 59:2</span></span></p>

<p style="margin-left:103.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; Romanos 3:23</span></span></p>

<p>&nbsp;</p>

<p style="margin-left:64.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">Pecado significa rebeli&atilde;o pessoal contra Deus e afastamento dos prop&oacute;sitos que ele tem para nossas vidas.</span></span></p>

<p>&nbsp;</p>

<h3><span style="font-size:48px"><span style="color:#FFFFFF"><strong>Qual foi a solu&ccedil;&atilde;o de Jesus para o pecado?</strong></span></span></h3>

<p style="margin-left:103.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; Romanos 5:8-9</span></span></p>

<p style="margin-left:103.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; 1 Pedro 3:18</span></span></p>

<p style="margin-left:103.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; Atos 4:12</span></span></p>

<p>&nbsp;</p>

<h3><span style="font-size:48px"><span style="color:#FFFFFF"><strong>Qual o resultado de sua morte?</strong></span></span></h3>

<p style="margin-left:103.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; ll Cor&iacute;ntios 5:19-21</span></span></p>

<p style="margin-left:103.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; Romanos 5:1-2</span></span></p>

<p>&nbsp;</p>

<h3><span style="font-size:48px"><span style="color:#FFFFFF"><strong>Que prova temos n&oacute;s da sua ressurrei&ccedil;&atilde;o?</strong></span></span></h3>

<p style="margin-left:103.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; 1 Cor&iacute;ntios 15:3-8</span></span></p>

<p style="margin-left:103.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; Atos 10:40-41</span></span></p>

<p>&nbsp;</p>

<h3><span style="font-size:48px"><span style="color:#FFFFFF"><strong>Quais s&atilde;o as raz&otilde;es da import&acirc;ncia de sua ressurrei&ccedil;&atilde;o?</strong></span></span></h3>

<p style="margin-left:103.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; 1 Cor&iacute;ntios 15:13-18</span></span></p>

<h3><span style="font-size:48px"><span style="color:#FFFFFF"><strong>Nos versos abaixo, quais s&atilde;o os fatores chaves do nosso compromisso com Cristo?</strong></span></span></h3>

<p>&nbsp;</p>

<p style="margin-left:100.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic;&nbsp; Atos 3:19</span></span></p>

<p style="margin-left:100.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">&radic; Romanos 10:9-10</span></span></p>

<p>&nbsp;</p>

<h2><span style="font-size:48px"><span style="color:#FFFFFF"><strong>NOSSA RESPOSTA</strong></span></span></h2>

<p style="margin-left:64.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">Para respondermos ao convite de Jesus e deix&aacute;-lo ser nosso Salvador e Senhor, &eacute; necess&aacute;rio que tomemos certas atitudes.</span></span></p>

<p style="margin-left:64.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">Embora Jesus tenha morrido pelos pecados de todo mundo, &eacute; preciso que haja uma resposta pessoal, individual para com Ele. Para nos relacionamentos com Ele, precisamos deixar nosso antigo modo de vida (arrependimento), precisamos confiar totalmente em Jesus para nossa salva&ccedil;&atilde;o (f&eacute;) e convid&aacute;-lo para fazer parte das nossas vidas.</span></span></p>

<p style="margin-left:64.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">Ao inv&eacute;s de um mero acordo intelectual repleto de ensinamentos sobre Jesus, isto significa um compromisso total de vida com Ele como Senhor. Este &eacute; o verdadeiro significado de tornar-se crente.</span></span></p>

<p style="margin-left:64.1pt"><span style="font-size:48px"><span style="color:#FFFFFF">Como j&aacute; vimos, receber a Cristo &eacute; o come&ccedil;o de um relacionamento com Ele. Isto quer dizer que deve haver continuidade, deve haver crescimento para que haja significado real e satisfat&oacute;rio. Os cap&iacute;tulos seguintes deste estudo v&atilde;o tratar do desenvolvimento de seu relacionamento com Cristo.</span></span></p>

<h2><span style="font-size:48px"><span style="color:#FFFFFF"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<h3><span style="font-size:48px"><span style="color:#FFFFFF"><strong>Lembre-se dos passos b&aacute;sicos para se tornar em crente:</strong></span></span></h3>

<p>&nbsp;</p>

<ul>
	<li><span style="font-size:48px"><span style="color:#FFFFFF">Crer que Jesus morreu por seus pecados e ressuscitou para justific&aacute;-lo diante de Deus</span></span></li>
	<li><span style="font-size:48px"><span style="color:#FFFFFF">Arrepender-se de seus pecados (admitindo a Deus que voc&ecirc; &eacute; pecador) e afastar-se deles.</span></span></li>
	<li><span style="font-size:48px"><span style="color:#FFFFFF">Receber o perd&atilde;o de seus pecados a aceitar a Cristo como Salvador e Senhor de sua vida.</span></span></li>
	<li><span style="font-size:48px"><span style="color:#FFFFFF">Confessar publicamente que Jesus &eacute; o Senhor (dono) de sua vida.</span></span></li>
</ul>

<p>&nbsp;</p>

      `,
    imagem: require('@/assets/images/reset1.png'),
  },
  {
    titulo: 'Lição 2 - Conhecendo Jesus Cristo',
    videoUrl: 'https://www.youtube.com/embed/_xtmwkQtx6w?si=wob4bSq7fvzHLO0S',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/reset2.png'),
  },
  {
    titulo: 'Lição 3 - Graça e Justificação',
    videoUrl: 'https://www.youtube.com/embed/thLa8h6v5pI?si=sfeiM59AyJ9vTAAj',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/reset3.png'),
  },
    {
    titulo: 'Lição 4 - O Pecado e o Arrependimento',
    videoUrl: 'https://www.youtube.com/embed/ARZyyOPEGAQ?si=pnOBMeIpOlpMJWhR',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/reset4.png'),
  },
  {
    titulo: 'Lição 5 - Princípíos da Oração',
    videoUrl: 'https://www.youtube.com/embed/ENu07d8zIZA?si=qQewKnMmX8U7oZUB',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/reset5.png'),
  },
  {
    titulo: 'Lição 6 - Batismo',
    videoUrl: 'https://www.youtube.com/embed/mzPPMX60c4g?si=g4Dbbn4OMfXjMVQD',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/reset6.png'),
  },
  {
    titulo: 'Lição 7 - Santificação',
    videoUrl: 'https://www.youtube.com/embed/6BoZ8MQh_P8?si=7yWKmlks8-geWSuI',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/reset7.png'),
  },
  {
    titulo: 'Lição 8 - Ceia do Senhor',
    videoUrl: 'https://www.youtube.com/embed/x3fofsEiiyw?si=FIftDDd3vgLngjsP',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/reset8.png'),
  },
  {
    titulo: 'Lição 9 - Vícios',
    videoUrl: 'https://www.youtube.com/embed/1w0_5drOyKM?si=kWgpvMpfRa1hFkIh',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/reset9.png'),
  },
  {
    titulo: 'Lição 10 - Jugo Desigual',
    videoUrl: 'https://www.youtube.com/embed/sWrRxP7sbJs?si=8nwuY1mRfT26HpM2',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/reset10.png'),
  },
  {
    titulo: 'Lição 11 - Servo',
    videoUrl: 'https://www.youtube.com/embed/SmMQYAbraRM?si=IdkvVMcVSe_17qsO',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/reset11.png'),
  },

];

const start: Aula[] = [
  {
    titulo: 'Lição 1 - Conhecendo a bíblia',
    videoUrl: 'https://www.youtube.com/embed/q-w0MYaLKS8?si=NODP5_RzTWoyvNJc',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/start1.png'),
  },
  {
    titulo: 'Lição 2 - Conhecendo a Deus',
    videoUrl: 'https://www.youtube.com/embed/w4KbJsqNDC4?si=XN_Zz_gUgpULRD00',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/start2.png'),
  },
  {
    titulo: 'Lição 3 - A Salvação',
    videoUrl: 'https://www.youtube.com/embed/nctL4jP0bHY?si=E3G6gwLGiiv9-SLq',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/start3.png'),
  },
    {
    titulo: 'Lição 4 - Conhecendo a Igreja',
    videoUrl: 'https://www.youtube.com/embed/5WUd_c4cQxA?si=iHzaeD69ctGbyu0e',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/start4.png'),
  },
  {
    titulo: 'Lição 5 - Princípios da Oração',
    videoUrl: 'https://www.youtube.com/embed/8XFZ2DwA3V0?si=pSTtmmRS3hR2LRcm',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/start5.png'),
  },
  {
    titulo: 'Lição 6 - O Discípulo Obediente',
    videoUrl: 'https://www.youtube.com/embed/QFN28g7PwZM?si=LHFCCQ5PHsJzTiat',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/start6.png'),
  },
  {
    titulo: 'Lição 7 - O Dizimista e Ofertante',
    videoUrl: 'https://www.youtube.com/embed/iWb4GuuPmg8?si=eDIevtRkunejqxKT',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/start7.png'),
  },
  {
    titulo: 'Lição 8 - O Discipulo e o Espírito Santo',
    videoUrl: 'https://www.youtube.com/embed/woaRLoYujx0?si=BWyOTmylSClQDIpj',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/start8.png'),
  },
  {
    titulo: 'Lição 9 - Vivendo Cheio do Espírito Santo',
    videoUrl: 'https://www.youtube.com/embed/1J4Gowxacow?si=-ut_UrvdJ9Vj6BwH',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/start9.png'),
  },
  {
    titulo: 'Lição 10 - Os dons do Espírito Santo',
    videoUrl: 'https://www.youtube.com/embed/ygEdcGRtvdY?si=8Uu12szTbR4sVWv5',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/start10.png'),
  },
  {
    titulo: 'Lição 11 - O Fruto do Espírito',
    videoUrl: 'https://www.youtube.com/embed/8DyAAH2Mv_k?si=tU_PrNElZudDek2-',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/start11.png'),
  },
  {
    titulo: 'Lição 12 - Escatologia',
    videoUrl: 'https://www.youtube.com/embed/EHa57aT2WWE?si=Q8TnSbsSdVTNMYCB',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/start12.png'),
  },

];

const cdv: Aula[] = [
  {
    titulo: 'Lição 1 - CDV: Visão e Pilares',
    videoUrl: 'https://www.youtube.com/embed/MkRQqATogCU?si=k2y1mzA92MtZTIrc',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/cdv1.png'),
  },
  {
    titulo: 'Lição 2 - A igreja e sua missão',
    videoUrl: 'https://www.youtube.com/embed/DK2qWOSDGic?si=AkwBsy4DFtCFGare',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/cdv2.png'),
  },
  {
    titulo: 'Lição 3 - O discípulo, a igreja e a cultura',
    videoUrl: 'https://www.youtube.com/embed/-ns29AeYozg?si=sLRQ-wKboJPTggNo',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/cdv3.png'),
  },
    {
    titulo: 'Lição 4 - Descobrindo os Dons Espirituais',
    videoUrl: 'https://www.youtube.com/embed/hHdynW5aNKU?si=zzO5XwjCZGM1LbKq',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/cdv4.png'),
  },
  {
    titulo: 'Lição 5 - Os dons de serviço prático e a igreja',
    videoUrl: 'https://www.youtube.com/embed/0cNAqvWIqxQ?si=yb7fj2tCwGfUDpoI',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/cdv5.png'),
  },
  {
    titulo: 'Lição 6 - Os dons de ministério e a prática excelente',
    videoUrl: 'https://www.youtube.com/embed/UGEjmcza0aI?si=IJ0UdOHPU5A9sVyl',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/cdv6.png'),
  },
  {
    titulo: 'Lição 7 - A importância dos talentos naturais',
    videoUrl: 'https://www.youtube.com/embed/LGVvLI1cmjU?si=mkpPo-_JGbBJn-nG',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/cdv7.png'),
  },
  {
    titulo: 'Lição 8 - A vocação e o chamado divino',
    videoUrl: 'https://www.youtube.com/embed/mzxQ6vxRwUI?si=Xo57p5F4LnsIJHcx',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/cdv8.png'),
  },
  {
    titulo: 'Lição 9 - Motivação: Servindo melhor',
    videoUrl: 'https://www.youtube.com/embed/CThlekbyqiQ?si=C-mBpNN_2LwNh7z0',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/cdv9.png'),
  },
  {
    titulo: 'Lição 10 - Descobrindo seu estilo pessoal',
    videoUrl: 'https://www.youtube.com/embed/N01LKNkT4r0?si=UumwXY425D1vErKB',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/cdv10.png'),
  },
  {
    titulo: 'Lição 11 - Compreendendo o temperamento pessoal',
    videoUrl: 'https://www.youtube.com/embed/4S2NmIkARpE?si=-VHqPWIHsie5FBSe',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
    imagem: require('@/assets/images/cdv11.png'),
  },
  {
    titulo: 'Lição 12 Qual é a sua missão',
    videoUrl: 'https://www.youtube.com/embed/kFIYzCqkIqs?si=C_u7H0trsNawCHi2',
    descricao:
      'Responda o questionário que está na apostila em uma folha de caderno, ou digite no WhatsApp e envie para o professor.',
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
          <WebView
            originWhitelist={['*']}
            source={{ html: aulaSelecionada.descricao }}
            style={styles.webview}
            scrollEnabled={false} // Desativa scroll dentro do WebView
            containerStyle={{ backgroundColor: "transparent" }}
            setBackgroundColor={"transparent"} // Android: Remove fundo branco
            javaScriptEnabled={true} // Permite executar JavaScript
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
