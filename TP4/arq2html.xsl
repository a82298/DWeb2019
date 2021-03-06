<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output method= "html" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="ARQELEM">
            <html>
                <style>
                    body {
                    background-image: url("https://www.ilovewallpaper.co.uk/images/zara-shimmer-metallic-wallpaper-soft-pink-rose-gold-p4928-21149_image.jpg");
                    background-repeat:no-repeat;
                    background-size:cover;
                    } 
                    ul {
                    list-style: circle inside;
                    }
                </style>
                <head>
                    <title>INFORMAÇÃO DO ARQUEOSÍTIO</title>
                    <meta charset="UTF-8"></meta>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body>
                    <table class="w3-table">
                        <tr>
                            <th>Identificação</th><td><xsl:value-of select="IDENTI"/></td>
                        </tr>
                        <tr>
                            <th>Lugar</th><td><xsl:value-of select="LUGAR"/></td>
                        </tr>
                        <tr>
                            <th>Freguesia</th><td><xsl:value-of select="FREGUE"/></td>
                        </tr>
                        <tr>
                            <th>Concelho</th><td><xsl:value-of select="CONCEL"/></td>
                        </tr>
                        <tr>
                            <th>Cronologia</th><td><xsl:value-of select="CRONO"/></td>
                        </tr>
                        <tr>
                            <th>Latitude</th><td><xsl:value-of select="LATITU"/></td>
                        </tr>
                        <tr>
                            <th>Longitude</th><td><xsl:value-of select="LONGIT"/></td>
                        </tr>
                        <tr>
                            <th>Altitude</th><td><xsl:value-of select="ALTITU"/></td>
                        </tr>
                        <tr>
                            <th>Autor(a)</th><td><xsl:value-of select="AUTOR"/></td>
                        </tr>
                        <tr>
                            <th>Data</th><td><xsl:value-of select="DATA"/></td>
                        </tr>
                    </table>
                    <xsl:apply-templates select="ACESSO"/>
                    <xsl:apply-templates select="DEPOSI"/>
                    <xsl:apply-templates select="QUADRO"/>
                    <xsl:apply-templates select="DESARQ"/>
                    <xsl:apply-templates select="INTERP"/>
                    
                    <xsl:apply-templates select="TRAARQ"/>
                    <xsl:apply-templates select="INTERE"/>
                    <center><div style="background-color:red">
                        <h3>Bibliografia</h3>
                    </div></center>
                    <xsl:apply-templates select="BIBLIO"/>
                    <hr/>
                </body>
            </html>
        
    </xsl:template>
    
    <xsl:template match="ACESSO">
        
         <h3>Acesso: </h3>
        <p><xsl:value-of select="."/></p>
        
    </xsl:template>
    
    <xsl:template match="QUADRO">
        <h3>Quadro: </h3>
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="DESARQ">
        <h3>Descrição arquitetónica: </h3>
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    
    <xsl:template match="INTERP">
        <h3>Interpretação: </h3>
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    
    <xsl:template match="DEPOSI">
        <h3>Depósito</h3>
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    
    <xsl:template match="BIBLIO">
        <li>
            <xsl:value-of select="."/>
        </li>
        
    </xsl:template>
    
    
    <xsl:template match="TRAARQ">
        <h3>Trabalhos arqueológicos: </h3>
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    
    <xsl:template match="INTERE">
        <h3>Interesse Arqueológico: </h3>
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
</xsl:stylesheet>