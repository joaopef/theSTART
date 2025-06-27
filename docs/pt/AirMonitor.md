# Sensor de Monitorização do Ar para Casa
Um dos poucos pontos positivos que o Covid-19 nos trouxe foi um abre olhos para a realidade que há coisas presentes nos nossos ambientes indoors que podem ser prejudiciais para a nossa saude, e que os nossos sentidos primarios como o olfato, o paladar e a visão não nos podem ajudar. 

Aqui entram os monotorizadores de indoor air quality (IAQ): Podem detetar a presenca de substancias contaminadoras e informar-nos acerca de niveis de poluição que requerem caução e ação. Quantos mais dados objetivos disponíveis, melhor a capacidade de tomada de decisão para podermos controlar um ambiente indoors de forma informada e para que ele seja saudavel.

## mais importantes

Há varios parametros que convem medir mas os principais são:

**Temperatura e Humidade** - saber os valores de temperatura e de humidade de um local ajudam a identificar quando o ambiente esta muito humido o que aumenta o risco de crescimento de bacterias e bolor. Alguns dispositivos podem ainda calcular o ponto de orvalho - o ponto de temperatura em que o ar já nao consegue conter mais vapor de agua.

**CO2** - é um composto quimico que nós humanos libertamos para o ar. niveis altos deste composto pode levar a cansaço e falta de produtividade então uma monotorizacao dos niveis de co2 permite saber se a nossa casa tem ventilação suficiente.

**Particule Matter** - As particule matters são um mix de particulas solidas e particulas de suspensao de tamanho tão reduzido que podem ser inspiradad para os nossos pulmoes. estas particulas podem ser geradas por fumo, pó, etc. Dentro das PM temos PM10 com diametros <10 micro metros e as mais perigosas para a saude PM2.5 com diametro <2.5 micro metros. Para comparacao um cabelo humano tem aproximadamente 70 micro metros de diametro.


## Hardware 

ESP32C6 - dispositivo central de recolha de dados que possui wifi para transmissao dos mesmos.

SHT41 - sensor de temperatura e humidade com melhores especificacoes do que os mais comuns dht11 e dht22.


Senseair S8 - um sensor non dispersive infrared (NDIR) com boa precisao


Planttower PMS2.5 - sensor de PM

OLED I2C 128x64 SSD1306 - um ecra monocromatico para visualizacao de dados.

## Implementacão

O objetivo é no final ter uma versão de desenvolvimento que será desenvolvida para o esp idf. no entanto para teste dos sensores e conectividade vou usar o arduino ide para fazer uso das bibliotecas que são disponibilizadas para estes sensores.

<details>
<summary><strong>Clique aqui para ver o guia técnico detalhado de configuração do ambiente</strong></summary>


### configurar o ESP32-C6:

O ESP32-C6 vem sem  instalado, então temos que "flashar" o firmware.

1- já tenho python instalado entao sigo para a instalacao do esptool: abrir cmd e  pip install esptool

2- agora é a parte mais dificil, ligar o esp ao pc usando um cabo USB-C para USB-A ahah

3- Para que este dispositivo seja reconhecido corretamente pelo PC é necessario instalar os USB to UART Bridge VCP Drivers . o download pode ser feito em [silicon labs](https://www.silabs.com/developer-tools/usb-to-uart-bridge-vcp-drivers?tab=downloads). Depois de feito o download, temos de extrair os conteudo e procurar um ficheiro chamado ``silabser.inf``, carregar com o botão direito  e instalar. Verificar que agora é reconhecido corretamente no device manager como Silicon Labs CP210x USB to UART Bridge (COMx). tomar nota do numero da porta COM, no meu caso é o COM3.

4- Agora que temos ligação podemos limpar a flash do esp de forma a garantir que nao vai haver problemas. para isto corremos `` esptool --port COM3 erase_flash`` se tudo correr bem vemos a mensagem "Chip erase completed successfully"

5- Podemos fazer download da versão mais recente para Windows do [**ESP IDF**](https://idf.espressif.com/) para o ESP32-C6 neste [link](https://docs.espressif.com/projects/esp-idf/en/stable/esp32c6/get-started/windows-setup.html). Durante o processo de instalacao selecionei a opcao de ter os shortcuts no desktop para ser mas facil aceder ao ESP-IDF Command Prompt e ao IDE.

6- Depois de instalado para conferir que tudo esta a funcionar corretamente fazer um pequeno teste com hello world:
- navegar ate ao exemplo ja incluido de hello world com ``cd %IDF_PATH%\examples\get-started\hello_world``
- dar target nesta board especifica ``idf.py set-target esp32c6``
- dar build no firmware ``idf.py build``
- flashar o firmware para a board ``idf.py -p COM3 flash``
- confirmar que esta a dar print de **Hello World** ao ver o output do serial com ``idf.py -p COM3 monitor``

### Ligações
como referencia para a ligacoes tenho esta imagem da board que estou a utilizar. 
como dito na parte de hardware, o sensair s8 e o plantower pms2.5 comunicam por UART e o sht41 é por I2C.
![ssl](images/ESP32-C6.png)

Como descrito na [datasheet](https://api.pim.na.industrial.panasonic.com/file_stream/main/fileversion/244939) do panasonic sn-gcja5, ele pode ser ligado diretamente a minha board porque os terminais SCL e SDA possuem resistências de pull up para 3.3V.


## Troca de Dados

Instalar influxdbv2 download no site, no powershell em administrador navegar ate aos downloads e `` Expand-Archive .\influxdb2-2.7.11-windows.zip -DestinationPath 'C:\Program Files\InfluxData\' ``, carregar com botao direito no .exe e copiar o path. abrir cmd, colar o path e enter. vai abrir um WebUI da influxdb em localhost:8086. criar conta.

Instalar mosquitto pelo site. abrir cmd navegar ate pasta de instalacao e correr ``mosquitto`` que deve dar inicio ao processo. fazer um teste abrindo 1 cmd e correr ``"C:\Program Files\mosquitto\mosquitto_sub.exe" -h 127.0.0.1 -t test/topic`` para subscrever a test/topic e noutro cmd correr ``"C:\Program Files\mosquitto\mosquitto_pub.exe" -h 127.0.0.1 -t test/topic -m "Hello from Mosquitto"`` como a mensagem hello from mosquitto aparece no primeiro cmd podemos concluir que esta a funcionar a comunicacao mqtt agora temos de conectar o mosquitto com o influxdb atraves do telegraf e mqtt consumer.

Instalar telegraf pelo site, para windows é o seguinte:
 no powershell em modo administrador 
```
wget https://dl.influxdata.com/telegraf/releases/telegraf-1.34.0_windows_amd64.zip -UseBasicParsing -OutFile telegraf-1.34.0_windows_amd64.zip
```
e no final
```
Expand-Archive .\telegraf-1.34.0_windows_amd64.zip -DestinationPath 'C:\Program Files\InfluxData\telegraf'
```


aceder novamente ao webui e criar telegraf configuration file atraves do ui. escolher o bucket Sensores e como plugin library escolher mqtt consumer. adicionar os inputs :
```
[[inputs.mqtt_consumer]]
  servers = ["tcp://127.0.0.1:1883"]
  topics = [
    "sensores/sht41/temperature",
    "sensores/sht41/humidity",
    "sensores/gcja5/pm1",
    "sensores/gcja5/pm2.5",
    "sensores/gcja5/pm10",
    "sensores/sensair_s8/co2"
  ]
  data_format = "influx"
  ```

e seguir o resto das instrucoes acerca de adicionar o token. 

para testar 2 cmds: 1 deles para monitorizar com
````
telegraf --config http://localhost:8086/api/v2/telegrafs/0e96aec27fc2a000 --debug
````
e o outro cmd para enviar dados com o mosquitto 
````
mosquitto_pub -h 127.0.0.1 -t sensores/sht41/temperature -m "temperature,location=office value=25.3"
````
mensagem de sucesso "[outputs.influxdb_v2] Wrote batch of 1 metrics in 5.0302ms" 

agora podemos na webui aceder a Data Explorer e carregar em script editor. enviar a query 
````
from(bucket: "Sensores")
  |> range(start: -1h)
  |> filter(fn: (r) => r._measurement == "temperature" or r._measurement == "humidity")
````

podemos assim vizualisar os valores

</details>