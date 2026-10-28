# Gera a árvore da GWL em vetor (redesenho do logotipo original, aprovado por João em 28/10/2026).
# Rodar dentro de public/marca/: python3 ../../scripts/gerar-arvore.py
import math, random, sys
random.seed(7)
CX, CY = 100, 64
def folha(x, y, rot, L, W, c1, c2):
    h=L/2; q=L/4; w=W/2
    a=f'M0,{-h} C{w},{-q} {w},{q} 0,{h} Z'
    b=f'M0,{-h} C{-w},{-q} {-w},{q} 0,{h} Z'
    if c1 == c2:
        inteira=f'M0,{-h} C{w},{-q} {w},{q} 0,{h} C{-w},{q} {-w},{-q} 0,{-h} Z'
        return f'<path transform="translate({x:.1f} {y:.1f}) rotate({rot:.1f})" d="{inteira}" fill="{c1}"/>'
    return f'<g transform="translate({x:.1f} {y:.1f}) rotate({rot:.1f})"><path d="{a}" fill="{c1}" stroke="{c1}" stroke-width=".3"/><path d="{b}" fill="{c2}"/></g>'
def copa(cores, dist=12.5, escala=1.0):
    claras, escuras = cores
    pts=[]
    tent=0
    while tent<20000:
        tent+=1
        x=random.uniform(38,162); y=random.uniform(8,90)
        dx=(x-100)/64; dy=(y-60)/53
        if dx*dx+dy*dy>1 or y>88: continue
        if abs(x-100)<12 and y>70: continue
        if all((x-a)**2+(y-b)**2>=dist**2 for a,b in pts): pts.append((x,y))
    out=[]
    for x,y in pts:
        a=math.degrees(math.atan2(-(y-74),(x-100)))
        rot=90-a+random.uniform(-12,12)
        d=math.hypot(x-100,y-74)
        L=(15+min(d,55)/55*6)*escala; W=L*0.6
        i=random.randrange(len(claras))
        out.append(folha(x,y,rot,L*random.uniform(.93,1.05),W,claras[i],escuras[i]))
    return out
def tronco(cor):
    s=[]
    s.append(f'<path d="M88,104 C94,98 95,88 96,72 L104,72 C105,88 106,98 112,104 Q100,100 88,104 Z" fill="{cor}"/>')
    for (x1,y1,x2,y2,cx,cy,w) in [(98,78,72,58,84,72,4.2),(102,78,128,58,116,72,4.2),(99,74,88,46,91,62,3.4),(101,74,112,46,109,62,3.4),(100,72,100,40,99,56,3),(97,88,64,76,80,86,3),(103,88,136,76,120,86,3)]:
        s.append(f'<path d="M{x1},{y1} Q{cx},{cy} {x2},{y2}" stroke="{cor}" stroke-width="{w}" fill="none" stroke-linecap="round"/>')
    return s
def arcos(v1, v2, azul):
    return [f'<path d="M22,80 Q100,126 178,82 Q100,114 22,80 Z" fill="{v1}"/>',
            f'<path d="M34,94 Q100,134 170,94 Q100,124 34,94 Z" fill="{v2}"/>',
            f'<path d="M62,112 Q130,116 182,78 Q132,106 62,112 Z" fill="{azul}"/>']
def svg(corpo, titulo):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="16 0 170 124" role="img" aria-label="{titulo}">' + ''.join(corpo) + '</svg>\n'
claras=['#8CC63F','#7AB648','#9BCB5B','#6FAF3E']; escuras=['#5E9E2F','#4E8F34','#6CA83E','#3F7F2B']
cor = tronco('#6B4A2B') + copa((claras,escuras)) + arcos('#7AB648','#9BCB5B','#34489A')
# Saída em public/marca/ (rodar a partir dessa pasta).
open('arvore-cor.svg','w').write(svg(cor,'GWL'))
for nome,c in [('mata','#1F3D27'),('nevoa','#F3F2EE')]:
    random.seed(7)
    corpo = tronco(c) + copa(([c],[c])) + arcos(c,c,c)
    open(f'arvore-{nome}.svg','w').write(svg(corpo,'GWL'))
    random.seed(3)
    corpo = tronco(c) + copa(([c],[c]), dist=19, escala=1.35) + arcos(c,c,c)
    open(f'arvore-{nome}-pequena.svg','w').write(svg(corpo,'GWL'))
print('ok')
