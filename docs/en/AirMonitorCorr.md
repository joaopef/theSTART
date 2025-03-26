# Sensor de Monitorização do Ar para Casa

Uma das poucas lições positivas que a pandemia de Covid-19 nos deixou foi a perceção de que existem riscos invisíveis à nossa saúde dentro dos espaços fechados. Muitos poluentes e substâncias contaminantes estão presentes nos ambientes interiores sem que os nossos sentidos – como o olfato, o paladar ou a visão – nos possam alertar para o perigo.

É aqui que entram os monitores de qualidade do ar interior (IAQ). Estes dispositivos detetam a presença de poluentes e fornecem dados objetivos sobre os níveis de contaminação, permitindo-nos agir antes que se tornem um risco real. Quanto mais informação tivermos, mais conscientes e eficazes serão as nossas decisões para manter um ambiente saudável e seguro.



## Parâmetros Mais Importantes

Há vários parâmetros que convém medir, mas os principais são:

### **Temperatura e Humidade**  
Conhecer os valores de temperatura e humidade de um espaço ajuda a
identificar condições que favorecem o crescimento de bactérias e bolor.
Ambientes muito húmidos aumentam esse risco. Alguns dispositivos também calculam o ponto de orvalho – a temperatura na qual o ar já não consegue reter mais vapor de água, levando à condensação.

### **CO2 (Dióxido de Carbono)**  
O CO2 é um composto químico que os humanos libertam ao respirar. Níveis elevados podem causar fadiga, falta de concentração e redução da produtividade. Monitorizar os níveis de CO2 permite avaliar a qualidade da ventilação de um espaço e saber quando é necessário arejar.

### **Particulate Matter (PM)**  
As partículas em suspensão (PM) são uma mistura de partículas sólidas e líquidas tão pequenas que podem ser inaladas, afetando a saúde respiratória. São originadas por poeira, fumo, poluição, entre outros.  

- **PM10** – Partículas com diâmetro inferior a 10 micrómetros.  
- **PM2.5** – Partículas com diâmetro inferior a 2.5 micrómetros, consideradas as mais perigosas para a saúde.  

Para comparação, um fio de cabelo humano tem aproximadamente 70 micrómetros de diâmetro.


## Hardware  

- **ESP32C6** - Dispositivo central responsável pela recolha e transmissão de dados via **WiFi 6** e **Bluetooth 5**, garantindo uma comunicação eficiente com os sensores.  

- **SHT41** - Sensor de **temperatura e humidade** com maior precisão do que os comuns **DHT11** e **DHT22**. Comunica via **I2C** e permite medições de temperatura entre **-40°C e 125°C** e de humidade entre **0% e 100%**.  

- **Senseair S8** - Sensor de **CO2** do tipo **NDIR (Non-Dispersive Infrared)**, garantindo medições mais estáveis e precisas do que sensores **MOX**. Mede concentrações de **CO2 entre 400 e 5000 ppm**, com uma precisão de **±40 ppm + 3% da leitura**. Comunica via **UART**.  

- **Plantower PMS2.5** - Sensor de **partículas em suspensão (PM)**, capaz de medir **PM1.0, PM2.5 e PM10**. Permite identificar partículas com diâmetros mínimos de **0.3 µm**, sendo útil para monitorizar poeira, fumo e poluição urbana. Comunica via **UART**.  

## Implementação  

Para não seguir o caminho tradicional com **Arduino IDE** e experimentar algo novo, decidi utilizar **ESP IDF**. É uma opção mais flexível, permitindo testar rapidamente os sensores sem complicação.  

### **Configurar o ESP32-C6**  

O ESP32-C6 vem sem **ESP IDF** instalado, então é necessário **flashar o firmware** antes de começar.  

#### **1. Instalar o esptool**  
Antes de tudo, precisamos do **esptool**, que serve para interagir com microcontroladores ESP. Como já tenho **Python** instalado, basta abrir o **cmd** e executar:  
``
pip install esptool
``

#### **2. Ligar o ESP32-C6 ao PC**  
A parte mais complicada... conectar o ESP32-C6 ao PC usando um **cabo USB-C para USB-A** 😆.  

#### **3. Instalar os drivers USB to UART**  
Para que o ESP32-C6 seja reconhecido corretamente, precisamos dos **USB to UART Bridge VCP Drivers**.  

- O download pode ser feito diretamente em [Silicon Labs](https://www.silabs.com/developer-tools/usb-to-uart-bridge-vcp-drivers?tab=downloads).  
- Após o download, extrair os ficheiros e localizar **`silabser.inf`**.  
- Clicar com o **botão direito** e selecionar **Instalar**.  

Agora, no **Device Manager**, o dispositivo deve aparecer como **Silicon Labs CP210x USB to UART Bridge (COMx)**.  
Tomar nota do número da porta COM atribuída (no meu caso, **COM3**).  

#### **4. Limpar a flash do ESP32-C6**  
Antes de instalar o firmware, convém limpar a memória do ESP para evitar problemas. No terminal, correr:  ``python -m esptool --port COM3 erase_flash``

Se tudo correr bem, deve aparecer a mensagem: **Chip erase completed successfully**.

#### **5. Instalar o ESP-IDF**  
Podemos fazer download da versão mais recente para **Windows** do [**ESP-IDF**](https://idf.espressif.com/) para o ESP32-C6 neste [link](https://docs.espressif.com/projects/esp-idf/en/stable/esp32c6/get-started/windows-setup.html).  

Durante o processo de instalação, selecionei a opção de criar **atalhos no ambiente de trabalho**, facilitando o acesso ao **ESP-IDF Command Prompt** e ao **IDE**.  

#### **6. Testar com Hello World**  
Depois de instalado, podemos verificar se tudo está a funcionar corretamente com um pequeno teste:  

- Abir o ESP-IDF CMD e navegar até ao exemplo já incluído de **Hello World**:  
``
cd %IDF_PATH%\examples\get-started\hello_world
``
- Definir o **target** para a nossa board ESP32-C6:  
``
idf.py set-target esp32c6
``
- Fazer **build** do firmware:  
``
idf.py build
``
- Flashar o firmware para a board:  
``
idf.py -p COM3 flash
``
- Confirmar que está a imprimir **Hello World**, visualizando o output do **serial monitor**:  
``
idf.py -p COM3 monitor
``
---
### **Ligações**
 

Como referência para as ligações, utilizo esta imagem da **board** que estou a usar:  
![ssl](images/ESP32-C6.png)  

Conforme mencionado na secção de **hardware**, os sensores comunicam da seguinte forma:  
- **Senseair S8** e **Plantower PMS2.5** → UART  
- **SHT41** → I2C  

---

## **Configuração de Dados**  

Para armazenar e visualizar os dados dos sensores, utilizei o **InfluxDB**, o **Mosquitto MQTT Broker** e o **Telegraf** para integrar os serviços.  

### **1. Instalar e configurar o InfluxDB**  

1. Fazer **download** da versão mais recente do **InfluxDB v2** no [site oficial](https://www.influxdata.com/).  
2. Abrir o **PowerShell** em modo **Administrador** e navegar até a pasta de **Downloads**.  
3. Executar o seguinte comando para extrair os ficheiros:  
```
Expand-Archive .\influxdb2-2.7.11-windows.zip -DestinationPath 'C:\Program Files\InfluxData'
```
4. Clicar com o **botão direito** no **.exe**, copiar o **caminho completo** e abrir o **CMD**.  
5. Colar o **caminho** copiado e pressionar **Enter**.  

O **WebUI** do **InfluxDB** deve abrir em `http://localhost:8086`.  
Criar uma conta e seguir as instruções iniciais.  

---

### **2. Instalar e configurar o Mosquitto MQTT Broker**  

1. Fazer **download** do **Mosquitto** no [site oficial](https://mosquitto.org/download/).  
2. Após a instalação, abrir o **CMD**, navegar até a pasta de instalação e iniciar o serviço com:  ``mosquitto``


#### **Testar a comunicação MQTT**  
Abrir dois **CMDs**:  

- **CMD 1** (para subscrever a um tópico):  
```
"C:\Program Files\mosquitto\mosquitto_sub.exe" -h 127.0.0.1 -t test/topic
```

- **CMD 2** (para publicar uma mensagem no tópico):  
```
"C:\Program Files\mosquitto\mosquitto_pub.exe" -h 127.0.0.1 -t test/topic -m "Hello from Mosquitto"
```

Se a mensagem **"Hello from Mosquitto"** aparecer no primeiro terminal, a comunicação MQTT está a funcionar corretamente.  

Agora, precisamos de conectar o **Mosquitto** ao **InfluxDB** através do **Telegraf** e do **MQTT Consumer**.  

---

### **3. Instalar e configurar o Telegraf**  

1. Fazer **download** do **Telegraf** no [site oficial](https://www.influxdata.com/time-series-platform/telegraf/).  
2. No **PowerShell** (modo Administrador), executar:  
```
wget https://dl.influxdata.com/telegraf/releases/telegraf-1.34.0_windows_amd64.zip -UseBasicParsing -OutFile telegraf-1.34.0_windows_amd64.zip
```
3. Após o **download**, extrair os ficheiros:  
```
Expand-Archive .\telegraf-1.34.0_windows_amd64.zip -DestinationPath 'C:\Program Files\InfluxData\telegraf'
```

---

### **4. Configurar o Telegraf para consumir MQTT**  

1. No **WebUI** do InfluxDB, criar um **Telegraf Configuration File**:  
- Escolher o **bucket Sensores**.  
- Selecionar o **plugin MQTT Consumer** na **Plugin Library**.  
- Adicionar os seguintes **inputs**:  
```
[[inputs.mqtt_consumer]] servers = ["tcp://127.0.0.1:1883"] topics = [ "sensores/sht41/temperature", "sensores/sht41/humidity", "sensores/gcja5/pm1", "sensores/gcja5/pm2.5", "sensores/gcja5/pm10", "sensores/sensair_s8/co2" ] data_format = "influx"
```

2. Adicionar o **Token de Autenticação** conforme indicado no WebUI.  

---

### **5. Testar a configuração**  

Abrir dois **CMDs**:  

- **CMD 1** (para monitorizar os dados recebidos pelo Telegraf):  
```
telegraf --config http://localhost:8086/api/v2/telegrafs/0e96aec27fc2a000 --debug
```

- **CMD 2** (para enviar dados de teste via Mosquitto):  
````
mosquitto_pub -h 127.0.0.1 -t sensores/sht41/temperature -m "temperature,location=office value=25.3"
````

Se tudo estiver configurado corretamente, o terminal deve exibir a mensagem de sucesso:  

**[outputs.influxdb_v2] Wrote batch of 1 metrics in 5.0302ms**

---

### **6. Visualizar os dados no InfluxDB**  

1. Aceder ao **WebUI** do **InfluxDB**.  
2. Ir a **Data Explorer** e abrir o **Script Editor**.  
3. Executar a seguinte **query** para visualizar os dados:  
````
from(bucket: "Sensores") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "temperature" or r._measurement == "humidity")
````

Os valores dos sensores devem aparecer no gráfico.

