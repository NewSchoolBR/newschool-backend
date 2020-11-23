import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Constants } from '../../../CommonsModule/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CheckTestBodyDTO,
  CheckTestResponseDTO,
} from '../../dto/check-test.dto';
import { CMSTestDTO } from '../../dto/cms-test.dto';
import { TestV2Service } from '../../service/v2/test-v2.service';

@ApiTags('TestV2')
@ApiBearerAuth()
@Controller(
  `${Constants.API_PREFIX}/${Constants.API_VERSION_2}/${Constants.TEST_ENDPOINT}`,
)
export class TestV2Controller {
  constructor(private readonly service: TestV2Service) {}

  @Get('part/:partId')
  public async getAll(@Param('partId') partId: string): Promise<CMSTestDTO[]> {
    return this.service.getAll(partId);
  }

  @Get(':id')
  public async findById(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<CMSTestDTO> {
    return this.service.findById(id);
  }

  @Post(':id/check-test')
  public async checkTest(
    @Param('id', ParseIntPipe) id: string,
    @Body() checkTest: CheckTestBodyDTO,
  ): Promise<CheckTestResponseDTO> {
    return {
      isCorrect: await this.service.checkTest(id, checkTest.chosenAlternative),
    };
  }
}