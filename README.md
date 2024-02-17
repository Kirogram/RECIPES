![메인이미지](https://coolcleaner.co.kr/fileDownLoad/17082032986005252.jpg)

# CXD Recipes
요식업 운영에 필요한 자체 레시피 및 정보들을 저장하여 새롭게 들어오는 직원등에게 손쉽게 인수인계 할 수 있게 만들어주는 가이드 프로세스 입니다. 카테고리에 제한은 없으나 실제 적용 사례를 간단하게 보고싶어서 아는지인이 운영하는 피자집을 샘플로 만들었습니다.

포트폴리오로 활용할 수 있도록 데이터는 더미데이터를 넣어놨으며 차후 실제 사이트에 적용시켜 직원 교육 및 지점별 운영 가이드로 활용될 계획입니다.

### LIVE URL : https://admin.cxdpizza.co.kr

### Tech Stack

**Front-End** : Angular , HTML , TypeScripts , SCSS   
**Back-End** : JAVA , Spring Framework , JPA , MyBatis  
**Server** : Ubuntu , Tomcat  
**DataBase** : Oracle  

### Contribution
기정환 단독개발

## SCREEN
***

#### 메인페이지
![메인페이지](https://coolcleaner.co.kr/fileDownLoad/1706821441824rcpmain.png)
### 메인페이지 주요기능

**● 초성검색과 자동완성 (Regex Search & Auto Complete)**
![메인페이지](https://coolcleaner.co.kr/fileDownLoad/1706821507468rcpgif.gif)
초성검색과 자동완성은 메뉴얼 사이트를 구성할 때 필수적인 요소 중 하나 입니다.\
쉽게 찾아볼 수 있는 기능이지만 디테일을 살펴보면 생각보다 많은 기술이 적용되어 있고 구현 전략 또한 다양한 방식으로 진행 될 수 있습니다.

**1.자동완성**
```html
<mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
  @for (option of filteredOptions | async; track option) {
    <mat-option [value]="option">{{ option }}</mat-option>
  }
</mat-autocomplete>
```

option에 데이터를 주입하면서 filteredOptions를 통해 필터링 작업에 대한 세팅을 함께 진행해 줍니다.  검색 반영에 대한 랜더링이 자연스럽게 이어질 수 있도록 세팅해줍니다.
```html
this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''), map(value => this._filter(value || '')));
```

검색 데이터에 pipe를 걸고 startWith를 통해 문자열 일치 여부를 순환합니다.

**2.초성검색**

```html
korean = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

private _filter(value: string): string[] {
    if (value === '') return [];

    const filterValue = value.toLowerCase();
    const regex = this.makeRegex(filterValue);
    return this.options.filter(option => {
      return regex.test(option);
    });
  }
```

초성의 범위를 설정하고 필터를 걸어줍니다. 문자열 정규표현식 테스터인 regex.test를 통해서 실제 결과값을 반환하는 과정을 거칩니다.

```html
makeRegex(search = '') {
    const regex = this.korean.reduce(
      (data, key, index) => data.replace(new RegExp(key, "g"),
        `[${this.combine(index, 0, 0)}-${this.combine(index + 1, 0, -1)}]`), search);
    return new RegExp(`(${regex})`, "g");
  }
```

유니 코드값의 범위내에있는 일치하는 키워드를 추출하는 메소드 입니다.

```html
combine(first: number, mid: number, last: number) {

    const start_charCode = "가".charCodeAt(0);
    const start_period = Math.floor("까".charCodeAt(0) - "가".charCodeAt(0));
    const mid_period = Math.floor("개".charCodeAt(0) - "가".charCodeAt(0));

    return String.fromCharCode(
      Number(start_charCode + first * start_period + mid * mid_period + last)
    );
  }
```

검색된 초성의 유니코드값을 추출하는 메서드 입니다.

**기능 전체 설명**

한글 초성 검색의 경우 [ㄱ-ㅎ]까지 문자 단위로는 [가-힣] 까지 의 한글 값이 있습니다.\
예를 들어 ㄱ을 검색할 경우 [가-깋]까지의 검색 값에 일치하는 데이터가 모두 출력 되어야 합니다.\
이 값을 순환을 통해 찾을 수 있는 방법 중 대표적 인 게 유니코드 입니다.\
초성 중성 종성으로 구성된 한글의 11,172개의 값을 추출해줄 수 있는 역할을 합니다.\
_filter에서는 전체 검색에 필요한 로직을 구성하고 최종적인 결과값에 대한 정보를 제공하는 메소드입니다.\
makeRegex은 결과값 추출에 필요한 유니코드의 최종값을 만들어내는 메소드 입니다.\
combine은 추출해야하는 유니코드 값을 식별해주는 메소드 입니다.

### 서브페이지 주요기능
![메인페이지](https://coolcleaner.co.kr/fileDownLoad/1706821761304abd.png)
서브페이지는 레시피 메뉴의 상세 내용을 보여주는 화면 입니다.

초기 구성에서는 서브페이지 접속 - 사이즈선택 - 정보구성으로 로직이 구현되었으나

사이즈 선택 과정을 배열 데이터중 가장먼저 나온데이터를 보여준 후 원할경우 사이즈 변경 방식으로 바꾸었습니다. 이 과정은 실제 사용자의 의견을 반영하여 변경되었습니다.

데이터 호출 전략은 사이즈 선택시 서버 호출과 전체 사이즈 데이터 호출뒤 원하는 사이즈선택시 반영 두가지를 고민했는데 전체 데이터의 크기가 크지 않고 빈번한 서버 호출이 필요한 화면은 아니라는 생각에 레시피 전체 사이즈 데이터를 호출하는 방식으로 진행되었습니다.

만약 설명이 textEditor로 구성되어 blob 형식의 데이터로 구성되었다면 사이즈 선택시 서버 호출로 구성하였을 것 같습니다.

### 입력 페이지 주요기능
![메인페이지](https://coolcleaner.co.kr/fileDownLoad/1706821808209rrw.png)
레시피 특성상 같은 메뉴에 여러 사이즈를 등록해야하는 경우가 많아 동시에 입력 할 수 있는 방식으로 화면을 구성하였습니다. 정보의 경우 동일한 내용에 사이즈에 따라 수치만 바뀌는 경우가 많아 입력한 정보를 이전시킬 수 있는 기능을 추가하였습니다.

배열 전체를 복사하는 과정이 필요해 고유값은 복사되지 않도록 Object.assign(얕은 복사)를 사용하였습니다.

```html
moveData(index: number) {
    const selectData = this.paramsBox[index];
    const beforeSize = this.paramsBox[index + 1].MENU_SIZE;
    this.paramsBox[index + 1] = Object.assign({}, selectData);
    this.paramsBox[index + 1].MENU_SIZE = beforeSize;
  }
```

### LICENSE
***
GNU General Public License(GPL) 2.0  
본 프로젝트에 사용된 이미지는 상업용 이미지로 무단 사용을 금지합니다.
